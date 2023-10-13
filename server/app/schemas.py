from pydantic import BaseModel, EmailStr
from datetime import datetime, date, time
from typing import Optional




class Record(BaseModel):

    # PERSONAL DETAILS

    name: str
    firstName: str
    lastName: Optional[str] = None
    age: int
    sex: str
    health_record_no: str
    mobile_no: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    date_of_assessment: Optional[str] = None

    # HISTORY

    complaints: Optional[str] = None
    past_history: Optional[str] = None
    general_health_history: Optional[str] = None
    family_history: Optional[str] = None
    investigation_report: Optional[str] = None
    present_medications: Optional[str] = None
    allergy: Optional[str] = None

    # PREVIOUS GLASS PRESCRIPTION

    previous_glass_prescription_date: Optional[str] = None
    previous_glass_prescription_od: Optional[str] = None
    previous_glass_prescription_od_ds: Optional[str] = None
    previous_glass_prescription_od_dcx: Optional[str] = None
    previous_glass_prescription_od_add: Optional[str] = None
    previous_glass_prescription_os: Optional[str] = None
    previous_glass_prescription_os_ds: Optional[str] = None
    previous_glass_prescription_os_dcx: Optional[str] = None
    previous_glass_prescription_os_add: Optional[str] = None
    previous_glass_prescription_comments: Optional[str] = None

    # VFAA

    vision_od: Optional[str] = None
    vision_od_ph: Optional[str] = None
    vision_od_nv: Optional[str] = None
    vision_od_nv_cms: Optional[str] = None
    vision_os: Optional[str] = None
    vision_os_ph: Optional[str] = None
    vision_os_nv: Optional[str] = None
    vision_os_nv_cms: Optional[str] = None
    vision_ou: Optional[str] = None
    vision_ou_nv: Optional[str] = None
    vision_ou_nv_cms: Optional[str] = None

    flash_od: Optional[str] = None
    flash_od_ds: Optional[str] = None
    flash_od_dcx: Optional[str] = None
    flash_os: Optional[str] = None
    flash_os_ds: Optional[str] = None
    flash_os_dcx: Optional[str] = None

    acceptance_od: Optional[str] = None
    acceptance_od_ds: Optional[str] = None
    acceptance_od_dcx: Optional[str] = None
    acceptance_od_dcx_final: Optional[str] = None
    acceptance_os: Optional[str] = None
    acceptance_os_ds: Optional[str] = None
    acceptance_os_dcx: Optional[str] = None
    acceptance_os_dcx_final: Optional[str] = None
    acceptance_ou_final: Optional[str] = None

    add_od: Optional[str] = None
    add_od_nv: Optional[str] = None
    add_od_nv_cms: Optional[str] = None
    add_os: Optional[str] = None
    add_os_nv: Optional[str] = None
    add_os_nv_cms: Optional[str] = None
    add_ou_nv: Optional[str] = None
    add_ou_nv_cms: Optional[str] = None

    vfaa_comments: Optional[str] = None

    # BINOCULAR VISIONN TEST

    eom_od: Optional[str] = None
    eom_os: Optional[str] = None
    eom_ou: Optional[str] = None
    ct_near: Optional[str] = None
    ct_dist: Optional[str] = None
    npc_subjective: Optional[str] = None
    npc_objective: Optional[str] = None
    npa_od: Optional[str] = None
    npa_os: Optional[str] = None
    npa_ou: Optional[str] = None
    eom_comments: Optional[str] = None

    # PUPIL

    pupil_od: Optional[str] = None
    pupil_os: Optional[str] = None
    pupil_comments: Optional[str] = None

    # ANTERIOR SEGMENT

    lids_od: Optional[str] = None
    lids_os: Optional[str] = None
    conjuctiva_od: Optional[str] = None
    conjuctiva_os: Optional[str] = None
    cornea_od: Optional[str] = None
    cornea_os: Optional[str] = None
    ac_od: Optional[str] = None
    ac_os: Optional[str] = None
    iris_od: Optional[str] = None
    iris_os: Optional[str] = None
    lens_od: Optional[str] = None
    lens_os: Optional[str] = None
    tear_film_od: Optional[str] = None
    tear_film_os: Optional[str] = None
    anterior_segment_comments: Optional[str] = None

    # INTRAOCULAR PRESSURE

    intraocular_pressure_od: Optional[str] = None
    intraocular_pressure_os: Optional[str] = None
    intraocular_pressure_comments: Optional[str] = None
    time: Optional[str] = None

   # # POSTERIOR SEGMENT -- IMAGE WITH COMMENTS

    posterior_segment_od_image: Optional[str] = None
    posterior_segment_od_description: Optional[str] = None
    posterior_segment_os_image: Optional[str] = None
    posterior_segment_os_description: Optional[str] = None

    # MANAGEMENT

    management_counselling_advice_referral: Optional[str] = None
    diagnosis: Optional[str] = None
    glass_prescription_od_sphere: Optional[str] = None
    glass_prescription_od_cylinder: Optional[str] = None
    glass_prescription_od_axis: Optional[str] = None
    glass_prescription_od_add: Optional[str] = None
    glass_prescription_od_prism: Optional[str] = None
    glass_prescription_od_visual_acuity_1: Optional[str] = None
    glass_prescription_od_visual_acuity_2: Optional[str] = None
    glass_prescription_os_sphere: Optional[str] = None
    glass_prescription_os_cylinder: Optional[str] = None
    glass_prescription_os_axis: Optional[str] = None
    glass_prescription_os_add: Optional[str] = None
    glass_prescription_os_prism: Optional[str] = None
    glass_prescription_os_visual_acuity_1: Optional[str] = None
    glass_prescription_os_visual_acuity_2: Optional[str] = None
    distance_pupillary_distance_od: Optional[str] = None
    distance_pupillary_distance_os: Optional[str] = None
    near_pupillary_distance_od: Optional[str] = None
    near_pupillary_distance_os: Optional[str] = None
    segment_height_od: Optional[str] = None
    segment_height_os: Optional[str] = None
    fitting_height_od: Optional[str] = None
    fitting_height_os: Optional[str] = None
    glass_prescription_instruction: Optional[str] = None
    glass_prescription_comments: Optional[str] = None
    edited_by: str
    edited_timestamp: str

    class Config:
        orm_mode = True

        
