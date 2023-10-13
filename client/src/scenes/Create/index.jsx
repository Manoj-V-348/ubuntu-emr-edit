import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import Form from "scenes/Form/Form";

const Create = () => {
  const { palette } = useTheme();
  return (
    <Box>
      <Box
        width="80%"
        p="2rem 2rem 0 2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <Typography fontWeight="500" variant="h3" sx={{ mb: "1.5rem" }}>
          EMR FORM FILLUP
        </Typography>
        <Form />
      </Box>
      <Box margin={"2rem"} p={"2rem"}></Box>
    </Box>
  );
};

export default Create;
