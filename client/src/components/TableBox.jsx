import { Box } from "@mui/material";
import { styled } from "@mui/system";

const TableBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  borderRadius: "6px",
}));

export default TableBox;
