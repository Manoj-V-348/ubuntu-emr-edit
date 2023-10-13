import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

const SearchBar = () => {
  const { palette } = useTheme();
  return (
    // <button color={palette.primary.main}>
    // {" "}
    <Link to="/">
      {/* <SearchIcon sx={{ fontSize: "24px", color: palette.grey[300] }} /> */}
    </Link>
    // </button>
  );
};

export default SearchBar;
