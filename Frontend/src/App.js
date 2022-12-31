
import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "./components/Sidenav";
import theme from "./assets/theme";
import routes from "./routes";
import { useECommController, setMiniSidenav, setOpenConfigurator } from "./context";
import brand from "./assets/images/logo.png";
import { isLoggedIn } from "./httpUtil/cookieHelper";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/Dashboard" replace />
  }
  return children
}

export default function App() {
  const [controller, dispatch] = useECommController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.admin && route.route) {
        return <Route exact path={route.route} key={route.key} element={<ProtectedRoute>{route.component}</ProtectedRoute>} />
      } else if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <Sidenav
          color={sidenavColor}
          brand={brand}
          brandName="E-commerce Sample"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}

      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
