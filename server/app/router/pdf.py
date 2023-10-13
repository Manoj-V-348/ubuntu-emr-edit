from fastapi import APIRouter, Depends, Request, status, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from starlette.responses import RedirectResponse
from starlette.templating import Jinja2Templates
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2
from typing import List
import jinja2
from pypdf import PdfMerger
import pdfkit
from datetime import datetime, date
import os
from ..encryption import encrypt, decrypt
import shutil 
from ..config import settings, templates, server_dir
from jinja2 import Environment, FileSystemLoader


router = APIRouter(prefix="/api/pdf", tags=["pdf"])


@router.get("/{id}")
def get_pdf(request: Request, id: int, current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    

    record = db.query(models.Record).filter(models.Record.id == id).first()

    name  = record.name
    record.name = decrypt(name.encode())
    firstName = record.firstName
    record.firstName = decrypt(firstName.encode())
    if record.lastName != "": 
        lastName = record.lastName
        record.lastName = decrypt(lastName.encode())
    if record.mobile_no != "": 
        mobile_no = record.mobile_no
        record.mobile_no = decrypt(mobile_no.encode())
    if record.email != "": 
        email = record.email
        record.email = decrypt(email.encode())
    if record.address != "": 
        address = record.address
        record.address = decrypt(address.encode())
    if not record:
        raise HTTPException(status=404)

    odpath = ospath = ""

    if record.posterior_segment_od_image != "":
        odpath = f"http:\\\\localhost:8000\\api\\static\\images\\{record.posterior_segment_od_image}.jpg"

    if record.posterior_segment_os_image != "":
        ospath = f"http:\\\\localhost:8000\\api\\static\\images\\{record.posterior_segment_os_image}.jpg"

    context = {'hlm': record.health_record_no,
               'date': record.date_of_assessment,
               'age': record.age,
               'name': record.name,
               'sex': record.sex,
               'complaints': record.complaints,
               'hist': record.past_history,
               'fam_hist': record.family_history,
               'ir': record.investigation_report,
               'mt': record.present_medications,
               'allergy': record.allergy,
               'dop': record.previous_glass_prescription_date,
               'pgod': record.previous_glass_prescription_od,
               'pgodds': record.previous_glass_prescription_od_ds,
               'pgodcms': record.previous_glass_prescription_od_dcx,
               'pgos': record.previous_glass_prescription_os,
               'pgosds': record.previous_glass_prescription_os_ds,
               'pgoscms': record.previous_glass_prescription_os_dcx,
               'pgcom': record.previous_glass_prescription_comments,
               'eomod': record.eom_od,
               'eomos': record.eom_os,
               'eomou': record.eom_ou,
               'ctd': record.ct_dist,
               'ctn': record.ct_near,
               'npcs': record.npc_subjective,
               'npco': record.npc_objective,
               'npaod': record.npa_od,
               'npaos': record.npa_os,
               'npaou': record.npa_ou,
               'pod': record.pupil_od,
               'pos': record.pupil_os,
               'pou': record.pupil_ou,
               'pcom': record.pupil_comments,
               'lod': record.lids_od,
               'los': record.lids_os,
               'cod': record.conjuctiva_od,
               'cos': record.conjuctiva_os,
               'cood': record.cornea_od,
               'coos':record.cornea_os,
               'acod': record.ac_od,
               'acos': record.ac_os,
               'iod': record.iris_od,
               'ios': record.iris_os,
               'leod': record.lens_od,
               'leos': record.lens_os,
               'tfod': record.tear_film_od,
               'tfos': record.tear_film_os,
               'ascom': record.anterior_segment_comments,
               'time': record.time,
               'iopod': record.intraocular_pressure_od,
               'iopos': record.intraocular_pressure_os,
               'psod': record.posterior_segment_od_description,
               'psos': record.posterior_segment_os_description,
               'diagnosis':record.diagnosis,
               'mgmt': record.management_counselling_advice_referral,
               'dor': record.date_of_assessment,
               'od_path': odpath,
               'os_path': ospath,
               }

    
    filename = os.path.abspath(__file__)
    dirname = os.path.dirname(filename)
    baseHTML = os.path.join(dirname, 'pdf_model') 

    template_loader = jinja2.FileSystemLoader("templates")
    template_env = jinja2.Environment(loader=template_loader)

    template = template_env.get_template("index.html")
    output_text = template.render(context)

    with open("templates/main.html",'w') as file:
        file.write(output_text)

    path_wkhtmltopdf = '//usr//bin//wkhtmltopdf'
    config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    pdfkit.from_string(output_text, 'record.pdf', configuration=config, options={"enable-local-file-access": ""})

    shutil.copyfile("record.pdf","pdf/record.pdf")
    os.remove("record.pdf")

    if record.glass_prescription_od_sphere != "":
    
        context = {'hlm': record.health_record_no,
                'age': record.age,
                'name': record.name,
                'sex': record.sex,
                'ods': record.glass_prescription_od_sphere,
                'odc': record.glass_prescription_od_cylinder,
                'oda': record.glass_prescription_od_axis,
                'odad': record.glass_prescription_od_add,
                'odp': record.glass_prescription_od_prism,
                'odv': record.glass_prescription_od_visual_acuity_1,
                'odva': record.glass_prescription_od_visual_acuity_2,
                'oss': record.glass_prescription_os_sphere,
                'osc': record.glass_prescription_os_cylinder,
                'osa': record.glass_prescription_os_axis,
                'osad': record.glass_prescription_os_add,
                'osp': record.glass_prescription_os_prism,
                'osv': record.glass_prescription_os_visual_acuity_1,
                'osva': record.glass_prescription_os_visual_acuity_2,
                'odpd': record.distance_pupillary_distance_od,
                'ospd': record.distance_pupillary_distance_os,
                'odnp': record.near_pupillary_distance_od,
                'osnp': record.near_pupillary_distance_os,
                'odsh': record.segment_height_od,
                'ossh': record.segment_height_os,
                'odfh': record.fitting_height_od,
                'osfh': record.fitting_height_os,
                'ins' : record.glass_prescription_instruction,
                'gpcom': record.glass_prescription_comments,
                'date': record.date_of_assessment,
                }

        template_loader = jinja2.FileSystemLoader("templates")
        template_env = jinja2.Environment(loader=template_loader)

        template = template_env.get_template("specs.html")
        output_text = template.render(context)


        path_wkhtmltopdf = '//usr//bin//wkhtmltopdf'
        config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
        pdfkit.from_string(output_text, 'specs.pdf', configuration=config, options={"enable-local-file-access": ""})

        shutil.copyfile("specs.pdf","pdf/specs.pdf")
        os.remove("specs.pdf")
        
        pdfs = ['pdf/record.pdf', 'pdf/specs.pdf']

        merger = PdfMerger()

        for pdf in pdfs:
            merger.append(pdf)
        
        merger.write("pdf/pdf_generated.pdf")
        merger.close()


        return FileResponse(server_dir + "/pdf/pdf_generated.pdf", media_type="application/pdf", filename=f"{record.name}.pdf")    
    
    return FileResponse(server_dir + "/pdf/record.pdf", media_type = "appplication/pdf" , filename=f"{record.name}.pdf")
