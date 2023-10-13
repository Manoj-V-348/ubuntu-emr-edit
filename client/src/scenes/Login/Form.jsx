import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { ToastContainer, toast } from "react-toastify";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  confirm_email: yup.string().email("invalid email").required().oneOf([yup.ref("email"), null], "Emails must match"),
  password: yup.string().required().matches(
    "^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  phone: yup.string(),
  role: yup.string().required("required"),
  confirm_password: yup.string().required().oneOf([yup.ref("password"), null], "Passwords must match"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  username: yup.string().email("invalid email").required(),
  password: yup.string().required(),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  phone: "",
  role: "",
  picture: "",
  confirm_password: "",
  confirm_email: ""
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token)
  const mode = useSelector((state) => state.mode)
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

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


  const register = async (values, onSubmitProps) => {
    console.log(`http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/auth/register`);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.delete("confirm_password");
    formData.delete("confirm_email");

    for(let value of formData.entries()) {
      console.log(value[0] + ',' + value[1])
    }
    const savedUserResponse = await fetch(
      `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    onSubmitProps.resetForm();
    if ((savedUserResponse.status < 400)) {
      setPageType("login")
      success("SUCCESSFULLY REGISTERED");
    } else {
      error("CANNOT REGISTER USER. TRY AGAIN");
    }
  };

  const login = async (values, onSubmitProps) => {

    const loggedInResponse = await fetch(`http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      body: `grant_type=password&username=${values.username}&password=${values.password}`,

    });
    
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedInResponse.status < 400) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      success("LOGGED IN");
      onSubmitProps.resetForm();
      navigate("/home"); 
    } else {
      error("INVALID CREDENTIALS");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
    <ToastContainer
        position="top-left"
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
    <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color={palette.secondary.dark}>
          {isLogin ? "SIGN IN" : "SIGN UP"}
   </Typography>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
          <Box
            display="grid"
            gap="30px"
            marginBottom={"2rem"}
            marginTop={"4rem"}
            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
            >
            {isRegister && (
              <>
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={
                    Boolean(touched.username) && Boolean(errors.username)
                  }
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "2/ span 4" }}
                  />

                <TextField
                    label="Role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    name="role"
                    error={
                      Boolean(touched.role) && Boolean(errors.role)
                    }
                    helperText={touched.role && errors.role}
                    sx={{ gridColumn: "2/ span 4" }}
                    />
                <TextField
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={Boolean(touched.phone) && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "2/ span 4" }}
                  />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "2/ span 4" }}
                  />
                <TextField
                  label="Confirm Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_email}
                  name="confirm_email"
                  error={Boolean(touched.confirm_email) && Boolean(errors.confirm_email)}
                  helperText={touched.confirm_email && errors.confirm_email}
                  sx={{ gridColumn: "2/ span 4" }}
                  />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "2/ span 4" }}
                  />
                <TextField
                  label="Confirm Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_password}
                  name="confirm_password"
                  error={Boolean(touched.confirm_password) && Boolean(errors.confirm_password)}
                  helperText={touched.confirm_password && errors.confirm_password}
                  sx={{ gridColumn: "2/ span 4" }}
                  />
                {/* <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.secondary.medium}`}
                  borderRadius="5px"
                  p="1rem"
                  >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                    >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box> */}
              </>
            )}

            {isLogin && (
              <>
              <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "2/ span 4" }}
              />
            <TextField
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{ gridColumn: "2/ span 4" }}
            />
            </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box display={"grid"}  justifyContent={"center"}>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
              >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
      </>
  );
};

export default Form;
