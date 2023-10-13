from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2
import uuid
from pydantic import EmailStr
from typing import List
from ..encryption import encrypt, decrypt
import os

IMAGEDIR = "static/images/"

router = APIRouter(prefix="/api/records", tags=["Records"])




@router.get("/{id}", response_model=List[schemas.RecordOut])
def get_record_by_id(id: int, current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    record = db.query(models.Record).filter(models.Record.id == id).all()

    name = record[0].name
    firstName = record[0].firstName

    record[0].name = decrypt(name.encode())
    record[0].firstName = decrypt(firstName.encode())
    if record[0].lastName != "": 
        lastName = record[0].lastName
        record[0].lastName = decrypt(lastName.encode())
    if record[0].mobile_no != "": 
        mobile_no = record[0].mobile_no
        record[0].mobile_no = decrypt(mobile_no.encode())
    if record[0].email != "": 
        email = record[0].email
        record[0].email = decrypt(email.encode())
    if record[0].address != "": 
        address = record[0].address
        record[0].address = decrypt(address.encode())

    return record

@router.get("")
def recent_records(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user),  limit: int = 30):
    records = db.query(models.Record).order_by(models.Record.id.desc()).limit(30).all()

    for record in records:
        name = record.name
        record.name = decrypt(name.encode())
        if record.mobile_no != "":
            mobile_no = record.mobile_no
            record.mobile_no = decrypt(mobile_no.encode())
        if record.email != "":
            email = record.email
            record.email = decrypt(email.encode())

    return records

