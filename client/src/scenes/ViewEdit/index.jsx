import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Minimize,
  PictureAsPdf,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Menu,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import state, { setId, setRecord } from "state";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";

const recordSchema = yup.object().shape({
  // name: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string(),
  age: yup.number().integer().required("required"),
  sex: yup.string().required("required"),
  health_record_no: yup.string().required("required"),
  mobile_no: yup.string(),
  email: yup.string().email("invalid email"),
  date_of_assessment: yup.string(),

  //PERSONAL HISTORY
  complaints: yup.string(),
  past_history: yup.string(),
  general_health_history: yup.string(),
  family_history: yup.string(),
  investigation_report: yup.string(),
  present_medications: yup.string(),
  allergy: yup.string(),

  //PREVIOUS GLASS PRESCRIPTION
  previous_glass_prescription_date: yup.string(),
  previous_glass_prescription_od: yup.string(),
  previous_glass_prescription_od_ds: yup.string(),
  previous_glass_prescription_od_dcx: yup.string(),
  previous_glass_prescription_od_add: yup.string(),
  previous_glass_prescription_os: yup.string(),
  previous_glass_prescription_os_ds: yup.string(),
  previous_glass_prescription_os_dcx: yup.string(),
  previous_glass_prescription_os_add: yup.string(),
  previous_glass_prescription_comments: yup.string(),

  //VFAA

  vision_od: yup.string(),
  vision_od_ph: yup.string(),
  vision_od_nv: yup.string(),
  vision_od_nv_cms: yup.string(),
  vision_os: yup.string(),
  vision_os_ph: yup.string(),
  vision_os_nv: yup.string(),
  vision_os_nv_cms: yup.string(),
  vision_ou: yup.string(),
  vision_ou_nv: yup.string(),
  vision_ou_nv_cms: yup.string(),

  flash_od: yup.string(),
  flash_od_ds: yup.string(),
  flash_od_dcx: yup.string(),
  flash_os: yup.string(),
  flash_os_ds: yup.string(),
  flash_os_dcx: yup.string(),

  acceptance_od: yup.string(),
  acceptance_od_ds: yup.string(),
  acceptance_od_dcx: yup.string(),
  acceptance_od_dcx_final: yup.string(),
  acceptance_os: yup.string(),
  acceptance_os_ds: yup.string(),
  acceptance_os_dcx: yup.string(),
  acceptance_os_dcx_final: yup.string(),
  acceptance_ou_final: yup.string(),

  add_od: yup.string(),
  add_od_nv: yup.string(),
  add_od_nv_cms: yup.string(),
  add_os: yup.string(),
  add_os_nv: yup.string(),
  add_os_nv_cms: yup.string(),
  add_ou_nv: yup.string(),
  add_ou_nv_cms: yup.string(),

  vfaa_comments: yup.string(),
  eom_od: yup.string(),
  eom_os: yup.string(),
  eom_ou: yup.string(),
  ct_near: yup.string(),
  ct_dist: yup.string(),
  npc_subjective: yup.string(),
  npc_objective: yup.string(),
  npa_od: yup.string(),
  npa_os: yup.string(),
  npa_ou: yup.string(),
  eom_comments: yup.string(),

  pupil_od: yup.string(),
  pupil_os: yup.string(),
  pupil_comments: yup.string(),

  lids_od: yup.string(),
  lids_os: yup.string(),
  conjuctiva_od: yup.string(),
  conjuctiva_os: yup.string(),
  cornea_od: yup.string(),
  cornea_os: yup.string(),
  ac_od: yup.string(),
  ac_os: yup.string(),
  iris_od: yup.string(),
  iris_os: yup.string(),
  lens_od: yup.string(),
  lens_os: yup.string(),
  tear_film_od: yup.string(),
  tear_film_os: yup.string(),
  anterior_segment_comments: yup.string(),
  intraocular_pressure_od: yup.string(),
  intraocular_pressure_os: yup.string(),
  intraocular_pressure_comments: yup.string(),
  time: yup.string(),
  posterior_segment_od_image: yup.string(),
  posterior_segment_od_description: yup.string(),
  posterior_segment_os_image: yup.string(),
  posterior_segment_os_description: yup.string(),

  management_counselling_advice_referral: yup.string(),
  glass_prescription_od_sphere: yup.string(),
  glass_prescription_od_cylinder: yup.string(),
  glass_prescription_od_axis: yup.string(),
  glass_prescription_od_add: yup.string(),
  glass_prescription_od_prism: yup.string(),
  glass_prescription_od_visual_acuity_1: yup.string(),
  glass_prescription_od_visual_acuity_2: yup.string(),
  glass_prescription_os_sphere: yup.string(),
  glass_prescription_os_cylinder: yup.string(),
  glass_prescription_os_axis: yup.string(),
  glass_prescription_os_add: yup.string(),
  glass_prescription_os_prism: yup.string(),
  glass_prescription_os_visual_acuity_1: yup.string(),
  glass_prescription_os_visual_acuity_2: yup.string(),
  distance_pupillary_distance_od: yup.string(),
  distance_pupillary_distance_os: yup.string(),
  near_pupillary_distance_od: yup.string(),
  near_pupillary_distance_os: yup.string(),
  segment_height_od: yup.string(),
  segment_height_os: yup.string(),
  fitting_height_od: yup.string(),
  fitting_height_os: yup.string(),
  glass_prescription_instruction: yup.string(),
  glass_prescription_comments: yup.string(),
  diagnosis: yup.string(),
});

const gender = [
  {
    value: "M",
    label: "M",
  },
  {
    value: "F",
    label: "F",
  },
];

