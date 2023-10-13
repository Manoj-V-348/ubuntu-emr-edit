import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "scenes/Form/Form";
import { setCategory, setQuery, setRecords } from "state";

const HomePage = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user);

  const recentRecords = async() => {
    
      const response = await fetch(
        `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/records`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`}
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
      navigate("/query");
    };
  }
  
  return (
    <Box>
      <Box
        backgroundColor={palette.background.alt}
        width="50%"
        m="4rem auto"
        borderRadius={"5px"}
        alignSelf={"center"}
      >
        <Box
          width="100%"
          height={"50%"}
          p="5rem 1rem 3rem 2rem"
          m="4rem 2rem 3rem 2rem"
          borderRadius="1.5rem"
          backgroundColor={palette.secondary.primary}
          display={"grid"}
          gap="30px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
        >
          <Box  sx={{ gridColumn: "1/ span 6" }}>

          <Typography
            variant="h2"
            fontWeight={"300"}
            color={palette.secondary.mediumMain}
            >
           {` WELCOME BACK,   ${user.toUpperCase()}`}
          </Typography>
        </Box>
        </Box>
        <Box
          width="80%"
          height={"50%"}
          p="1rem 2rem 4rem 2rem"
          m="1rem auto"
          borderRadius="1.5rem"
          backgroundColor={palette.background.alt}
          display={"grid"}
          gap="30px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
        >
          <Button
            variant="contained"
            href="/records/post"
            sx={{ gridColumn: "2/ span 4" }}
          >
            CREATE RECORD
          </Button>
          
          <Button
            variant="contained"
            onClick={()=> recentRecords()}
            sx={{ gridColumn: "2/ span 4" }}
          >
            RECENT RECORDS
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
