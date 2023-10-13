from sqlalchemy import Column, Integer, String, Boolean, Float, Date, Time, UUID
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base
import sqlalchemy.dialects.postgresql as postgresql, uuid
# import uuid


class Record(Base):
    __tablename__ = "records"

    # PERSONAL DETAILS

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=True)
    age = Column(Integer, nullable=False)
    sex = Column(String, nullable=False)
    health_record_no = Column(String, nullable=False)
    mobile_no = Column(String, nullable=True)
    email = Column(String, nullable=True)
    date_of_assessment = Column(String,
                                nullable=False, server_default=text('cast(now() as date)'))
    address = Column(String, nullable=True)
    
    created_at = Column(TIMESTAMP, nullable=False,
                        server_default=text('now()'))

    # HISTORY

    complaints = Column(String, nullable=True)
    past_history = Column(String, nullable=True)
    general_health_history = Column(String, nullable=True)
    family_history = Column(String, nullable=True)
    investigation_report = Column(String, nullable=True)
    present_medications = Column(String, nullable=True)
    allergy = Column(String, nullable=True)

    # PREVIOUS GLASS PRESCRIPTION

    previous_glass_prescription_date = Column(String, nullable=True)
    previous_glass_prescription_od = Column(String, nullable=True)
    previous_glass_prescription_od_ds = Column(String, nullable=True)
    previous_glass_prescription_od_dcx = Column(String, nullable=True)
    previous_glass_prescription_od_add = Column(String, nullable=True)
    previous_glass_prescription_os = Column(String, nullable=True)
    previous_glass_prescription_os_ds = Column(String, nullable=True)
    previous_glass_prescription_os_dcx = Column(String, nullable=True)
    previous_glass_prescription_os_add = Column(String, nullable=True)
    previous_glass_prescription_comments = Column(String, nullable=True)

    # VFAA

    vision_od = Column(String, nullable=True)
    vision_od_ph = Column(String, nullable=True)
    vision_od_nv = Column(String, nullable=True)
    vision_od_nv_cms = Column(String, nullable=True)
    vision_os = Column(String, nullable=True)
    vision_os_ph = Column(String, nullable=True)
    vision_os_nv = Column(String, nullable=True)
    vision_os_nv_cms = Column(String, nullable=True)
    vision_ou = Column(String, nullable=True)
    vision_ou_nv = Column(String, nullable=True)
    vision_ou_nv_cms = Column(String, nullable=True)

    flash_od = Column(String, nullable=True)
    flash_od_ds = Column(String, nullable=True)
    flash_od_dcx = Column(String, nullable=True)
    flash_os = Column(String, nullable=True)
    flash_os_ds = Column(String, nullable=True)
    flash_os_dcx = Column(String, nullable=True)

    acceptance_od = Column(String, nullable=True)
    acceptance_od_ds = Column(String, nullable=True)
    acceptance_od_dcx = Column(String, nullable=True)
    acceptance_od_dcx_final = Column(String, nullable=True)
    acceptance_os = Column(String, nullable=True)
    acceptance_os_ds = Column(String, nullable=True)
    acceptance_os_dcx = Column(String, nullable=True)
    acceptance_os_dcx_final = Column(String, nullable=True)
    acceptance_ou_final = Column(String, nullable=True)

    add_od = Column(String, nullable=True)
    add_od_nv = Column(String, nullable=True)
    add_od_nv_cms = Column(String, nullable=True)
    add_os = Column(String, nullable=True)
    add_os_nv = Column(String, nullable=True)
    add_os_nv_cms = Column(String, nullable=True)
    add_ou_nv = Column(String, nullable=True)
    add_ou_nv_cms = Column(String, nullable=True)

    vfaa_comments = Column(String, nullable=True)

    # BINOCULAR VISIONN TEST

    eom_od = Column(String, nullable=True)
    eom_os = Column(String, nullable=True)
    eom_ou = Column(String, nullable=True)
    ct_near = Column(String, nullable=True)
    ct_dist = Column(String, nullable=True)
    npc_subjective = Column(String, nullable=True)
    npc_objective = Column(String, nullable=True)
    npa_od = Column(String, nullable=True)
    npa_os = Column(String, nullable=True)
    npa_ou = Column(String, nullable=True)
    eom_comments = Column(String, nullable=True)

    # PUPIL

    pupil_od = Column(String, nullable=True)
    pupil_os = Column(String, nullable=True)
    pupil_comments = Column(String, nullable=True)

    # ANTERIOR SEGMENT

    lids_od = Column(String, nullable=True)
    lids_os = Column(String, nullable=True)
    conjuctiva_od = Column(String, nullable=True)
    conjuctiva_os = Column(String, nullable=True)
    cornea_od = Column(String, nullable=True)
    cornea_os = Column(String, nullable=True)
    ac_od = Column(String, nullable=True)
    ac_os = Column(String, nullable=True)
    iris_od = Column(String, nullable=True)
    iris_os = Column(String, nullable=True)
    lens_od = Column(String, nullable=True)
    lens_os = Column(String, nullable=True)
    tear_film_od = Column(String, nullable=True)
    tear_film_os = Column(String, nullable=True)
    anterior_segment_comments = Column(String, nullable=True)

    # INTRAOCULAR PRESSURE

    intraocular_pressure_od = Column(String, nullable=True)
    intraocular_pressure_os = Column(String, nullable=True)
    intraocular_pressure_comments = Column(String, nullable=True)
    time = Column(Time, nullable=True,
                    server_default=text('now()::timestamp(0)')
                  )

    posterior_segment_od_image = Column(String, nullable=True)
    posterior_segment_od_description = Column(String, nullable=True)
    posterior_segment_os_image = Column(String, nullable=True)
    posterior_segment_os_description = Column(String, nullable=True)

    # MANAGEMENT

    management_counselling_advice_referral = Column(String, nullable=True)
    diagnosis = Column(String, nullable=True)
    glass_prescription_od_sphere = Column(String, nullable=True)
    glass_prescription_od_cylinder = Column(String, nullable=True)
    glass_prescription_od_axis = Column(String, nullable=True)
    glass_prescription_od_add = Column(String, nullable=True)
    glass_prescription_od_prism = Column(String, nullable=True)
    glass_prescription_od_visual_acuity_1 = Column(String, nullable=True)
    glass_prescription_od_visual_acuity_2 = Column(String, nullable=True)
    glass_prescription_os_sphere = Column(String, nullable=True)
    glass_prescription_os_cylinder = Column(String, nullable=True)
    glass_prescription_os_axis = Column(String, nullable=True)
    glass_prescription_os_add = Column(String, nullable=True)
    glass_prescription_os_prism = Column(String, nullable=True)
    glass_prescription_os_visual_acuity_1 = Column(String, nullable=True)
    glass_prescription_os_visual_acuity_2 = Column(String, nullable=True)
    distance_pupillary_distance_od = Column(String, nullable=True)
    distance_pupillary_distance_os = Column(String, nullable=True)
    near_pupillary_distance_od = Column(String, nullable=True)
    near_pupillary_distance_os = Column(String, nullable=True)
    segment_height_od = Column(String, nullable=True)
    segment_height_os = Column(String, nullable=True)
    fitting_height_od = Column(String, nullable=True)
    fitting_height_os = Column(String, nullable=True)
    glass_prescription_instruction = Column(String, nullable=True)
    glass_prescription_comments = Column(String, nullable=True)

    edited_by = Column(String, nullable=False)
    edited_timestamp = Column(String, nullable=False)

    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=False)
    password = Column(String, nullable=False)
    picture = Column(String, nullable=False)
    phone = Column(String, unique=True, nullable=False)