import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { DarkMode, LightMode } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode)
  const dark = palette.primary.main
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <FlexBetween
        width="100%"
        backgroundColor={palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          EMR
        </Typography>
        <Box
            mt={"0.3rem"}
            color={mode === "dark" ? palette.grey[300] : "#36454F"}
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
      </FlexBetween>

      <Box
        width={isNonMobileScreens ? "40%" : "93%"}
        p="2rem 0"
        m="7rem auto"
        borderRadius="1.5rem"
        textAlign={"center"}
        backgroundColor={palette.background.alt}
        boxShadow={"12"}
        border={`1px solid ${palette.secondary.light}`}
      >
        <Form />
      </Box>
      <Box p={"0.5rem"} margin={"2rem auto"}></Box>
    </Box>
  );
};

export default LoginPage;
