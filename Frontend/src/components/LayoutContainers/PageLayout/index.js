
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "../../Box";
import { useECommController, setLayout } from "../../../context";

function PageLayout({ background, children }) {
  const [controller, dispatch] = useECommController();
  const { darkMode } = controller;

  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={darkMode ? "transparent" : background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </Box>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

export default PageLayout;
