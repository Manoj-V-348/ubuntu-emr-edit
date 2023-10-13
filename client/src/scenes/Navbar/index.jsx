import FlexBetween from "components/FlexBetween";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  IconButton,
  InputBase,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Search, DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import  {
  setMode,
  setCategory,
  setQuery,
  setLogout,
  setRecords,
  setId,
} from "state";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";

const categories = [
  {
    value: "name",
    label: "NAME",
  },
  {
    value: "health_record_no",
    label: "RECORD NO",
  },
  {
    value: "email",
    label: "EMAIL",
  },
  {
    value: "mobile_no",
    label: "PHONE",
  },
  {
    value: "address",
    label: "ADDRESS",
  },
];

const intialstate = {
  query: "",
  category: "name",
};

const intialschema = yup.object().shape({
  query: yup.string().required("required"),
  category: yup.string(),
});

const Navbar = () => {
  const { palette } = useTheme();
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state)=> state.token)
  const dark = palette.primary.main;
  const host = process.env.REACT_APP_HOSTNAME;
  const port = process.env.REACT_APP_PORT;

  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://${host}${port}/query/${values.category}/${values.query}`,
      {
        method: "GET",
        headers: {Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 422) {
      return;
    } else if (response.status === 404) {
      dispatch(
        setRecords({
          records: [],
        })
      );
      navigate("/query");
    } else {
      const data = await response.json();
      if (data) {
        dispatch(
          setRecords({
            records: data,
          })
        );
      }

      dispatch(
        setQuery({
          query: values.query,
        })
      );
      dispatch(
        setCategory({
          category: values.category,
        })
      );
      onSubmitProps.resetForm();
      navigate("/query");
    }
  };

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

  const error = (message) => {
    toast.error(message, {
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

      <FlexBetween mb="0.25" p="1.5rem 2rem">
        <FlexBetween gap="0.75rem" p="0rem">
          <Box
            mt={"0.3rem"}
            color={palette.mode === "dark" ? palette.grey[300] : "#36454F"}
            onClick={() => {
              dispatch(
                setId({
                  id: null,
                })
              );
              navigate("/home");
            }}
            alignSelf={"center"}
            borderRadius={"5px"}
            p="0.3rem 0.5rem"
            sx={{
              "&:hover": {
                borderRadius: "100%",
                background: palette.background.alt,
                cursor: "pointer",
              },
            }}
          >
            <HomeIcon
              sx={{
                fontSize: "30px",
              }}
            />
          </Box>
          <Typography variant="h4" fontSize="28px"></Typography>
        </FlexBetween>
        <FlexBetween
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
          ml={"2rem"}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={intialstate}
            validationSchema={intialschema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <FlexBetween gap="30px">
                  <Box
                    backgroundColor={palette.primary.light}
                    display={"flex"}
                    // justifyContent={"space-between"}
                    borderRadius={"9px"}
                    padding="0.1rem 1.5rem"
                  >
                    <InputBase
                      placeholder="Search..."
                      label=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="query"
                      value={values.query}
                    />
                    <IconButton type="submit" >
                      <Search />
                    </IconButton>
                  </Box>
                  <Box>
                    <TextField
                      select
                      label="category"
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                      size="small"
                      sx={{ width: "160px" }}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </FlexBetween>
              </form>
            )}
          </Formik>
        </FlexBetween>
        <FlexBetween
          gap="60px"
          // mr={"1rem"}
          color={palette.mode === "dark" ? palette.grey[300] : "primary"}
        >
          <Box
            mt={"0.3rem"}
            color={palette.mode === "dark" ? palette.grey[300] : "#36454F"}
            onClick={() => dispatch(setMode())}
            alignSelf={"center"}
            borderRadius={"5px"}
            p="0.3rem 0.5rem 0.3rem 0.5rem"
            sx={{
              "&:hover": {
                borderRadius: "100%",
                background: palette.background.alt,
                cursor: "pointer",
              },
            }}
          >
            {palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode
                sx={{
                  color: { dark },
                  fontSize: "25px",
                }}
              />
            )}
          </Box>
          <Box
            mt={"0.3rem"}
            color={palette.mode === "dark" ? palette.grey[300] : "#36454F"}
            onClick={() => dispatch(setLogout())}
            alignSelf={"center"}
            borderRadius={"5px"}
            p="0.4rem 0.5rem 0.3rem 0.5rem"
            sx={{
              "&:hover": {
                borderRadius: "100%",
                background: palette.background.alt,
                cursor: "pointer",
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: "30px" }} />
          </Box>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Navbar;