@router.post("")
async def post_record(
    name: str = Form(...),
    firstName: str = Form(...),
    lastName: str = Form(""),
    age: int = Form(...),
    sex: str = Form(...),
    health_record_no: str = Form(...),
    mobile_no: str = Form(""),
    email: str = Form(""),
    date_of_assessment: str = Form(None),
    address: str = Form(""),

    # HISTORY

    complaints: str = Form(""),
    past_history: str = Form(""),
    general_health_history: str = Form(""),
    family_history: str = Form(""),
    investigation_report: str = Form(""),
    present_medications: str = Form(""),
    allergy: str = Form(""),

    # # PREVIOUS GLASS PRESCRIPTION

    previous_glass_prescription_date: str = Form(""),
    previous_glass_prescription_od: str = Form(""),
    previous_glass_prescription_od_ds: str = Form(""),
    previous_glass_prescription_od_dcx: str = Form(""),
    previous_glass_prescription_od_add: str = Form(""),
    previous_glass_prescription_os: str = Form(""),
    previous_glass_prescription_os_ds: str = Form(""),
    previous_glass_prescription_os_dcx: str = Form(""),
    previous_glass_prescription_os_add: str = Form(""),
    previous_glass_prescription_comments: str = Form(""),

    # # VFAA

    vision_od: str = Form(""),
    vision_od_ph: str = Form(""),
    vision_od_nv: str = Form(""),
    vision_od_nv_cms: str = Form(""),
    vision_os: str = Form(""),
    vision_os_ph: str = Form(""),
    vision_os_nv: str = Form(""),
    vision_os_nv_cms: str = Form(""),
    vision_ou: str = Form(""),
    vision_ou_nv: str = Form(""),
    vision_ou_nv_cms: str = Form(""),

    flash_od: str = Form(""),
    flash_od_ds: str = Form(""),
    flash_od_dcx: str = Form(""),
    flash_os: str = Form(""),
    flash_os_ds: str = Form(""),
    flash_os_dcx: str = Form(""),

    acceptance_od: str = Form(""),
    acceptance_od_ds: str = Form(""),
    acceptance_od_dcx: str = Form(""),
    acceptance_od_dcx_final: str = Form(""),
    acceptance_os: str = Form(""),
    acceptance_os_ds: str = Form(""),
    acceptance_os_dcx: str = Form(""),
    acceptance_os_dcx_final: str = Form(""),
    acceptance_ou_final: str = Form(""),

    add_od: str = Form(""),
    add_od_nv: str = Form(""),
    add_od_nv_cms: str = Form(""),
    add_os: str = Form(""),
    add_os_nv: str = Form(""),
    add_os_nv_cms: str = Form(""),
    add_ou_nv: str = Form(""),
    add_ou_nv_cms: str = Form(""),

    vfaa_comments: str = Form(""),

    eom_od: str = Form(""),
    eom_os: str = Form(""),
    eom_ou: str = Form(""),
    ct_near: str = Form(""),
    ct_dist: str = Form(""),
    npc_subjective: str = Form(""),
    npc_objective: str = Form(""),
    npa_od: str = Form(""),
    npa_os: str = Form(""),
    npa_ou: str = Form(""),
    eom_comments: str = Form(""),

    pupil_od: str = Form(""),
    pupil_os: str = Form(""),
    pupil_comments: str = Form(""),

    lids_od: str = Form(""),
    lids_os: str = Form(""),
    conjuctiva_od: str = Form(""),
    conjuctiva_os: str = Form(""),
    cornea_od: str = Form(""),
    cornea_os: str = Form(""),
    ac_od: str = Form(""),
    ac_os: str = Form(""),
    iris_od: str = Form(""),
    iris_os: str = Form(""),
    lens_od: str = Form(""),
    lens_os: str = Form(""),
    tear_film_od: str = Form(""),
    tear_film_os: str = Form(""),
    anterior_segment_comments: str = Form(""),
    intraocular_pressure_od: str = Form(""),
    intraocular_pressure_os: str = Form(""),
    intraocular_pressure_comments: str = Form(""),
    time: str = Form(None),
    posterior_segment_od_image: UploadFile = File(""),
    posterior_segment_od_description: str = Form(""),
    posterior_segment_os_image: UploadFile = File(""),
    posterior_segment_os_description: str = Form(""),
    diagnosis : str = Form(""),
    management_counselling_advice_referral: str = Form(""),
    glass_prescription_od_sphere: str = Form(""),
    glass_prescription_od_cylinder: str = Form(""),
    glass_prescription_od_axis: str = Form(""),
    glass_prescription_od_add: str = Form(""),
    glass_prescription_od_prism: str = Form(""),
    glass_prescription_od_visual_acuity_1: str = Form(""),
    glass_prescription_od_visual_acuity_2: str = Form(""),
    glass_prescription_os_sphere: str = Form(""),
    glass_prescription_os_cylinder: str = Form(""),
    glass_prescription_os_axis: str = Form(""),
    glass_prescription_os_add: str = Form(""),
    glass_prescription_os_prism: str = Form(""),
    glass_prescription_os_visual_acuity_1: str = Form(""),
    glass_prescription_os_visual_acuity_2: str = Form(""),
    distance_pupillary_distance_od: str = Form(""),
    distance_pupillary_distance_os: str = Form(""),
    near_pupillary_distance_od: str = Form(""),
    near_pupillary_distance_os: str = Form(""),
    segment_height_od: str = Form(""),
    segment_height_os: str = Form(""),
    fitting_height_od: str = Form(""),
    fitting_height_os: str = Form(""),
    glass_prescription_instruction: str = Form(""),
    glass_prescription_comments: str = Form(""),
    edited_timestamp: str = Form(...),
    edited_by:str = Form(...), 

    current_user: int = Depends(oauth2.get_current_user),
    db: Session = Depends(get_db)):


    name = encrypt(name)
    firstName = encrypt(firstName)
    if lastName != "": lastName = encrypt(lastName)
    if mobile_no != "":
        mobile_no = encrypt(mobile_no)
    if email != "":
        email = encrypt(email)
    if address != "":
        address = encrypt(address)

    if posterior_segment_od_image != "":
        posterior_segment_od_image_uuid = f"{uuid.uuid4()}"
        posterior_segment_od_image.filename = f"{posterior_segment_od_image_uuid}.jpg"

        contents = await posterior_segment_od_image.read()

        with open(f"{IMAGEDIR}{posterior_segment_od_image.filename}", "wb") as f:
            f.write(contents)
    else:
        posterior_segment_od_image_uuid = ""

    if posterior_segment_os_image != "":
        posterior_segment_os_image_uuid = f"{uuid.uuid4()}"
        posterior_segment_os_image.filename = f"{posterior_segment_os_image_uuid}.jpg"

        content = await posterior_segment_os_image.read()

        with open(f"{IMAGEDIR}{posterior_segment_os_image.filename}", "wb") as f:
            f.write(content)
    else:
        posterior_segment_os_image_uuid = ""

    record = schemas.Record(name=name,
                            firstName = firstName,
                            lastName = lastName,
                            address=address,
                               age=age,
                               sex=sex,
                               health_record_no=health_record_no,
                               mobile_no=mobile_no,
                               email=email,
                                  date_of_assessment=date_of_assessment,
                                  complaints=complaints,
                                  past_history=past_history,
                                  general_health_history=general_health_history,
                                  family_history=family_history,
                                  investigation_report=investigation_report,
                                  present_medications=present_medications,
                                  allergy=allergy,
                                  previous_glass_prescription_date=previous_glass_prescription_date,
                                  previous_glass_prescription_od=previous_glass_prescription_od,
                                  previous_glass_prescription_od_ds=previous_glass_prescription_od_ds,
                                  previous_glass_prescription_od_dcx=previous_glass_prescription_od_dcx,
                                  previous_glass_prescription_od_add=previous_glass_prescription_od_add,
                                  previous_glass_prescription_os=previous_glass_prescription_os,
                                  previous_glass_prescription_os_ds=previous_glass_prescription_os_ds,
                                  previous_glass_prescription_os_dcx=previous_glass_prescription_os_dcx,
                                  previous_glass_prescription_os_add=previous_glass_prescription_os_add,
                                  previous_glass_prescription_comments=previous_glass_prescription_comments,
                                  vision_od=vision_od,
                                  vision_od_ph=vision_od_ph,
                                  vision_od_nv=vision_od_nv,
                                  vision_od_nv_cms=vision_od_nv_cms,
                                  vision_os=vision_os,
                                  vision_os_ph=vision_os_ph,
                                  vision_os_nv=vision_os_nv,
                                  vision_os_nv_cms=vision_os_nv_cms,
                                  vision_ou=vision_ou,
                                  vision_ou_nv=vision_ou_nv,
                                  vision_ou_nv_cms=vision_ou_nv_cms,
                                  flash_od=flash_od,
                                  flash_od_ds=flash_od_ds,
                                  flash_od_dcx=flash_od_dcx,
                                  flash_os=flash_os,
                                  flash_os_ds=flash_os_ds,
                                  flash_os_dcx=flash_os_dcx,
                                  acceptance_od=acceptance_od,
                                  acceptance_od_ds=acceptance_od_ds,
                                  acceptance_od_dcx=acceptance_od_dcx,
                                  acceptance_od_dcx_final=acceptance_od_dcx_final,
                                  acceptance_os=acceptance_os,
                                  acceptance_os_ds=acceptance_os_ds,
                                  acceptance_os_dcx=acceptance_os_dcx,
                                  acceptance_os_dcx_final=acceptance_os_dcx_final,
                                  acceptance_ou_final=acceptance_ou_final,
                                  add_od=add_od,
                                  add_od_nv=add_od_nv,
                                  add_od_nv_cms=add_od_nv_cms,
                                  add_os=add_os,
                                  add_os_nv=add_os_nv,
                                  add_os_nv_cms=add_os_nv_cms,
                                  add_ou_nv=add_ou_nv,
                                  add_ou_nv_cms=add_ou_nv_cms,
                                  vfaa_comments=vfaa_comments,
                                  eom_od=eom_od,
                                  eom_os=eom_os,
                                  eom_ou=eom_ou,
                                  ct_near=ct_near,
                                  ct_dist=ct_dist,
                                  npc_subjective=npc_subjective,
                                  npc_objective=npc_objective,
                                  npa_od=npa_od,
                                  npa_os=npa_os,
                                  npa_ou=npa_ou,
                                  eom_comments=eom_comments,
                                  pupil_od=pupil_od,
                                  pupil_os=pupil_os,
                                  pupil_comments=pupil_comments,
                                  lids_od=lids_od,
                                  lids_os=lids_os,
                                  conjuctiva_od=conjuctiva_od,
                                  conjuctiva_os=conjuctiva_os,
                                  cornea_od=cornea_od,
                                  cornea_os=cornea_os,
                                  ac_od=ac_od,
                                  ac_os=ac_os,
                                  iris_od=iris_od,
                                  iris_os=iris_os,
                                  lens_od=lens_od,
                                  lens_os=lens_os,
                                  tear_film_od=tear_film_od,
                                  tear_film_os=tear_film_os,
                                  anterior_segment_comments=anterior_segment_comments,
                                  intraocular_pressure_od=intraocular_pressure_od,
                                  intraocular_pressure_os=intraocular_pressure_os,
                                  intraocular_pressure_comments=intraocular_pressure_comments,
                                  time=time,
                                  posterior_segment_od_image=posterior_segment_od_image_uuid,
                                  posterior_segment_od_description=posterior_segment_od_description,
                                  posterior_segment_os_image=posterior_segment_os_image_uuid,
                                  posterior_segment_os_description=posterior_segment_os_description,
                                  management_counselling_advice_referral=management_counselling_advice_referral,
                                  glass_prescription_od_sphere=glass_prescription_od_sphere,
                                  glass_prescription_od_cylinder=glass_prescription_od_cylinder,
                                  glass_prescription_od_axis=glass_prescription_od_axis,
                                  glass_prescription_od_add=glass_prescription_od_add,
                                  glass_prescription_od_prism=glass_prescription_od_prism,
                                  glass_prescription_od_visual_acuity_1=glass_prescription_od_visual_acuity_1,
                                  glass_prescription_od_visual_acuity_2=glass_prescription_od_visual_acuity_2,
                                  glass_prescription_os_sphere=glass_prescription_os_sphere,
                                  glass_prescription_os_cylinder=glass_prescription_os_cylinder,
                                  glass_prescription_os_axis=glass_prescription_os_axis,
                                  glass_prescription_os_add=glass_prescription_os_add,
                                  glass_prescription_os_prism=glass_prescription_os_prism,
                                  glass_prescription_os_visual_acuity_1=glass_prescription_os_visual_acuity_1,
                                  glass_prescription_os_visual_acuity_2=glass_prescription_os_visual_acuity_2,
                                  distance_pupillary_distance_od=distance_pupillary_distance_od,
                                  distance_pupillary_distance_os=distance_pupillary_distance_os,
                                  near_pupillary_distance_od=near_pupillary_distance_od,
                                  near_pupillary_distance_os=near_pupillary_distance_os,
                                  segment_height_od=segment_height_od,
                                  segment_height_os=segment_height_os,
                                  fitting_height_od=fitting_height_od,
                                  fitting_height_os=fitting_height_os,
                                  glass_prescription_instruction=glass_prescription_instruction,
                                  glass_prescription_comments=glass_prescription_comments,
                                  diagnosis=diagnosis,
                                  edited_by=edited_by,
                                  edited_timestamp=edited_timestamp,
                               )

    new_record = models.Record(**record.dict())

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return new_record


