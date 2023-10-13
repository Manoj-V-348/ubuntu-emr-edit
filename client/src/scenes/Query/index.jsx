
import { ArrowRightAlt, Category } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { render } from "@testing-library/react";
import FlexBetween from "components/FlexBetween";
import TableBox from "components/TableBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setId, setName, setRecord } from "state";

const Query = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const records = useSelector((state) => state.records, []);
  const stateId = useSelector((state) => state.id, []);
  const token = useSelector((state) => state.token)

  const getRecord = async () => {
    const response = await fetch(
      `http://${process.env.HOSTNAME}${process.env.PORT}/records/${stateId}`,
      {
        method: "GET",
        headers: {Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(
      setRecord({
        record: data,
      })
    );
  };

  return (
    <TableBox margin={"2rem 2rem 0rem 2rem"} p={"0.5rem 0 2rem 0"}>
      <Box
        justifySelf={"center"}
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(10, minmax(0, 1fr))"
      >
        <Box
          sx={{ gridColumn: "1/ span 2" }}
          marginTop={"1.5rem"}
          marginLeft={"1rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography>NAME</Typography>
        </Box>
        <Box
          sx={{ gridColumn: "3/ span 2" }}
          marginTop={"1.5rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography>DATE OF ASSESSMENT</Typography>
        </Box>
        <Box
          sx={{ gridColumn: "5/ span 2" }}
          marginTop={"1.5rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography>HEALTH RECORD NO</Typography>
        </Box>
        <Box
          sx={{ gridColumn: "7/ span 1" }}
          marginTop={"1.5rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography>PHONE</Typography>
        </Box>
        <Box
          sx={{ gridColumn: "8/ span 2" }}
          marginTop={"1.5rem"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography>EMAIL</Typography>
        </Box>
      </Box>
      <div
        // width="93%"
        style={{
          borderTop: `2px solid ${palette.secondary.medium} `,
          margin: "2rem 1rem 0rem 1rem",
        }}
      ></div>
      {records.length !== 0 ? (
        records.map(
          ({
            id,
            name,
            date_of_assessment,
            health_record_no,
            mobile_no,
            email,
          }) => {
            return (
              <Box
                justifySelf={"center"}
                display="grid"
                margin={"0.5rem 0 -0.25rem 0"}
                gap="30px"
                gridTemplateColumns="repeat(10, minmax(0, 1fr))"
              >
                <Box
                  sx={{ gridColumn: "1/ span 2" }}
                  marginTop={"1rem"}
                  marginLeft={"40%"}
                  display={"flex"}
                  justifyContent={"left"}
                  alignSelf={"center"}
                >
                  <Typography>{name}</Typography>
                </Box>
                <Box
                  sx={{ gridColumn: "3/ span 2" }}
                  marginTop={"1rem"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignSelf={"center"}
                >
                  <Typography>{date_of_assessment}</Typography>
                </Box>
                <Box
                  sx={{ gridColumn: "5/ span 2" }}
                  marginTop={"1rem"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignSelf={"center"}
                >
                  <Typography>{health_record_no}</Typography>
                </Box>
                <Box
                  sx={{ gridColumn: "7/ span 1" }}
                  marginTop={"1rem"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignSelf={"center"}
                >
                  <Typography>{mobile_no}</Typography>
                </Box>
                <Box
                  sx={{ gridColumn: "8/ span 2" }}
                  marginTop={"1rem"}
                  marginLeft={"3.5rem"}
                  display={"flex"}
                  justifyContent={"left"}
                  alignSelf={"center"}
                >
                  <Typography>{email}</Typography>
                </Box>
                <Box
                  sx={{ gridColumn: "10/ span 1" }}
                  marginTop={"1rem"}
                  // marginLeft={"1.5rem"}
                  display={"flex"}
                  justifyContent={"left"}
                >
                  <IconButton
                    onClick={() => {
                      const getRecord = async () => {
                        const response = await fetch(
                          `http://${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PORT}/records/${id}`,
                          {
                            method: "GET",
                            headers: {Authorization: `Bearer ${token}`}
                          }
                        );
                        const data = await response.json();
                        dispatch(
                          setRecord({
                            record: data,
                          })
                        );
                      };
                      getRecord();
                      dispatch(
                        setId({
                          id: id,
                        })
                      );
                      console.log(stateId);
                      setTimeout(() => {
                        navigate(`/records/${id}`);
                      }, 1000);
                    }}
                  >
                    <ArrowRightAlt />
                  </IconButton>
                </Box>
                <div
                  // width="93%"
                  style={{
                    borderTop: `2px solid ${palette.secondary.light} `,
                    margin: "0rem 1.5rem 0rem 1.5rem",
                    gridColumn: "1/ span 10",
                  }}
                ></div>
              </Box>
            );
          }
        )
      ) : (
        <Box
          justifySelf={"center"}
          display="grid"
          margin={"0.5rem 0 -0.25rem 0"}
          gap="30px"
          gridTemplateColumns="repeat(9, minmax(0, 1fr))"
        >
          <Box
            sx={{ gridColumn: "1/ span 2" }}
            marginTop={"1rem"}
            marginLeft={"40%"}
            display={"flex"}
            justifyContent={"left"}
            alignContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <Typography>N/A</Typography>
          </Box>
          <Box
            sx={{ gridColumn: "3/ span 2" }}
            marginTop={"1rem"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography>N/A</Typography>
          </Box>
          <Box
            sx={{ gridColumn: "5/ span 2" }}
            marginTop={"1rem"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography>N/A</Typography>
          </Box>
          <Box
            sx={{ gridColumn: "7/ span 1" }}
            marginTop={"1rem"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography>N/A</Typography>
          </Box>
          <Box
            sx={{ gridColumn: "8/ span 1" }}
            marginTop={"1rem"}
            marginLeft={"1.5rem"}
            display={"flex"}
            justifyContent={"left"}
          >
            <Typography>N/A</Typography>
          </Box>
        </Box>
      )}
    </TableBox>
  );
};

export default Query;