class RecordOut(BaseModel):

    # PERSONAL DETAILS
    id: Optional[int] = None
    name: Optional[str] = None
    firstName: str
    lastName: Optional[str] = None
    age: Optional[int] = None
    sex: Optional[str] = None
    health_record_no: Optional[str] = None
    mobile_no: Optional[str] = None
    email: Optional[str] = None
    date_of_assessment: Optional[str] = None
    address: Optional[str] = None

    # HISTORY

    complaints: Optional[str] = None
    past_history: Optional[str] = None
    general_health_history: Optional[str] = None
    family_history: Optional[str] = None
    investigation_report: Optional[str] = None
    present_medications: Optional[str] = None
    allergy: Optional[str] = None

    # PREVIOUS GLASS PRESCRIPTION

    previous_glass_prescription_date: Optional[str] = None
    previous_glass_prescription_od: Optional[str] = None
    previous_glass_prescription_od_ds: Optional[str] = None
    previous_glass_prescription_od_dcx: Optional[str] = None
    previous_glass_prescription_od_add: Optional[str] = None
    previous_glass_prescription_os: Optional[str] = None
    previous_glass_prescription_os_ds: Optional[str] = None
    previous_glass_prescription_os_dcx: Optional[str] = None
    previous_glass_prescription_os_add: Optional[str] = None
    previous_glass_prescription_comments: Optional[str] = None

    # VFAA

    vision_od: Optional[str] = None
    vision_od_ph: Optional[str] = None
    vision_od_nv: Optional[str] = None
    vision_od_nv_cms: Optional[str] = None
    vision_os: Optional[str] = None
    vision_os_ph: Optional[str] = None
    vision_os_nv: Optional[str] = None
    vision_os_nv_cms: Optional[str] = None
    vision_ou: Optional[str] = None
    vision_ou_nv: Optional[str] = None
    vision_ou_nv_cms: Optional[str] = None

    flash_od: Optional[str] = None
    flash_od_ds: Optional[str] = None
    flash_od_dcx: Optional[str] = None
    flash_os: Optional[str] = None
    flash_os_ds: Optional[str] = None
    flash_os_dcx: Optional[str] = None

    acceptance_od: Optional[str] = None
    acceptance_od_ds: Optional[str] = None
    acceptance_od_dcx: Optional[str] = None
    acceptance_od_dcx_final: Optional[str] = None
    acceptance_os: Optional[str] = None
    acceptance_os_ds: Optional[str] = None
    acceptance_os_dcx: Optional[str] = None
    acceptance_os_dcx_final: Optional[str] = None
    acceptance_ou_final: Optional[str] = None

    add_od: Optional[str] = None
    add_od_nv: Optional[str] = None
    add_od_nv_cms: Optional[str] = None
    add_os: Optional[str] = None
    add_os_nv: Optional[str] = None
    add_os_nv_cms: Optional[str] = None
    add_ou_nv: Optional[str] = None
    add_ou_nv_cms: Optional[str] = None

    vfaa_comments: Optional[str] = None

    # BINOCULAR VISIONN TEST

    eom_od: Optional[str] = None
    eom_os: Optional[str] = None
    eom_ou: Optional[str] = None
    ct_near: Optional[str] = None
    ct_dist: Optional[str] = None
    npc_subjective: Optional[str] = None
    npc_objective: Optional[str] = None
    npa_od: Optional[str] = None
    npa_os: Optional[str] = None
    npa_ou: Optional[str] = None
    eom_comments: Optional[str] = None

    # PUPIL

    pupil_od: Optional[str] = None
    pupil_os: Optional[str] = None
    pupil_comments: Optional[str] = None

    # ANTERIOR SEGMENT

    lids_od: Optional[str] = None
    lids_os: Optional[str] = None
    conjuctiva_od: Optional[str] = None
    conjuctiva_os: Optional[str] = None
    cornea_od: Optional[str] = None
    cornea_os: Optional[str] = None
    ac_od: Optional[str] = None
    ac_os: Optional[str] = None
    iris_od: Optional[str] = None
    iris_os: Optional[str] = None
    lens_od: Optional[str] = None
    lens_os: Optional[str] = None
    tear_film_od: Optional[str] = None
    tear_film_os: Optional[str] = None
    anterior_segment_comments: Optional[str] = None

    # INTRAOCULAR PRESSURE

    intraocular_pressure_od: Optional[str] = None
    intraocular_pressure_os: Optional[str] = None
    intraocular_pressure_comments: Optional[str] = None
    time: time

   # # POSTERIOR SEGMENT -- IMAGE WITH COMMENTS

    posterior_segment_od_image: Optional[str] = None
    posterior_segment_od_description: Optional[str] = None
    posterior_segment_os_image: Optional[str] = None
    posterior_segment_os_description: Optional[str] = None

    # MANAGEMENT

    management_counselling_advice_referral: Optional[str] = None
    diagnosis: Optional[str] = None
    glass_prescription_od_sphere: Optional[str] = None
    glass_prescription_od_cylinder: Optional[str] = None
    glass_prescription_od_axis: Optional[str] = None
    glass_prescription_od_add: Optional[str] = None
    glass_prescription_od_prism: Optional[str] = None
    glass_prescription_od_visual_acuity_1: Optional[str] = None
    glass_prescription_od_visual_acuity_2: Optional[str] = None
    glass_prescription_os_sphere: Optional[str] = None
    glass_prescription_os_cylinder: Optional[str] = None
    glass_prescription_os_axis: Optional[str] = None
    glass_prescription_os_add: Optional[str] = None
    glass_prescription_os_prism: Optional[str] = None
    glass_prescription_os_visual_acuity_1: Optional[str] = None
    glass_prescription_os_visual_acuity_2: Optional[str] = None
    distance_pupillary_distance_od: Optional[str] = None
    distance_pupillary_distance_os: Optional[str] = None
    near_pupillary_distance_od: Optional[str] = None
    near_pupillary_distance_os: Optional[str] = None
    segment_height_od: Optional[str] = None
    segment_height_os: Optional[str] = None
    fitting_height_od: Optional[str] = None
    fitting_height_os: Optional[str] = None
    glass_prescription_instruction: Optional[str] = None
    glass_prescription_comments: Optional[str] = None
    edited_by: str
    edited_timestamp: str 

    class Config:
        orm_mode = True

class UserRegister(BaseModel):

    username: Optional[str] = None,
    picture: Optional[str] = None,
    role: Optional[str] = None,
    email: Optional[str] = None,
    phone: Optional[str] = None,
    password: Optional[str] = None,

    class Config:
        orm_mode = True

class UserLogin(BaseModel):

    username: Optional[str] = None,
    password: Optional[str] = None,

    class Config:
        orm_mode = True

class Token(BaseModel):
    user: str
    token: str

class TokenData(BaseModel):
    id: Optional[str] = None