@router.put("/update/{id}")
async def update_post(    id: int ,
                      edited_by: str = Form(...),
                      name: str = Form(...),
    firstName: str = Form(...),
    lastName: str = Form(""),
    age: int = Form(...),
    sex: str = Form(...),
    health_record_no: str = Form(...),
    mobile_no: str = Form(""),
    email: str = Form(""),
    date_of_assessment: str = Form(None),
    address: str = Form(""),

    # HISTORY

    complaints: str = Form(""),
    past_history: str = Form(""),
    general_health_history: str = Form(""),
    family_history: str = Form(""),
    investigation_report: str = Form(""),
    present_medications: str = Form(""),
    allergy: str = Form(""),

    # # PREVIOUS GLASS PRESCRIPTION

    previous_glass_prescription_date: str = Form(""),
    previous_glass_prescription_od: str = Form(""),
    previous_glass_prescription_od_ds: str = Form(""),
    previous_glass_prescription_od_dcx: str = Form(""),
    previous_glass_prescription_od_add: str = Form(""),
    previous_glass_prescription_os: str = Form(""),
    previous_glass_prescription_os_ds: str = Form(""),
    previous_glass_prescription_os_dcx: str = Form(""),
    previous_glass_prescription_os_add: str = Form(""),
    previous_glass_prescription_comments: str = Form(""),

    # # VFAA

    vision_od: str = Form(""),
    vision_od_ph: str = Form(""),
    vision_od_nv: str = Form(""),
    vision_od_nv_cms: str = Form(""),
    vision_os: str = Form(""),
    vision_os_ph: str = Form(""),
    vision_os_nv: str = Form(""),
    vision_os_nv_cms: str = Form(""),
    vision_ou: str = Form(""),
    vision_ou_nv: str = Form(""),
    vision_ou_nv_cms: str = Form(""),

    flash_od: str = Form(""),
    flash_od_ds: str = Form(""),
    flash_od_dcx: str = Form(""),
    flash_os: str = Form(""),
    flash_os_ds: str = Form(""),
    flash_os_dcx: str = Form(""),

    acceptance_od: str = Form(""),
    acceptance_od_ds: str = Form(""),
    acceptance_od_dcx: str = Form(""),
    acceptance_od_dcx_final: str = Form(""),
    acceptance_os: str = Form(""),
    acceptance_os_ds: str = Form(""),
    acceptance_os_dcx: str = Form(""),
    acceptance_os_dcx_final: str = Form(""),
    acceptance_ou_final: str = Form(""),

    add_od: str = Form(""),
    add_od_nv: str = Form(""),
    add_od_nv_cms: str = Form(""),
    add_os: str = Form(""),
    add_os_nv: str = Form(""),
    add_os_nv_cms: str = Form(""),
    add_ou_nv: str = Form(""),
    add_ou_nv_cms: str = Form(""),

    vfaa_comments: str = Form(""),

    eom_od: str = Form(""),
    eom_os: str = Form(""),
    eom_ou: str = Form(""),
    ct_near: str = Form(""),
    ct_dist: str = Form(""),
    npc_subjective: str = Form(""),
    npc_objective: str = Form(""),
    npa_od: str = Form(""),
    npa_os: str = Form(""),
    npa_ou: str = Form(""),
    eom_comments: str = Form(""),

    pupil_od: str = Form(""),
    pupil_os: str = Form(""),
    pupil_comments: str = Form(""),

    lids_od: str = Form(""),
    lids_os: str = Form(""),
    conjuctiva_od: str = Form(""),
    conjuctiva_os: str = Form(""),
    cornea_od: str = Form(""),
    cornea_os: str = Form(""),
    ac_od: str = Form(""),
    ac_os: str = Form(""),
    iris_od: str = Form(""),
    iris_os: str = Form(""),
    lens_od: str = Form(""),
    lens_os: str = Form(""),
    tear_film_od: str = Form(""),
    tear_film_os: str = Form(""),
    anterior_segment_comments: str = Form(""),
    intraocular_pressure_od: str = Form(""),
    intraocular_pressure_os: str = Form(""),
    intraocular_pressure_comments: str = Form(""),
    time: str = Form(None),
    posterior_segment_od_image: UploadFile = File(""),
    posterior_segment_od_description: str = Form(""),
    posterior_segment_os_image: UploadFile = File(""),
    posterior_segment_os_description: str = Form(""),
    diagnosis : str = Form(""),
    management_counselling_advice_referral: str = Form(""),
    glass_prescription_od_sphere: str = Form(""),
    glass_prescription_od_cylinder: str = Form(""),
    glass_prescription_od_axis: str = Form(""),
    glass_prescription_od_add: str = Form(""),
    glass_prescription_od_prism: str = Form(""),
    glass_prescription_od_visual_acuity_1: str = Form(""),
    glass_prescription_od_visual_acuity_2: str = Form(""),
    glass_prescription_os_sphere: str = Form(""),
    glass_prescription_os_cylinder: str = Form(""),
    glass_prescription_os_axis: str = Form(""),
    glass_prescription_os_add: str = Form(""),
    glass_prescription_os_prism: str = Form(""),
    glass_prescription_os_visual_acuity_1: str = Form(""),
    glass_prescription_os_visual_acuity_2: str = Form(""),
    distance_pupillary_distance_od: str = Form(""),
    distance_pupillary_distance_os: str = Form(""),
    near_pupillary_distance_od: str = Form(""),
    near_pupillary_distance_os: str = Form(""),
    segment_height_od: str = Form(""),
    segment_height_os: str = Form(""),
    fitting_height_od: str = Form(""),
    fitting_height_os: str = Form(""),
    glass_prescription_instruction: str = Form(""),
    glass_prescription_comments: str = Form(""),
    edited_timestamp: str = Form(...),
    current_user: int = Depends(oauth2.get_current_user),
    db: Session = Depends(get_db)):

    name = encrypt(name)
    firstName = encrypt(firstName)
    lastName = encrypt(lastName)
    if mobile_no != "":
        mobile_no = encrypt(mobile_no)
    if email != "":
        email = encrypt(email)
    if address != "":
        address = encrypt(address)

    record_query = db.query(models.Record).filter(models.Record.id == id)

    record = record_query.first()

    if (posterior_segment_od_image == ""):
        posterior_segment_od_image_uuid = record.posterior_segment_od_image
    else:
        if(record.posterior_segment_od_image):
            os.remove(f"static/images/{record.posterior_segment_od_image}.jpg")
        posterior_segment_od_image_uuid = f"{uuid.uuid4()}"
        posterior_segment_od_image.filename = f"{posterior_segment_od_image_uuid}.jpg"

        contents = await posterior_segment_od_image.read()

        with open(f"{IMAGEDIR}{posterior_segment_od_image.filename}", "wb") as f:
            f.write(contents)
    

    if (posterior_segment_os_image == ''):
        posterior_segment_os_image_uuid = record.posterior_segment_os_image
    else:
        if (record.posterior_segment_os_image):
            os.remove(f"static/images/{record.posterior_segment_os_image}.jpg")
        
        posterior_segment_os_image_uuid = f"{uuid.uuid4()}"
        posterior_segment_os_image.filename = f"{posterior_segment_os_image_uuid}.jpg"

        contents = await posterior_segment_os_image.read()

        with open(f"{IMAGEDIR}{posterior_segment_os_image.filename}", "wb") as f:
            f.write(contents)
    
    record = schemas.Record(name=name,
                            firstName = firstName,
                            lastName = lastName,
                            address=address,
                               age=age,
                               sex=sex,
                               health_record_no=health_record_no,
                               mobile_no=mobile_no,
                               email=email,
                                  date_of_assessment=date_of_assessment,
                                  complaints=complaints,
                                  past_history=past_history,
                                  general_health_history=general_health_history,
                                  family_history=family_history,
                                  investigation_report=investigation_report,
                                  present_medications=present_medications,
                                  allergy=allergy,
                                  previous_glass_prescription_date=previous_glass_prescription_date,
                                  previous_glass_prescription_od=previous_glass_prescription_od,
                                  previous_glass_prescription_od_ds=previous_glass_prescription_od_ds,
                                  previous_glass_prescription_od_dcx=previous_glass_prescription_od_dcx,
                                  previous_glass_prescription_od_add=previous_glass_prescription_od_add,
                                  previous_glass_prescription_os=previous_glass_prescription_os,
                                  previous_glass_prescription_os_ds=previous_glass_prescription_os_ds,
                                  previous_glass_prescription_os_dcx=previous_glass_prescription_os_dcx,
                                  previous_glass_prescription_os_add=previous_glass_prescription_os_add,
                                  previous_glass_prescription_comments=previous_glass_prescription_comments,
                                  vision_od=vision_od,
                                  vision_od_ph=vision_od_ph,
                                  vision_od_nv=vision_od_nv,
                                  vision_od_nv_cms=vision_od_nv_cms,
                                  vision_os=vision_os,
                                  vision_os_ph=vision_os_ph,
                                  vision_os_nv=vision_os_nv,
                                  vision_os_nv_cms=vision_os_nv_cms,
                                  vision_ou=vision_ou,
                                  vision_ou_nv=vision_ou_nv,
                                  vision_ou_nv_cms=vision_ou_nv_cms,
                                  flash_od=flash_od,
                                  flash_od_ds=flash_od_ds,
                                  flash_od_dcx=flash_od_dcx,
                                  flash_os=flash_os,
                                  flash_os_ds=flash_os_ds,
                                  flash_os_dcx=flash_os_dcx,
                                  acceptance_od=acceptance_od,
                                  acceptance_od_ds=acceptance_od_ds,
                                  acceptance_od_dcx=acceptance_od_dcx,
                                  acceptance_od_dcx_final=acceptance_od_dcx_final,
                                  acceptance_os=acceptance_os,
                                  acceptance_os_ds=acceptance_os_ds,
                                  acceptance_os_dcx=acceptance_os_dcx,
                                  acceptance_os_dcx_final=acceptance_os_dcx_final,
                                  acceptance_ou_final=acceptance_ou_final,
                                  add_od=add_od,
                                  add_od_nv=add_od_nv,
                                  add_od_nv_cms=add_od_nv_cms,
                                  add_os=add_os,
                                  add_os_nv=add_os_nv,
                                  add_os_nv_cms=add_os_nv_cms,
                                  add_ou_nv=add_ou_nv,
                                  add_ou_nv_cms=add_ou_nv_cms,
                                  vfaa_comments=vfaa_comments,
                                  eom_od=eom_od,
                                  eom_os=eom_os,
                                  eom_ou=eom_ou,
                                  ct_near=ct_near,
                                  ct_dist=ct_dist,
                                  npc_subjective=npc_subjective,
                                  npc_objective=npc_objective,
                                  npa_od=npa_od,
                                  npa_os=npa_os,
                                  npa_ou=npa_ou,
                                  eom_comments=eom_comments,
                                  pupil_od=pupil_od,
                                  pupil_os=pupil_os,
                                  pupil_comments=pupil_comments,
                                  lids_od=lids_od,
                                  lids_os=lids_os,
                                  conjuctiva_od=conjuctiva_od,
                                  conjuctiva_os=conjuctiva_os,
                                  cornea_od=cornea_od,
                                  cornea_os=cornea_os,
                                  ac_od=ac_od,
                                  ac_os=ac_os,
                                  iris_od=iris_od,
                                  iris_os=iris_os,
                                  lens_od=lens_od,
                                  lens_os=lens_os,
                                  tear_film_od=tear_film_od,
                                  tear_film_os=tear_film_os,
                                  anterior_segment_comments=anterior_segment_comments,
                                  intraocular_pressure_od=intraocular_pressure_od,
                                  intraocular_pressure_os=intraocular_pressure_os,
                                  intraocular_pressure_comments=intraocular_pressure_comments,
                                  time=time,
                                  posterior_segment_od_image=posterior_segment_od_image_uuid,
                                  posterior_segment_od_description=posterior_segment_od_description,
                                  posterior_segment_os_image=posterior_segment_os_image_uuid,
                                  posterior_segment_os_description=posterior_segment_os_description,
                                  management_counselling_advice_referral=management_counselling_advice_referral,
                                  glass_prescription_od_sphere=glass_prescription_od_sphere,
                                  glass_prescription_od_cylinder=glass_prescription_od_cylinder,
                                  glass_prescription_od_axis=glass_prescription_od_axis,
                                  glass_prescription_od_add=glass_prescription_od_add,
                                  glass_prescription_od_prism=glass_prescription_od_prism,
                                  glass_prescription_od_visual_acuity_1=glass_prescription_od_visual_acuity_1,
                                  glass_prescription_od_visual_acuity_2=glass_prescription_od_visual_acuity_2,
                                  glass_prescription_os_sphere=glass_prescription_os_sphere,
                                  glass_prescription_os_cylinder=glass_prescription_os_cylinder,
                                  glass_prescription_os_axis=glass_prescription_os_axis,
                                  glass_prescription_os_add=glass_prescription_os_add,
                                  glass_prescription_os_prism=glass_prescription_os_prism,
                                  glass_prescription_os_visual_acuity_1=glass_prescription_os_visual_acuity_1,
                                  glass_prescription_os_visual_acuity_2=glass_prescription_os_visual_acuity_2,
                                  distance_pupillary_distance_od=distance_pupillary_distance_od,
                                  distance_pupillary_distance_os=distance_pupillary_distance_os,
                                  near_pupillary_distance_od=near_pupillary_distance_od,
                                  near_pupillary_distance_os=near_pupillary_distance_os,
                                  segment_height_od=segment_height_od,
                                  segment_height_os=segment_height_os,
                                  fitting_height_od=fitting_height_od,
                                  fitting_height_os=fitting_height_os,
                                  glass_prescription_instruction=glass_prescription_instruction,
                                  glass_prescription_comments=glass_prescription_comments,
                                  diagnosis=diagnosis,
                                  edited_by=edited_by,
                                  edited_timestamp=edited_timestamp,
                               )

    new_record = record.dict()

    record_query.update(new_record, synchronize_session=False)

    db.commit()


    return record_query.first()


@router.delete("/delete/{id}")
def delete_Record(id: int, current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    record_query = db.query(models.Record).filter(models.Record.id == id)

    record = record_query.first()

    if record.posterior_segment_od_image != "":
        os.remove(f"static/images/{record.posterior_segment_od_image}.jpg")

    if record.posterior_segment_os_image != "":
        os.remove(f"static/images/{record.posterior_segment_os_image}.jpg")

    record_query.delete(synchronize_session=False)
    db.commit()
    return {'message': 'record was successfully deleted'}

