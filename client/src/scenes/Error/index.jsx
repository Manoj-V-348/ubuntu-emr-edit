import { Palette } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);
  return (
    <>
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(5, minmax(0,1fr))"}
        marginTop={"2rem"}
      >
        <Typography
          variant="h3"
          color={palette.grey.light}
          sx={{ gridColumn: "2/span 3" }}
          justifySelf={"center"}
        >
          404 Page Not Found
        </Typography>
        <Typography
          variant="h3"
          color={palette.grey.light}
          sx={{ gridColumn: "3/span 1" }}
          justifySelf={"center"}
          marginTop={"2rem"}
        >
          Redirecting...
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