const ViewEdit = () => {
  const record = useSelector((state) => state.record);
  const mode = useSelector((state) => state.mode);
  const name = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const success = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: mode === "light" ? "colored" : "dark",
    });
  };

  const error = () => {
    toast.error("ERROR", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: mode === "light" ? "colored" : "dark",
    });
  };

  const ID = useSelector((state) => state.id);

  const GetPdf = () => {
    const pdfUrl = `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/pdf/${ID}`; // Replace with the actual URL of your PDF file

    fetch(pdfUrl, {
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "downloaded.pdf";
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  let odImg = "";
  let osImg = "";

  if (record[0].posterior_segment_od_image !== "") {
    odImg = `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/static/images/${record[0].posterior_segment_od_image}.jpg`;
  }
  if (record[0].posterior_segment_os_image !== "") {
    osImg = `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/static/images/${record[0].posterior_segment_os_image}.jpg`;
  }

  const initialValuesRecord = {
    firstName: record[0].firstName,
    lastName: record[0].lastName,
    age: record[0].age,
    sex: record[0].sex,
    health_record_no: record[0].health_record_no,
    mobile_no: record[0].mobile_no,
    email: record[0].email,
    date_of_assessment: record[0].date_of_assessment,
    complaints: record[0].complaints,
    past_history: record[0].past_history,
    general_health_history: record[0].general_health_history,
    family_history: record[0].family_history,
    investigation_report: record[0].investigation_report,
    present_medications: record[0].present_medications,
    allergy: record[0].allergy,
    previous_glass_prescription_date:
      record[0].previous_glass_prescription_date,
    previous_glass_prescription_od: record[0].previous_glass_prescription_od,
    previous_glass_prescription_od_ds:
      record[0].previous_glass_prescription_od_ds,
    previous_glass_prescription_od_dcx:
      record[0].previous_glass_prescription_od_dcx,
    previous_glass_prescription_od_add:
      record[0].previous_glass_prescription_od_add,
    previous_glass_prescription_os: record[0].previous_glass_prescription_os,
    previous_glass_prescription_os_ds:
      record[0].previous_glass_prescription_os_ds,
    previous_glass_prescription_os_dcx:
      record[0].previous_glass_prescription_os_dcx,
    previous_glass_prescription_os_add:
      record[0].previous_glass_prescription_os_add,
    previous_glass_prescription_comments:
      record[0].previous_glass_prescription_comments,
    vision_od: record[0].vision_od,
    vision_od_ph: record[0].vision_od_ph,
    vision_od_nv: record[0].vision_od_nv,
    vision_od_nv_cms: record[0].vision_od_nv_cms,
    vision_os: record[0].vision_os,
    vision_os_ph: record[0].vision_os_ph,
    vision_os_nv: record[0].vision_os_nv,
    vision_os_nv_cms: record[0].vision_os_nv_cms,
    vision_ou: record[0].vision_ou,
    vision_ou_nv: record[0].vision_ou_nv,
    vision_ou_nv_cms: record[0].vision_ou_nv_cms,

    flash_od: record[0].flash_od,
    flash_od_ds: record[0].flash_od_ds,
    flash_od_dcx: record[0].flash_od_dcx,
    flash_os: record[0].flash_os,
    flash_os_ds: record[0].flash_os_ds,
    flash_os_dcx: record[0].flash_os_dcx,

    acceptance_od: record[0].acceptance_od,
    acceptance_od_ds: record[0].acceptance_od_ds,
    acceptance_od_dcx: record[0].acceptance_od_dcx,
    acceptance_od_dcx_final: record[0].acceptance_od_dcx_final,
    acceptance_os: record[0].acceptance_os,
    acceptance_os_ds: record[0].acceptance_os_ds,
    acceptance_os_dcx: record[0].acceptance_os_dcx,
    acceptance_os_dcx_final: record[0].acceptance_os_dcx_final,
    acceptance_ou_final: record[0].acceptance_ou_final,

    add_od: record[0].add_od,
    add_od_nv: record[0].add_od_nv,
    add_od_nv_cms: record[0].add_od_nv_cms,
    add_os: record[0].add_os,
    add_os_nv: record[0].add_os_nv,
    add_os_nv_cms: record[0].add_os_nv_cms,
    add_ou_nv: record[0].add_ou_nv,
    add_ou_nv_cms: record[0].add_ou_nv_cms,

    vfaa_comments: record[0].vfaa_comments,
    eom_od: record[0].eom_od,
    eom_os: record[0].eom_os,
    eom_ou: record[0].eom_ou,
    ct_near: record[0].ct_near,
    ct_dist: record[0].ct_dist,
    npc_subjective: record[0].npc_subjective,
    npc_objective: record[0].npc_objective,
    npa_od: record[0].npa_od,
    npa_os: record[0].npa_os,
    npa_ou: record[0].npa_ou,
    eom_comments: record[0].eom_comments,

    pupil_od: record[0].pupil_od,
    pupil_os: record[0].pupil_os,
    pupil_comments: record[0].pupil_comments,

    lids_od: record[0].lids_od,
    lids_os: record[0].lids_os,
    conjuctiva_od: record[0].conjuctiva_od,
    conjuctiva_os: record[0].conjuctiva_os,
    cornea_od: record[0].cornea_od,
    cornea_os: record[0].cornea_os,
    ac_od: record[0].ac_od,
    ac_os: record[0].ac_os,
    iris_od: record[0].iris_od,
    iris_os: record[0].iris_os,
    lens_od: record[0].lens_od,
    lens_os: record[0].lens_os,
    tear_film_od: record[0].tear_film_od,
    tear_film_os: record[0].tear_film_os,
    anterior_segment_comments: record[0].anterior_segment_comments,
    intraocular_pressure_od: record[0].intraocular_pressure_od,
    intraocular_pressure_os: record[0].intraocular_pressure_os,
    intraocular_pressure_comments: record[0].intraocular_pressure_comments,
    time: record[0].time,
    posterior_segment_od_image: "",
    posterior_segment_od_description:
      record[0].posterior_segment_od_description,
    posterior_segment_os_image: "",
    posterior_segment_os_description:
      record[0].posterior_segment_os_description,

    management_counselling_advice_referral:
      record[0].management_counselling_advice_referral,
    glass_prescription_od_sphere: record[0].glass_prescription_od_sphere,
    glass_prescription_od_cylinder: record[0].glass_prescription_od_cylinder,
    glass_prescription_od_axis: record[0].glass_prescription_od_axis,
    glass_prescription_od_add: record[0].glass_prescription_od_add,
    glass_prescription_od_prism: record[0].glass_prescription_od_prism,
    glass_prescription_od_visual_acuity_1:
      record[0].glass_prescription_od_visual_acuity_1,
    glass_prescription_od_visual_acuity_2:
      record[0].glass_prescription_od_visual_acuity_2,
    glass_prescription_os_sphere: record[0].glass_prescription_os_sphere,
    glass_prescription_os_cylinder: record[0].glass_prescription_os_cylinder,
    glass_prescription_os_axis: record[0].glass_prescription_os_axis,
    glass_prescription_os_add: record[0].glass_prescription_os_add,
    glass_prescription_os_prism: record[0].glass_prescription_os_prism,
    glass_prescription_os_visual_acuity_1:
      record[0].glass_prescription_os_visual_acuity_1,
    glass_prescription_os_visual_acuity_2:
      record[0].glass_prescription_os_visual_acuity_2,
    distance_pupillary_distance_od: record[0].distance_pupillary_distance_od,
    distance_pupillary_distance_os: record[0].distance_pupillary_distance_os,
    near_pupillary_distance_od: record[0].near_pupillary_distance_od,
    near_pupillary_distance_os: record[0].near_pupillary_distance_os,
    segment_height_od: record[0].segment_height_od,
    segment_height_os: record[0].segment_height_os,
    fitting_height_od: record[0].fitting_height_od,
    fitting_height_os: record[0].fitting_height_os,
    glass_prescription_instruction: record[0].glass_prescription_instruction,
    glass_prescription_comments: record[0].glass_prescription_comments,
    diagnosis: record[0].diagnosis,
  };
  const { palette } = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const divider = palette.secondary.medium;
  const main = palette.primary.main;
  const Minimize = true;
  const [pageType, setPageType] = useState("view");
  const [personalDetails, setPersonalDetails] = useState(Minimize);
  const [patientHistory, setPatientHistory] = useState(Minimize);
  const [previousGlassPrescription, setPreviousGlassPrescription] =
    useState(Minimize);
  const [clinicalRefraction, setClinicalRefraction] = useState(Minimize);
  const [binocularVision, setBinocularVision] = useState(Minimize);
  const [pupil, setPupil] = useState(Minimize);
  const [anteriorSegment, setAnteriorSegment] = useState(Minimize);
  const [intraocularPressure, setIntraocularPressure] = useState(Minimize);
  const [posteriorSegment, setPosteriorSegment] = useState(Minimize);
  const [glassPrescription, setGlassPrescription] = useState(Minimize);
  const [management, setManagement] = useState(Minimize);

  let timestamp = record[0].edited_timestamp;

  function getCurrentTimestamp() {
    var currentdate = new Date();
    var datetime =
      "Last Edited: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      "    " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds() +
      "    IST";
    return datetime;
  }

  const date = getCurrentTimestamp();
  const updateRecord = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("name", `${values.firstName} ${values.lastName}`);
    formData.append("edited_by", name);
    formData.append("edited_timestamp", date);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const updatedRecordResponse = await fetch(
      `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/records/update/${params.id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    if (!(updatedRecordResponse.response >= 400)) {
      success("UPDATED");
      dispatch(setId({ id: null }));
      navigate("/query");
      // setTimeout(() => dispatch(setRecord({ record: null })), 1000);
    } else {
      error();
    }
  };

  const deleteRecord = async (values, onSubmitProps) => {
    const deletedRecord = await fetch(
      `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/records/delete/${params.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!(deletedRecord.response >= 400)) {
      success("DELETED");
      dispatch(setId({ id: null }));
      navigate("/");
      setTimeout(() => dispatch(setRecord({ record: null })), 1000);
    } else {
      error();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "EDIT") await updateRecord(values, onSubmitProps);
    if (pageType === "DELETE") await deleteRecord(values, onSubmitProps);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode === "light" ? "colored" : "dark"}
      />

      {pageType === "view" ? (
        <>
          <Box padding={"0 0 2rem 0"}>
            <Box
              width="80%"
              p="2rem 2rem 0 2rem"
              m="2rem auto"
              borderRadius="1.5rem"
              backgroundColor={palette.background.alt}
            >
              {" "}
              {personalDetails ? (
                <div>
                  <Box
                    m="2.5rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      PERSONAL DETAILS
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setPersonalDetails(!personalDetails)}
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="2.5rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      PERSONAL DETAILS
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setPersonalDetails(!personalDetails)}
                      />
                    </IconButton>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="First Name"
                      InputProps={{
                        readOnly: true,
                      }}
                      name="firstName"
                      defaultValue={record[0].firstName}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Last Name"
                      InputProps={{
                        readOnly: true,
                      }}
                      name="lastName"
                      defaultValue={record[0].lastName}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Age"
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].age}
                      name="age"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Sex"
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].sex}
                      name="sex"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Health Record Number"
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].health_record_no}
                      name="health_record_no"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Email"
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].email}
                      name="email"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Phone"
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].mobile_no}
                      name="mobile_no"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Date of assessment"
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].date_of_assessment}
                      name="date_of_assessment"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      label="Address"
                      multiline
                      maxRows={4}
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={record[0].address}
                      name="address"
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {patientHistory ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      PATIENT HISTORY
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setPatientHistory(!patientHistory)}
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      PATIENT HISTORY
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setPatientHistory(!patientHistory)}
                      />
                    </IconButton>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="Complaints"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={4}
                      defaultValue={record[0].complaints}
                      name="complaints"
                      sx={{
                        gridColumn: "span 2",
                      }}
                    />
                    <TextField
                      label="Past History"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={4}
                      defaultValue={record[0].past_history}
                      name="past_history"
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="General Health History"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={4}
                      defaultValue={record[0].general_health_history}
                      name="general_health_history"
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Family History"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={4}
                      defaultValue={record[0].family_history}
                      name="family_history"
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Past Investigation Report"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={4}
                      defaultValue={record[0].investigation_report}
                      name="investigation_report"
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Present Medications"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={4}
                      defaultValue={record[0].present_medications}
                      name="present_medications"
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Allergy"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={record[0].allergy}
                      name="allergy"
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "2rem",
                    }}
                  ></div>
                </div>
              )}
              {previousGlassPrescription ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      PREVIOUS GLASS PRESCRIPTION
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() =>
                          setPreviousGlassPrescription(
                            !previousGlassPrescription
                          )
                        }
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      PREVIOUS GLASS PRESCRIPTION
                    </Typography>
                    <FlexBetween gap="30px">
                      <TextField
                        label="DATE"
                        defaultValue={record[0].date}
                        name="date"
                        sx={{ gridColumn: "span 1" }}
                      />
                      <IconButton>
                        <ArrowUpwardOutlined
                          onClick={() =>
                            setPreviousGlassPrescription(
                              !previousGlassPrescription
                            )
                          }
                        />
                      </IconButton>
                    </FlexBetween>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                    sx={{ "&>div": "span 6" }}
                  >
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      fontSize="20px"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      OD
                    </Typography>
                    <TextField
                      label="OD"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={record[0].previous_glass_prescription_od}
                      name="previous_glass_prescription_od"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      fontSize="20px"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      DS /
                    </Typography>
                    <TextField
                      label="DS"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={record[0].previous_glass_prescription_od_ds}
                      name="previous_glass_prescription_od_ds"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      X
                    </Typography>
                    <TextField
                      label="DC"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={
                        record[0].previous_glass_prescription_od_dcx
                      }
                      name="previous_glass_prescription_od_dcx"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      ADD
                    </Typography>
                    <TextField
                      label="ADD"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={
                        record[0].previous_glass_prescription_od_add
                      }
                      name="previous_glass_prescription_od_add"
                      sx={{ gridColumn: "span 1" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                    sx={{ "&>div": "span 6" }}
                    margin="2rem 0"
                  >
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      fontSize="20px"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      OS
                    </Typography>
                    <TextField
                      label="OS"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={record[0].previous_glass_prescription_os}
                      name="previous_glass_prescription_os"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      fontSize="20px"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      DS /
                    </Typography>
                    <TextField
                      label="DS"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={record[0].previous_glass_prescription_os_ds}
                      name="previous_glass_prescription_os_ds"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      X
                    </Typography>
                    <TextField
                      label="DC"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={
                        record[0].previous_glass_prescription_os_dcx
                      }
                      name="previous_glass_prescription_os_dcx"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Typography
                      fontWeight={300}
                      variant="h5"
                      marginTop="1rem"
                      marginLeft="1rem"
                      sx={{ gridColumn: "span 1" }}
                      justifySelf="center"
                    >
                      ADD
                    </Typography>
                    <TextField
                      label="DC"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      defaultValue={
                        record[0].previous_glass_prescription_os_add
                      }
                      name="previous_glass_prescription_os_add"
                      sx={{ gridColumn: "span 1" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    margin="3rem 2rem"
                  >
                    <TextField
                      label="Comments"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      rows={2}
                      justifySelf="center"
                      defaultValue={
                        record[0].previous_glass_prescription_comments
                      }
                      name="previous_glass_prescription_comments"
                      sx={{ gridColumn: "span 3" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "2rem",
                    }}
                  ></div>
                </div>
              )}
              {clinicalRefraction ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      CLINICAL REFRACTION
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() =>
                          setClinicalRefraction(!clinicalRefraction)
                        }
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      CLINICAL REFRACTION
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() =>
                          setClinicalRefraction(!clinicalRefraction)
                        }
                      />
                    </IconButton>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OD </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "3/ span 1" }} justifySelf="center">
                      <TextField
                        label="OD"
                        InputProps={{
                          readOnly: true,
                        }}
                        justifySelf="center"
                        defaultValue={record[0].vision_od}
                        name="vision_od"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box sx={{ gridColumn: "5/ span 1" }} justifySelf="center">
                      <TextField
                        label="PH"
                        InputProps={{
                          readOnly: true,
                        }}
                        justifySelf="center"
                        defaultValue={record[0].vision_od_ph}
                        name="vision_od_ph"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box sx={{ gridColumn: "7/ span 1" }} justifySelf="center">
                      <TextField
                        label="NV"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_od_nv}
                        name="vision_od_nv"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "8/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> @ </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "9/ span 1" }} justifySelf="center">
                      <TextField
                        label="cms"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_od_nv_cms}
                        name="vision_od_nv_cms"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "10/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> cms </Typography>
                    </Box>
                  </Box>
                  <Box
                    margin="2rem 0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "1/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                      marginLeft="2rem"
                      marginRight="1rem"
                    >
                      <Typography variant="h4">{"VISION"}</Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OS </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "3/ span 1" }} justifySelf="center">
                      <TextField
                        label="OS"
                        InputProps={{
                          readOnly: true,
                        }}
                        justifySelf="center"
                        defaultValue={record[0].vision_os}
                        name="vision_os"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "4/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> PH </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "5/ span 1" }} justifySelf="center">
                      <TextField
                        label="PH"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_os_ph}
                        name="vision_os_ph"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "6/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> NV </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "7/ span 1" }} justifySelf="center">
                      <TextField
                        label="NV"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_os_nv}
                        name="vision_os_nv"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "8/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> @ </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "9/ span 1" }} justifySelf="center">
                      <TextField
                        label="cms"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_os_nv_cms}
                        name="vision_os_nv_cms"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "10/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> cms </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                    sx={{ "&>div": "span 6" }}
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OU </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "3/ span 1" }} justifySelf="center">
                      <TextField
                        label="OU"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_ou}
                        name="vision_ou"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box sx={{ gridColumn: "7/ span 1" }} justifySelf="center">
                      <TextField
                        label="NV"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_ou_nv}
                        name="vision_ou_nv"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "8/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> @ </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "9/ span 1" }} justifySelf="center">
                      <TextField
                        label="cms"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].vision_ou_nv_cms}
                        name="vision_ou_nv_cms"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "10/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> cms </Typography>
                    </Box>
                  </Box>
                  <Box
                    margin="4rem 0 0 0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "1/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                      marginLeft="2rem"
                      marginRight="1rem"
                    >
                      <Typography variant="h4">{"FLASH"}</Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OD </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "3/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <TextField
                        label="OD"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].flash_od}
                        name="flash_od"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "4/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> DS/ </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "5/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].flash_od_ds}
                        name="flash_od_ds"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "6/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> X </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "7/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DC"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].flash_od_dcx}
                        name="flash_od_dcx"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    margin="2rem 0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OS </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "3/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="OS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].flash_os}
                        name="flash_os"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "4/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> DS/ </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "5/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].flash_os_ds}
                        name="flash_os_ds"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "6/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> X </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "7/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DC"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].flash_os_dcx}
                        name="flash_os_dcx"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    margin="4rem 0 0 0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OD </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "3/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="OD"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_od}
                        name="acceptance_od"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "4/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> DS/ </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "5/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_od_ds}
                        name="acceptance_od_ds"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "6/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> X </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "7/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DC"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_od_dcx}
                        name="acceptance_od_dcx"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "9/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_od_dcx_final}
                        name="acceptance_od_dcx_final"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    margin="2rem 0 0 0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "1/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                      marginLeft="2rem"
                      marginRight="1rem"
                    >
                      <Typography variant="h5">{"ACCEPTANCE"}</Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OS </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "3/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="OS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_os}
                        name="acceptance_os"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "4/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> DS/ </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "5/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label="DS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_os_ds}
                        name="acceptance_os_ds"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "6/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> X </Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "7/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <TextField
                        label="DC"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_os_dcx}
                        name="acceptance_os_dcx"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "9/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_os_dcx_final}
                        name="acceptance_os_dcx_final"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                  </Box>
                  <Box
                    margin="2rem 0  0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OU </Typography>
                    </Box>

                    <Box
                      sx={{ gridColumn: "9/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      {" "}
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].acceptance_ou_final}
                        name="acceptance_ou_final"
                      />
                    </Box>
                  </Box>
                  <Box
                    display="grid"
                    margin="4rem 0 0 0"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OD </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "3/ span 1" }} justifySelf="center">
                      <TextField
                        label="OD"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_od}
                        name="add_od"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>

                    <Box sx={{ gridColumn: "7/ span 1" }} justifySelf="center">
                      <TextField
                        label="NV"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_od_nv}
                        name="add_od_nv"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "8/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> @ </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "9/ span 1" }} justifySelf="center">
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_od_nv_cms}
                        name="add_od_nv_cms"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "10/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> cms </Typography>
                    </Box>
                  </Box>
                  <Box
                    margin="2rem 0"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                  >
                    <Box
                      sx={{ gridColumn: "1/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                      marginLeft="2rem"
                      marginRight="1rem"
                    >
                      <Typography variant="h4">{"ADD"}</Typography>
                    </Box>
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OS </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "3/ span 1" }} justifySelf="center">
                      <TextField
                        label="OS"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_os}
                        name="add_os"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "6/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> NV </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "7/ span 1" }} justifySelf="center">
                      <TextField
                        label="NV"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_os_nv}
                        name="add_os_nv"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "8/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> @ </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "9/ span 1" }} justifySelf="center">
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_os_nv_cms}
                        name="add_os_nv_cms"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "10/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> cms </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="grid"
                    margin="2rem 0 0 0"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                    sx={{ "&>div": "span 6" }}
                  >
                    <Box
                      sx={{ gridColumn: "2/ span 1" }}
                      justifySelf="right"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> OU </Typography>
                    </Box>

                    <Box sx={{ gridColumn: "7/ span 1" }} justifySelf="center">
                      <TextField
                        label="NV"
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_ou_nv}
                        name="add_ou_nv"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "8/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h4"> @ </Typography>
                    </Box>
                    <Box sx={{ gridColumn: "9/ span 1" }} justifySelf="center">
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        multiline
                        justifySelf="center"
                        defaultValue={record[0].add_ou_nv_cms}
                        name="add_ou_nv_cms"
                        sx={{ gridColumn: "span 3" }}
                      />
                    </Box>
                    <Box
                      sx={{ gridColumn: "10/ span 1" }}
                      justifySelf="center"
                      alignSelf="center"
                    >
                      <Typography variant="h5"> cms </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    margin="3rem 2rem "
                  >
                    <TextField
                      label="Comments"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      rows={2}
                      justifySelf="center"
                      defaultValue={record[0].vfaa_comments}
                      name="vfaa_comments"
                      sx={{ gridColumn: "span 3" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {binocularVision ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      BINOCULAR VISION TEST
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setBinocularVision(!binocularVision)}
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      BINOCULAR VISION TEST
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setBinocularVision(!binocularVision)}
                      />
                    </IconButton>
                  </FlexBetween>

                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      margin="1rem 0 2rem 2rem"
                    >
                      EOM
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      margin="1rem 0 2rem 2rem"
                    >
                      OD
                    </Typography>
                    <TextField
                      label="OD"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      maxRows={2}
                      justifySelf="center"
                      defaultValue={record[0].eom_od}
                      name="eom_od"
                      sx={{ gridColumn: "3/ span 1" }}
                    />
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      margin="1rem 0 2rem 2rem"
                      justifySelf={"center"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label="OS"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRowsrows={2}
                      justifySelf="center"
                      defaultValue={record[0].eom_os}
                      name="eom_os"
                      sx={{ gridColumn: "5/ span 1" }}
                    />
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      margin="1rem 0 2rem 2rem"
                      justifySelf={"center"}
                    >
                      OU
                    </Typography>
                    <TextField
                      label="OU"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRowsrows={2}
                      justifySelf="center"
                      defaultValue={record[0].eom_ou}
                      name="eom_ou"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                    margin="2rem 0 2rem 2rem"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      alignSelf={"center"}
                    >
                      CT
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "span 1" }}
                    >
                      DISTANCE
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="center"
                      defaultValue={record[0].ct_dist}
                      name="ct_dist"
                      marginTop="2rem"
                      sx={{ gridColumn: "3/ span 2" }}
                    />
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "2/span 1" }}
                    >
                      NEAR
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="center"
                      defaultValue={record[0].ct_near}
                      name="ct_near"
                      marginTop="2rem"
                      sx={{ gridColumn: "3/ span 2" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                    margin="3rem 0 2rem 2rem"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      alignSelf={"center"}
                    >
                      NPC
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "2/span 1" }}
                    >
                      SUBJECTIVE
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="right"
                      defaultValue={record[0].npc_subjective}
                      name="npc_subjective"
                      marginTop="2rem"
                      sx={{ gridColumn: "3/ span 2" }}
                    />
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "5/span 1" }}
                    >
                      OBJECTIVE
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="right"
                      defaultValue={record[0].npc_objective}
                      name="npc_objective"
                      marginTop="2rem"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                    margin="3rem 0 2rem 2rem"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "span 1" }}
                      alignSelf={"center"}
                    >
                      NPA
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      justifySelf={"center"}
                      sx={{ gridColumn: "2/span 1" }}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="right"
                      defaultValue={record[0].npa_od}
                      name="npa_od"
                      marginTop="2rem"
                      sx={{ gridColumn: "3/ span 1" }}
                    />
                    <Typography
                      fontWeight="300"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "4/span 1" }}
                    >
                      cms
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      justifySelf={"center"}
                      sx={{ gridColumn: "5/span 1" }}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="right"
                      defaultValue={record[0].npa_os}
                      name="npa_os"
                      marginTop="2rem"
                      sx={{ gridColumn: "6/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "7/span 1" }}
                    >
                      cms
                    </Typography>
                    <Typography
                      fontWeight="400"
                      variant="h4"
                      alignSelf={"center"}
                      justifySelf={"center"}
                      sx={{ gridColumn: "8/span 1" }}
                    >
                      OU
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      maxRows={2}
                      justifySelf="right"
                      defaultValue={record[0].npa_ou}
                      name="npa_ou"
                      marginTop="2rem"
                      sx={{ gridColumn: "9/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h4"
                      alignSelf={"center"}
                      sx={{ gridColumn: "10/span 1" }}
                    >
                      cms
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    margin="3rem 2rem "
                  >
                    <TextField
                      label="Comments"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      rows={2}
                      justifySelf="center"
                      defaultValue={record[0].eom_comments}
                      name="eom_comments"
                      sx={{ gridColumn: "span 3" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {pupil ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      PUPIL
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined onClick={() => setPupil(!pupil)} />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      PUPIL
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined onClick={() => setPupil(!pupil)} />
                    </IconButton>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "1/span 1" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].pupil_od}
                      name="pupil_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "4/span 1" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].pupil_os}
                      name="pupil_os"
                      sx={{ gridColumn: "5/ span 2" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    margin="3rem 2rem "
                  >
                    <TextField
                      label="Comments"
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      rows={2}
                      justifySelf="center"
                      defaultValue={record[0].pupil_comments}
                      name="pupil_comments"
                      sx={{ gridColumn: "span 3" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {anteriorSegment ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      ANTERIOR SEGMENT
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setAnteriorSegment(!anteriorSegment)}
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      ANTERIOR SEGMENT
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setAnteriorSegment(!anteriorSegment)}
                      />
                    </IconButton>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "2/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      OD
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "6/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      OS
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                    margin={"1rem 0 0 1rem"}
                  >
                    {" "}
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].lids_od}
                      name="lids_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      LIDS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].lids_os}
                      name="lids_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].conjuctiva_od}
                      name="conjuctiva_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      CONJUNCTIVA
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].conjuctiva_os}
                      name="conjuctiva_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].cornea_od}
                      name="cornea_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      CORNEA
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].cornea_os}
                      name="cornea_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].ac_od}
                      name="ac_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      AC
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].ac_os}
                      name="ac_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].iris_od}
                      name="iris_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      IRIS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].iris_os}
                      name="iris_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].lens_od}
                      name="lens_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      LENS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].lens_os}
                      name="lens_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].tear_film_od}
                      name="tear_film_od"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "4/span 2" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      TEAR FILM
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].tear_film_os}
                      name="tear_film_os"
                      sx={{ gridColumn: "6/ span 2" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                    margin="3rem 2rem "
                  >
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "1" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"top"}
                    >
                      COMMENTS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      rows={2}
                      justifySelf="center"
                      defaultValue={record[0].anterior_segment_comments}
                      name="anterior_segment_comments"
                      sx={{ gridColumn: "2/ span 6" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </>
              )}
              {intraocularPressure ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      INTRAOCULAR PRESSURE
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() =>
                          setIntraocularPressure(!intraocularPressure)
                        }
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      justifySelf={"top"}
                    >
                      INTRAOCULAR PRESSURE
                    </Typography>
                    <FlexBetween gap="30px">
                      <Typography
                        fontWeight="200"
                        variant="h4"
                        alignSelf={"center"}
                        justifySelf={"center"}
                        sx={{ gridColumn: "6/ span 1" }}
                      >
                        TIME
                      </Typography>
                      <TextField
                        label=""
                        InputProps={{
                          readOnly: true,
                        }}
                        defaultValue={record[0].time}
                        name="time"
                        sx={{ gridColumn: "7/ span 1" }}
                      />
                      <IconButton>
                        <ArrowUpwardOutlined
                          onClick={() =>
                            setIntraocularPressure(!intraocularPressure)
                          }
                        />
                      </IconButton>
                    </FlexBetween>
                  </FlexBetween>

                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "1/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].intraocular_pressure_od}
                      name="intraocular_pressure_od"
                      sx={{ gridColumn: "2/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "3/span 1" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      mmHg
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "5/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].intraocular_pressure_os}
                      name="intraocular_pressure_os"
                      sx={{ gridColumn: "6/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "7/span 1" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      mmHg
                    </Typography>
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      marginBottom={"1rem"}
                      sx={{ gridColumn: "1/span 1" }}
                      marginLeft={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"center"}
                    >
                      COMMENTS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].intraocular_pressure_comments}
                      name="intraocular_pressure_comments"
                      sx={{ gridColumn: "2/ span 2" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {posteriorSegment ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      POSTERIOR SEGMENT
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setPosteriorSegment(!posteriorSegment)}
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      POSTERIOR SEGMENT
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setPosteriorSegment(!posteriorSegment)}
                      />
                    </IconButton>
                  </FlexBetween>

                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                  >
                    <Box
                      gridColumn="2/ span 4"
                      border={`1px solid ${palette.secondary.medium}`}
                      borderRadius="5px"
                      p="1rem"
                    >
                      <Box
                        component="img"
                        sx={{
                          height: "100%",
                          width: "100%",
                        }}
                        alt="RIGHT EYE IMAGE"
                        src={odImg}
                      />
                    </Box>
                    <Box
                      gridColumn="7/ span 4"
                      border={`1px solid ${palette.secondary.medium}`}
                      borderRadius="5px"
                      p="1rem"
                    >
                      <Box
                        component="img"
                        sx={{
                          height: "100%",
                          width: "100%",
                        }}
                        alt="LEFT EYE IMAGE"
                        src={osImg}
                      />
                    </Box>
                    <TextField
                      label="OD IMAGE DESCRIPTION"
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].posterior_segment_od_description}
                      name="posterior_segment_od_description"
                      sx={{ gridColumn: "2/ span 4" }}
                    />
                    <TextField
                      label="OS IMAGE DESCRIPTION"
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].posterior_segment_os_description}
                      name="posterior_segment_os_description"
                      sx={{ gridColumn: "7/ span 4" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {glassPrescription ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      GLASS PRESCRIPTION
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setGlassPrescription(!glassPrescription)}
                      />
                    </IconButton>
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      GLASS PRESCSRIPTION
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setGlassPrescription(!glassPrescription)}
                      />
                    </IconButton>
                  </FlexBetween>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "2/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      SPHERE
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "3/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      CYLINDER
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "4/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      AXIS
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "5/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      ADD
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "6/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      PRISM
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "7/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      VISUAL ACUITY
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"1.5rem"}
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "1/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_od_sphere}
                      name="glass_prescription_od_sphere"
                      sx={{ gridColumn: "2/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_od_cylinder}
                      name="glass_prescription_od_cylinder"
                      sx={{ gridColumn: "3/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_od_axis}
                      name="glass_prescription_od_axis"
                      sx={{ gridColumn: "4/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_od_add}
                      name="glass_prescription_od_add"
                      sx={{ gridColumn: "5/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_od_prism}
                      name="glass_prescription_od_prism"
                      sx={{ gridColumn: "6/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={
                        record[0].glass_prescription_od_visual_acuity_1
                      }
                      name="glass_prescription_od_visual_acuity_1"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"1.5rem"}
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={
                        record[0].glass_prescription_od_visual_acuity_2
                      }
                      name="glass_prescription_od_visual_acuity_2"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"1.5rem"}
                    gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="500"
                      variant="h4"
                      sx={{ gridColumn: "1/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_os_sphere}
                      name="glass_prescription_os_sphere"
                      sx={{ gridColumn: "2/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_os_cylinder}
                      name="glass_prescription_os_cylinder"
                      sx={{ gridColumn: "3/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_os_axis}
                      name="glass_prescription_os_axis"
                      sx={{ gridColumn: "4/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_os_add}
                      name="glass_prescription_os_add"
                      sx={{ gridColumn: "5/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].glass_prescription_os_prism}
                      name="glass_prescription_os_prism"
                      sx={{ gridColumn: "6/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={
                        record[0].glass_prescription_os_visual_acuity_1
                      }
                      name="glass_prescription_os_visual_acuity_1"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={
                        record[0].glass_prescription_os_visual_acuity_2
                      }
                      name="glass_prescription_os_visual_acuity_2"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      {"DISTANCE\tPUPILLARY\tDISTANCE"}
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "3/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].distance_pupillary_distance_od}
                      name="distance_pupillary_distance_od"
                      sx={{ gridColumn: "4/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "5/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "6/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].distance_pupillary_distance_os}
                      name="distance_pupillary_distance_os"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "8/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      {"NEAR\tPUPILLARY\tDISTANCE"}
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "3/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].near_pupillary_distance_od}
                      name="near_pupillary_distance_od"
                      sx={{ gridColumn: "4/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "5/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "6/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].near_pupillary_distance_os}
                      name="near_pupillary_distance_os"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "8/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      {"SEGMENT\tHEIGHT"}
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "3/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].segment_height_od}
                      name="segment_height_od"
                      sx={{ gridColumn: "4/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "5/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "6/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].segment_height_os}
                      name="segment_height_os"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "8/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      {"FITTING\tHEIGHT"}
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "3/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OD
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].fitting_height_od}
                      name="fitting_height_od"
                      sx={{ gridColumn: "4/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "5/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                    <Typography
                      fontWeight="500"
                      variant="h5"
                      sx={{ gridColumn: "6/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"center"}
                      alignSelf={"end"}
                    >
                      OS
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      defaultValue={record[0].fitting_height_os}
                      name="fitting_height_os"
                      sx={{ gridColumn: "7/ span 1" }}
                    />
                    <Typography
                      fontWeight="200"
                      variant="h5"
                      sx={{ gridColumn: "8/span 1" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      mm
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      {" INSTRUCTION"}
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      multiline
                      maxRows={2}
                      defaultValue={record[0].glass_prescription_instruction}
                      name="glass_prescription_instruction"
                      sx={{ gridColumn: "4/ span 4" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"end"}
                    >
                      {"COMMENTS"}
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      multiline
                      maxRows={2}
                      defaultValue={record[0].glass_prescription_comments}
                      name="glass_prescription_comments"
                      sx={{ gridColumn: "4/ span 4" }}
                    />
                  </Box>
                  <div
                    style={{
                      borderTop: `2px solid ${divider} `,
                      marginTop: "3rem",
                    }}
                  ></div>
                </div>
              )}
              {management ? (
                <div>
                  <Box
                    m="1.25rem 0.25rem 0.5rem"
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight="500" variant="h4">
                      MANAGEMENT
                    </Typography>
                    <IconButton>
                      <ArrowDownwardOutlined
                        onClick={() => setManagement(!management)}
                      />
                    </IconButton>
                  </Box>
                </div>
              ) : (
                <div>
                  <FlexBetween m="1.25rem 0.25rem 2rem">
                    <Typography fontWeight="500" variant="h4">
                      MANAGEMENT
                    </Typography>
                    <IconButton>
                      <ArrowUpwardOutlined
                        onClick={() => setManagement(!management)}
                      />
                    </IconButton>
                  </FlexBetween>

                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"start"}
                    >
                      {"DIAGNOSIS"}
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      multiline
                      maxRows={3}
                      defaultValue={record[0].diagnosis}
                      name="diagnosis"
                      sx={{ gridColumn: "3/ span 5" }}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    marginTop={"2.5rem"}
                    gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                  >
                    {" "}
                    <Typography
                      fontWeight="300"
                      variant="h5"
                      sx={{ gridColumn: "1/span 2" }}
                      marginLeft={"1rem"}
                      marginBottom={"1rem"}
                      justifySelf={"left"}
                      alignSelf={"start"}
                    >
                      {"ADVICE/\nCOUNSELLING/\nREFERRAL"}
                    </Typography>
                    <TextField
                      label=""
                      InputProps={{
                        readOnly: true,
                      }}
                      justifySelf="center"
                      multiline
                      maxRows={5}
                      defaultValue={
                        record[0].management_counselling_advice_referral
                      }
                      name="management_counselling_advice_referral"
                      sx={{ gridColumn: "3/ span 5" }}
                    />
                  </Box>
                </div>
              )}
              <Box display="flex" gap="30px" justifyContent="center">
                <Button
                  type="submit"
                  onClick={() => {
                    setPageType((pageType) => (pageType = "EDIT"));
                  }}
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: main,
                    color: palette.background.alt,
                    "&:hover": { color: main },
                    width: "20%",
                    justifyContent: "center",
                  }}
                >
                  {"EDIT"}
                </Button>
                <Button
                  onClick={() => {
                    GetPdf();
                    success("PDF GENERATED");
                  }}
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: main,
                    color: palette.background.alt,
                    "&:hover": { color: main },
                    width: "20%",
                    justifyContent: "center",
                  }}
                >
                  {"PDF"}
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box padding={"0 0 2rem 0"}>
          <Box
            width="80%"
            p="2rem 2rem 0 2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={palette.background.alt}
          >
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValuesRecord}
              validationSchema={recordSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  {personalDetails ? (
                    <div>
                      <Box
                        m="2.5rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          PERSONAL DETAILS
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() => setPersonalDetails(!personalDetails)}
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="2.5rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          PERSONAL DETAILS
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() => setPersonalDetails(!personalDetails)}
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      >
                        <TextField
                          label="Firstname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          name="firstName"
                          error={
                            Boolean(touched.firstName) &&
                            Boolean(errors.firstName)
                          }
                          helperText={touched.firstName && errors.firstName}
                          sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                          label="Lastname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          name="lastName"
                          sx={{ gridColumn: "span 1" }}
                        />

                        <TextField
                          label="Age"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.age}
                          name="age"
                          error={Boolean(touched.age) && Boolean(errors.age)}
                          helperText={
                            touched.age && errors.age ? "Invalid value" : ""
                          }
                          sx={{ gridColumn: "span 1" }}
                        />

                        <TextField
                          select
                          label="Sex"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.sex}
                          name="sex"
                          error={Boolean(touched.sex) && Boolean(errors.sex)}
                          helperText={touched.sex && errors.sex}
                          sx={{ gridColumn: "span 1" }}
                        >
                          {gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          label="Health Record Number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.health_record_no}
                          name="health_record_no"
                          error={
                            Boolean(touched.health_record_no) &&
                            Boolean(errors.health_record_no)
                          }
                          helperText={
                            touched.health_record_no && errors.health_record_no
                          }
                          sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                          label="Phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.mobile_no}
                          name="mobile_no"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                          label="Date of assessment"
                          onBlur={handleBlur}
                          noValidate
                          onChange={handleChange}
                          value={values.date_of_assessment}
                          name="date_of_assessment"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                          label="Address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          name="address"
                          multiline
                          maxRows={4}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {patientHistory ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          PATIENT HISTORY
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() => setPatientHistory(!patientHistory)}
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          PATIENT HISTORY
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() => setPatientHistory(!patientHistory)}
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      >
                        <TextField
                          label="Complaints"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          value={values.complaints}
                          name="complaints"
                          sx={{
                            gridColumn: "span 2",
                          }}
                        />
                        <TextField
                          label="Past History"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          value={values.past_history}
                          name="past_history"
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          label="General Health History"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          value={values.general_health_history}
                          name="general_health_history"
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          label="Family History"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          value={values.family_history}
                          name="family_history"
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          label="Past Investigation Report"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          value={values.investigation_report}
                          name="investigation_report"
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          label="Present Medications"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          value={values.present_medications}
                          name="present_medications"
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          label="Allergy"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={2}
                          value={values.allergy}
                          name="allergy"
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "2rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {previousGlassPrescription ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          PREVIOUS GLASS PRESCRIPTION
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() =>
                              setPreviousGlassPrescription(
                                !previousGlassPrescription
                              )
                            }
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          PREVIOUS GLASS PRESCRIPTION
                        </Typography>
                        <FlexBetween gap="30px">
                          <Typography variant="h4" fontWeight={400}>
                            DATE
                          </Typography>
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.date}
                            name="date"
                            sx={{ gridColumn: "span 1" }}
                          />
                          <IconButton>
                            <ArrowUpwardOutlined
                              onClick={() =>
                                setPreviousGlassPrescription(
                                  !previousGlassPrescription
                                )
                              }
                            />
                          </IconButton>
                        </FlexBetween>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          fontSize="20px"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          OD
                        </Typography>
                        <TextField
                          label="OD"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_od}
                          name="previous_glass_prescription_od"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          fontSize="20px"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          DS /
                        </Typography>
                        <TextField
                          label="DS"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_od_ds}
                          name="previous_glass_prescription_od_ds"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          X
                        </Typography>
                        <TextField
                          label="DC"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_od_dcx}
                          name="previous_glass_prescription_od_dcx"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          ADD
                        </Typography>
                        <TextField
                          label="DC"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_od_add}
                          name="previous_glass_prescription_od_add"
                          sx={{ gridColumn: "span 1" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                        margin="2rem 0"
                      >
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          fontSize="20px"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          OS
                        </Typography>
                        <TextField
                          label="OS"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_os}
                          name="previous_glass_prescription_os"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          fontSize="20px"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          DS /
                        </Typography>
                        <TextField
                          label="DS"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_os_ds}
                          name="previous_glass_prescription_os_ds"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          X
                        </Typography>
                        <TextField
                          label="DC"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_os_dcx}
                          name="previous_glass_prescription_os_dcx"
                          sx={{ gridColumn: "span 1" }}
                        />
                        <Typography
                          fontWeight={300}
                          variant="h5"
                          marginTop="1rem"
                          marginLeft="1rem"
                          sx={{ gridColumn: "span 1" }}
                          justifySelf="center"
                        >
                          ADD
                        </Typography>
                        <TextField
                          label="DC"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.previous_glass_prescription_os_add}
                          name="previous_glass_prescription_os_add"
                          sx={{ gridColumn: "span 1" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        margin="3rem 2rem"
                      >
                        <TextField
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          justifySelf="center"
                          value={values.previous_glass_prescription_comments}
                          name="previous_glass_prescription_comments"
                          sx={{ gridColumn: "span 3" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "2rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {clinicalRefraction ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          CLINICAL REFRACTION
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() =>
                              setClinicalRefraction(!clinicalRefraction)
                            }
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          CLINICAL REFRACTION
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() =>
                              setClinicalRefraction(!clinicalRefraction)
                            }
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OD </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="OD"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_od}
                            name="vision_od"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "5/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="PH"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_od_ph}
                            name="vision_od_ph"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="NV"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline
                            justifySelf="center"
                            value={values.vision_od_nv}
                            name="vision_od_nv"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "8/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> @ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="cms"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline
                            justifySelf="center"
                            value={values.vision_od_nv_cms}
                            name="vision_od_nv_cms"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "10/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> cms </Typography>
                        </Box>
                      </Box>
                      <Box
                        margin="2rem 0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "1/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                          marginLeft="2rem"
                          marginRight="1rem"
                        >
                          <Typography variant="h4">{"VISION"}</Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OS </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="OS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_os}
                            name="vision_os"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "4/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> PH </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "5/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="PH"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_os_ph}
                            name="vision_os_ph"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "6/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> NV </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="NV"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_os_nv}
                            name="vision_os_nv"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "8/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> @ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="cms"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_os_nv_cms}
                            name="vision_os_nv_cms"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "10/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> cms </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OU </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="OU"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_ou}
                            name="vision_ou"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="NV"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.vision_ou_nv}
                            name="vision_ou_nv"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "8/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> @ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="cms"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline
                            justifySelf="center"
                            value={values.vision_ou_nv_cms}
                            name="vision_ou_nv_cms"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "10/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> cms </Typography>
                        </Box>
                      </Box>
                      <Box
                        margin="4rem 0 0 0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "1/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                          marginLeft="2rem"
                          marginRight="1rem"
                        >
                          <Typography variant="h4">{"FLASH"}</Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OD </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="OD"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.flash_od}
                            name="flash_od"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "4/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> DS/ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "5/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.flash_od_ds}
                            name="flash_od_ds"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "6/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> X </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DC"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.flash_od_dcx}
                            name="flash_od_dcx"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                      </Box>
                      <Box
                        margin="2rem 0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OS </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="OS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.flash_os}
                            name="flash_os"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "4/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> DS/ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "5/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          {" "}
                          <TextField
                            label="DS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.flash_os_ds}
                            name="flash_os_ds"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "6/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> X </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DC"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.flash_os_dcx}
                            name="flash_os_dcx"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                      </Box>
                      <Box
                        margin="4rem 0 0 0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OD </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="OD"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_od}
                            name="acceptance_od"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "4/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> DS/ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "5/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_od_ds}
                            name="acceptance_od_ds"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "6/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> X </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DC"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_od_dcx}
                            name="acceptance_od_dcx"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline
                            justifySelf="center"
                            value={values.acceptance_od_dcx_final}
                            name="acceptance_od_dcx_final"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                      </Box>
                      <Box
                        margin="2rem 0 0 0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "1/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                          marginLeft="2rem"
                          marginRight="1rem"
                        >
                          <Typography variant="h5">{"ACCEPTANCE"}</Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OS </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="OS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_os}
                            name="acceptance_os"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "4/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> DS/ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "5/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_os_ds}
                            name="acceptance_os_ds"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "6/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> X </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label="DC"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_os_dcx}
                            name="acceptance_os_dcx"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.acceptance_os_dcx_final}
                            name="acceptance_os_dcx_final"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                      </Box>
                      <Box
                        margin="2rem 0  0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OU </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            multiline
                            justifySelf="center"
                            value={values.acceptance_ou_final}
                            name="acceptance_ou_final"
                          />
                        </Box>
                      </Box>
                      <Box
                        display="grid"
                        margin="4rem 0 0 0"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OD </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="OD"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_od}
                            name="add_od"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>

                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="NV"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_od_nv}
                            name="add_od_nv"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "8/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> @ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_od_nv_cms}
                            name="add_od_nv_cms"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "10/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> cms </Typography>
                        </Box>
                      </Box>
                      <Box
                        margin="2rem 0"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "1/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                          marginLeft="2rem"
                          marginRight="1rem"
                        >
                          <Typography variant="h4">{"ADD"}</Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OS </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "3/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="OS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_os}
                            name="add_os"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "6/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> NV </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="NV"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_os_nv}
                            name="add_os_nv"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "8/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> @ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_os_nv_cms}
                            name="add_os_nv_cms"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "10/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> cms </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="grid"
                        margin="2rem 0 0 0"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                      >
                        <Box
                          sx={{ gridColumn: "2/ span 1" }}
                          justifySelf="right"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> OU </Typography>
                        </Box>

                        <Box
                          sx={{ gridColumn: "7/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label="NV"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_ou_nv}
                            name="add_ou_nv"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "8/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h4"> @ </Typography>
                        </Box>
                        <Box
                          sx={{ gridColumn: "9/ span 1" }}
                          justifySelf="center"
                        >
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.add_ou_nv_cms}
                            name="add_ou_nv_cms"
                            sx={{ gridColumn: "span 3" }}
                          />
                        </Box>
                        <Box
                          sx={{ gridColumn: "10/ span 1" }}
                          justifySelf="center"
                          alignSelf="center"
                        >
                          <Typography variant="h5"> cms </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        margin="3rem 2rem "
                      >
                        <TextField
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          justifySelf="center"
                          value={values.vfaa_comments}
                          name="vfaa_comments"
                          sx={{ gridColumn: "span 3" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {binocularVision ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          BINOCULAR VISION TEST
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() => setBinocularVision(!binocularVision)}
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          BINOCULAR VISION TEST
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() => setBinocularVision(!binocularVision)}
                          />
                        </IconButton>
                      </FlexBetween>

                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          margin="1rem 0 2rem 2rem"
                        >
                          EOM
                        </Typography>
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          margin="1rem 0 2rem 2rem"
                        >
                          OD
                        </Typography>
                        <TextField
                          label="OD"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={2}
                          justifySelf="center"
                          value={values.eom_od}
                          name="eom_od"
                          sx={{ gridColumn: "3/ span 1" }}
                        />
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          margin="1rem 0 2rem 2rem"
                          justifySelf={"center"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label="OS"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.eom_os}
                          name="eom_os"
                          sx={{ gridColumn: "5/ span 1" }}
                        />
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          margin="1rem 0 2rem 2rem"
                          justifySelf={"center"}
                        >
                          OU
                        </Typography>
                        <TextField
                          label="OU"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          justifySelf="center"
                          value={values.eom_ou}
                          name="eom_ou"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        margin="2rem 0 2rem 2rem"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          alignSelf={"center"}
                        >
                          CT
                        </Typography>
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "span 1" }}
                        >
                          DISTANCE
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={2}
                          justifySelf="center"
                          value={values.ct_dist}
                          name="ct_dist"
                          marginTop="2rem"
                          sx={{ gridColumn: "3/ span 2" }}
                        />
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "2/span 1" }}
                        >
                          NEAR
                        </Typography>
                        <TextField
                          label=""
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={2}
                          justifySelf="center"
                          value={values.ct_near}
                          name="ct_near"
                          marginTop="2rem"
                          sx={{ gridColumn: "3/ span 2" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        margin="3rem 0 2rem 2rem"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          alignSelf={"center"}
                        >
                          NPC
                        </Typography>
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "2/span 1" }}
                        >
                          SUBJECTIVE
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="right"
                          value={values.npc_subjective}
                          name="npc_subjective"
                          marginTop="2rem"
                          sx={{ gridColumn: "3/ span 2" }}
                        />
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "5/span 1" }}
                        >
                          OBJECTIVE
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="right"
                          value={values.npc_objective}
                          name="npc_objective"
                          marginTop="2rem"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
                        margin="3rem 0 2rem 2rem"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "span 1" }}
                          alignSelf={"center"}
                        >
                          NPA
                        </Typography>
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          justifySelf={"center"}
                          sx={{ gridColumn: "2/span 1" }}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="right"
                          value={values.npa_od}
                          name="npa_od"
                          marginTop="2rem"
                          sx={{ gridColumn: "3/ span 1" }}
                        />
                        <Typography
                          fontWeight="300"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "4/span 1" }}
                        >
                          cms
                        </Typography>
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          justifySelf={"center"}
                          sx={{ gridColumn: "5/span 1" }}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="right"
                          value={values.npa_os}
                          name="npa_os"
                          marginTop="2rem"
                          sx={{ gridColumn: "6/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "7/span 1" }}
                        >
                          cms
                        </Typography>
                        <Typography
                          fontWeight="400"
                          variant="h4"
                          alignSelf={"center"}
                          justifySelf={"center"}
                          sx={{ gridColumn: "8/span 1" }}
                        >
                          OU
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          maxRows={2}
                          justifySelf="right"
                          value={values.npa_ou}
                          name="npa_ou"
                          marginTop="2rem"
                          sx={{ gridColumn: "9/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h4"
                          alignSelf={"center"}
                          sx={{ gridColumn: "10/span 1" }}
                        >
                          cms
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        margin="3rem 2rem "
                      >
                        <TextField
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          justifySelf="center"
                          value={values.eom_comments}
                          name="eom_comments"
                          sx={{ gridColumn: "span 3" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {pupil ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          PUPIL
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() => setPupil(!pupil)}
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          PUPIL
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() => setPupil(!pupil)}
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "1/span 1" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.pupil_od}
                          name="pupil_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "4/span 1" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.pupil_os}
                          name="pupil_os"
                          sx={{ gridColumn: "5/ span 2" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        margin="3rem 2rem "
                      >
                        <TextField
                          label="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          justifySelf="center"
                          value={values.pupil_comments}
                          name="pupil_comments"
                          sx={{ gridColumn: "span 3" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {anteriorSegment ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          ANTERIOR SEGMENT
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() => setAnteriorSegment(!anteriorSegment)}
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          ANTERIOR SEGMENT
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() => setAnteriorSegment(!anteriorSegment)}
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "2/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          OD
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "6/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          OS
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        margin={"1rem 0 0 1rem"}
                      >
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.lids_od}
                          name="lids_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          LIDS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.lids_os}
                          name="lids_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.conjuctiva_od}
                          name="conjuctiva_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          CONJUNCTIVA
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.conjuctiva_os}
                          name="conjuctiva_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.cornea_od}
                          name="cornea_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          CORNEA
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.cornea_os}
                          name="cornea_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.ac_od}
                          name="ac_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          AC
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.ac_os}
                          name="ac_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.iris_od}
                          name="iris_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          IRIS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.iris_os}
                          name="iris_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.lens_od}
                          name="lens_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          LENS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.lens_os}
                          name="lens_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.tear_film_od}
                          name="tear_film_od"
                          sx={{ gridColumn: "2/ span 2" }}
                        />
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "4/span 2" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          TEAR FILM
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.tear_film_os}
                          name="tear_film_os"
                          sx={{ gridColumn: "6/ span 2" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        margin="3rem 2rem "
                      >
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "1" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          COMMENTS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          justifySelf="center"
                          value={values.anterior_segment_comments}
                          name="anterior_segment_comments"
                          sx={{ gridColumn: "2/ span 6" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {intraocularPressure ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          INTRAOCULAR PRESSURE
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() =>
                              setIntraocularPressure(!intraocularPressure)
                            }
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          INTRAOCULAR PRESSURE
                        </Typography>
                        <FlexBetween gap="30px">
                          <Typography
                            fontWeight="200"
                            variant="h4"
                            alignSelf={"center"}
                            justifySelf={"center"}
                            sx={{ gridColumn: "6/ span 1" }}
                          >
                            TIME
                          </Typography>
                          <TextField
                            label=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            justifySelf="center"
                            value={values.time}
                            name="time"
                            sx={{ gridColumn: "7/ span 1" }}
                          />
                          <IconButton>
                            <ArrowUpwardOutlined
                              onClick={() =>
                                setIntraocularPressure(!intraocularPressure)
                              }
                            />
                          </IconButton>
                        </FlexBetween>
                      </FlexBetween>

                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "1/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.intraocular_pressure_od}
                          name="intraocular_pressure_od"
                          sx={{ gridColumn: "2/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "3/span 1" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          mmHg
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "5/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.intraocular_pressure_os}
                          name="intraocular_pressure_os"
                          sx={{ gridColumn: "6/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          marginBottom={"1rem"}
                          sx={{ gridColumn: "7/span 1" }}
                          marginLeft={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          mmHg
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "1/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"center"}
                        >
                          COMMENTS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.intraocular_pressure_comments}
                          name="intraocular_pressure_comments"
                          sx={{ gridColumn: "2/ span 4" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {posteriorSegment ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          POSTERIOR SEGMENT
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() =>
                              setPosteriorSegment(!posteriorSegment)
                            }
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          POSTERIOR SEGMENT
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() =>
                              setPosteriorSegment(!posteriorSegment)
                            }
                          />
                        </IconButton>
                      </FlexBetween>

                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                      >
                        <Box
                          gridColumn="2/ span 4"
                          border={`1px solid ${divider}`}
                          borderRadius="5px"
                          p="1rem"
                        >
                          <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                              setFieldValue(
                                "posterior_segment_od_image",
                                acceptedFiles[0]
                              )
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <Box
                                {...getRootProps()}
                                border={`2px dashed ${main}`}
                                p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                              >
                                <input {...getInputProps()} />
                                {!values.posterior_segment_od_image ? (
                                  <p>Add Picture Here</p>
                                ) : (
                                  <FlexBetween>
                                    <Typography>
                                      {values.posterior_segment_od_image.name}
                                    </Typography>
                                    <EditOutlinedIcon />
                                  </FlexBetween>
                                )}
                              </Box>
                            )}
                          </Dropzone>
                        </Box>
                        <Box
                          gridColumn="7/ span 4"
                          border={`1px solid ${divider}`}
                          borderRadius="5px"
                          p="1rem"
                        >
                          <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                              setFieldValue(
                                "posterior_segment_os_image",
                                acceptedFiles[0]
                              )
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <Box
                                {...getRootProps()}
                                border={`2px dashed ${main}`}
                                p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                              >
                                <input {...getInputProps()} />
                                {!values.posterior_segment_os_image ? (
                                  <p>Add Picture Here</p>
                                ) : (
                                  <FlexBetween>
                                    <Typography>
                                      {values.posterior_segment_os_image.name}
                                    </Typography>
                                    <EditOutlinedIcon />
                                  </FlexBetween>
                                )}
                              </Box>
                            )}
                          </Dropzone>
                        </Box>
                        <TextField
                          label="OD IMAGE DESCRIPTION"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.posterior_segment_od_description}
                          name="posterior_segment_od_description"
                          sx={{ gridColumn: "2/ span 4" }}
                        />
                        <TextField
                          label="OS IMAGE DESCRIPTION"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.posterior_segment_os_description}
                          name="posterior_segment_os_description"
                          sx={{ gridColumn: "7/ span 4" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {glassPrescription ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          GLASS PRESCRIPTION
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() =>
                              setGlassPrescription(!glassPrescription)
                            }
                          />
                        </IconButton>
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "1rem",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          GLASS PRESCSRIPTION
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() =>
                              setGlassPrescription(!glassPrescription)
                            }
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "2/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          SPHERE
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "3/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          CYLINDER
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "4/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          AXIS
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "5/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          ADD
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "6/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          PRISM
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "7/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          VISUAL ACUITY
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"1.5rem"}
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "1/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_sphere}
                          name="glass_prescription_od_sphere"
                          sx={{ gridColumn: "2/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_cylinder}
                          name="glass_prescription_od_cylinder"
                          sx={{ gridColumn: "3/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_axis}
                          name="glass_prescription_od_axis"
                          sx={{ gridColumn: "4/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_add}
                          name="glass_prescription_od_add"
                          sx={{ gridColumn: "5/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_prism}
                          name="glass_prescription_od_prism"
                          sx={{ gridColumn: "6/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_visual_acuity_1}
                          name="glass_prescription_od_visual_acuity_1"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"1.5rem"}
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_od_visual_acuity_2}
                          name="glass_prescription_od_visual_acuity_2"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"1.5rem"}
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="500"
                          variant="h4"
                          sx={{ gridColumn: "1/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_sphere}
                          name="glass_prescription_os_sphere"
                          sx={{ gridColumn: "2/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_cylinder}
                          name="glass_prescription_os_cylinder"
                          sx={{ gridColumn: "3/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_axis}
                          name="glass_prescription_os_axis"
                          sx={{ gridColumn: "4/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_add}
                          name="glass_prescription_os_add"
                          sx={{ gridColumn: "5/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_prism}
                          name="glass_prescription_os_prism"
                          sx={{ gridColumn: "6/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_visual_acuity_1}
                          name="glass_prescription_os_visual_acuity_1"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.glass_prescription_os_visual_acuity_2}
                          name="glass_prescription_os_visual_acuity_2"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          {"DISTANCE\tPUPILLARY\tDISTANCE"}
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "3/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.distance_pupillary_distance_od}
                          name="distance_pupillary_distance_od"
                          sx={{ gridColumn: "4/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "5/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "6/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.distance_pupillary_distance_os}
                          name="distance_pupillary_distance_os"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "8/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        {" "}
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          {"NEAR\tPUPILLARY\tDISTANCE"}
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "3/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.near_pupillary_distance_od}
                          name="near_pupillary_distance_od"
                          sx={{ gridColumn: "4/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "5/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "6/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.near_pupillary_distance_os}
                          name="near_pupillary_distance_os"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "8/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        {" "}
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          {"SEGMENT\tHEIGHT"}
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "3/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.segment_height_od}
                          name="segment_height_od"
                          sx={{ gridColumn: "4/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "5/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "6/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.segment_height_os}
                          name="segment_height_os"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "8/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          {"FITTING\tHEIGHT"}
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "3/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OD
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.fitting_height_od}
                          name="fitting_height_od"
                          sx={{ gridColumn: "4/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "5/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                        <Typography
                          fontWeight="500"
                          variant="h5"
                          sx={{ gridColumn: "6/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"center"}
                          alignSelf={"end"}
                        >
                          OS
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          value={values.fitting_height_os}
                          name="fitting_height_os"
                          sx={{ gridColumn: "7/ span 1" }}
                        />
                        <Typography
                          fontWeight="200"
                          variant="h5"
                          sx={{ gridColumn: "8/span 1" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          mm
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          {" INSTRUCTION"}
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          multiline
                          maxRows={2}
                          value={values.glass_prescription_instruction}
                          name="glass_prescription_instruction"
                          sx={{ gridColumn: "4/ span 4" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"end"}
                        >
                          {"COMMENTS"}
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          multiline
                          maxRows={2}
                          value={values.glass_prescription_comments}
                          name="glass_prescription_comments"
                          sx={{ gridColumn: "4/ span 4" }}
                        />
                      </Box>
                      <div
                        style={{
                          borderTop: `2px solid ${divider} `,
                          marginTop: "3rem",
                        }}
                      ></div>
                    </div>
                  )}
                  {management ? (
                    <div>
                      <Box
                        m="1.25rem 0.25rem 0.5rem"
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography fontWeight="500" variant="h4">
                          MANAGEMENT
                        </Typography>
                        <IconButton>
                          <ArrowDownwardOutlined
                            onClick={() => setManagement(!management)}
                          />
                        </IconButton>
                      </Box>
                    </div>
                  ) : (
                    <div>
                      <FlexBetween m="1.25rem 0.25rem 2rem">
                        <Typography fontWeight="500" variant="h4">
                          MANAGEMENT
                        </Typography>
                        <IconButton>
                          <ArrowUpwardOutlined
                            onClick={() => setManagement(!management)}
                          />
                        </IconButton>
                      </FlexBetween>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"start"}
                        >
                          {"DIAGNOSIS"}
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          multiline
                          maxRows={3}
                          value={values.diagnosis}
                          name="diagnosis"
                          sx={{ gridColumn: "3/ span 5" }}
                        />
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        marginTop={"2.5rem"}
                        gridTemplateColumns="repeat(9, minmax(0, 1fr))"
                      >
                        <Typography
                          fontWeight="300"
                          variant="h5"
                          sx={{ gridColumn: "1/span 2" }}
                          marginLeft={"1rem"}
                          marginBottom={"1rem"}
                          justifySelf={"left"}
                          alignSelf={"start"}
                        >
                          {"ADVICE/\nCOUNSELLING/\nREFERRAL"}
                        </Typography>
                        <TextField
                          label=""
                          onBlur={handleBlur}
                          onChange={handleChange}
                          justifySelf="center"
                          multiline
                          maxRows={5}
                          value={values.management_counselling_advice_referral}
                          name="management_counselling_advice_referral"
                          sx={{ gridColumn: "3/ span 5" }}
                        />
                      </Box>
                    </div>
                  )}
                  <Box display="flex" justifyContent="center" gap="40px">
                    <Button
                      type="submit"
                      onClick={() => {
                        setPageType((pageType) => (pageType = "EDIT"));
                        // resetForm();
                      }}
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: main,
                        color: palette.background.alt,
                        "&:hover": { color: main },
                        width: "20%",
                        justifyContent: "center",
                      }}
                    >
                      {"UPDATE"}
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        setPageType((pageType) => (pageType = "DELETE"));
                      }}
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: main,
                        color: palette.background.alt,
                        "&:hover": { color: main },
                        width: "20%",
                        justifyContent: "center",
                      }}
                    >
                      {"DELETE"}
                    </Button>
                  </Box>
                  <FlexBetween
                    justifyContent={"right"}
                    paddingBottom={"1rem"}
                    paddingTop={"1rem"}
                  >
                    <Box></Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={"100"}
                        color={divider}
                      >
                        edited by {record[0].edited_by} {"  "} at {"  "}
                        {timestamp}
                      </Typography>
                    </Box>
                  </FlexBetween>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ViewEdit;
