
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import HomePage from "scenes/homePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, Divider, ThemeProvider, useTheme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "scenes/Navbar";
import HomePage from "scenes/homePage";
import Create from "scenes/Create";
import Query from "scenes/Query";
import ViewEdit from "scenes/ViewEdit";
import Error from "scenes/Error";
import Login from "scenes/Login";
// import { useTheme } from "@emotion/react";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const dark = mode === "dark" ? "#FFFFFF" : "#666666";
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuth ? 
            (<>
            <Navbar /> 
          <div
          color
          style={{
            borderTop: `2px solid ${dark} `,
            marginLeft: 20,
            marginRight: 20,
          }}
          ></div>
          </>
          ) : null
          }
          <Routes>
            <Route path="/" element={!(isAuth) ? <Login /> : <Navigate to="/home"/>} />
            <Route path="/home" element={(isAuth) ? <HomePage /> : <Navigate to="/"/>} />
            <Route path="/query" element={(isAuth)? <Query /> : <Navigate to="/"/>} />
            <Route path="/records/post" element={(isAuth)? <Create /> : <Navigate to="/"/>} />
            <Route path="/records/:id" element={(isAuth)? <ViewEdit /> : <Navigate to="/"/>} />
            <Route path="*" element= {<Error />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
