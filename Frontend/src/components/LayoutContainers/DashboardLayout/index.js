import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "../../Box";
import { useECommController, setLayout } from "../../../context";

function DashboardLayout({ bgColor, children, ...rest }) {
  const [controller, dispatch] = useECommController();
  const { miniSidenav, darkMode } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const background = darkMode && !bgColor ? "transparent" : bgColor;

  return (
    <Box
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <Box
        bgColor={background || "info"}
        height="300px"
        width="100vw"
        position="absolute"
        top={0}
        left={0}
        sx={darkMode && { bgColor: ({ palette: { background } }) => background.default }}
        {...rest}
      />
      {children}
    </Box>
  );
}

export default DashboardLayout;
