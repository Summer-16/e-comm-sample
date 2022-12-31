

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Container from "@mui/material/Container";
import Box from "../Box";
import Typography from "../Typography";
import DefaultNavbarLink from "./DefaultNavbarLink";
import DefaultNavbarMobile from "./DefaultNavbarMobile";
import breakpoints from "../../assets/theme/base/breakpoints";
import { useECommController } from "../../context";

function DefaultNavbar({ brand, transparent, light, action }) {
  const [controller] = useECommController();
  const { darkMode } = controller;
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container>
      <Box
        pt={0.75}
        pb={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={2}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position="absolute"
        left={0}
        zIndex={99}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.dark : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
          <Box component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
            <Typography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
              {brand}
            </Typography>
          </Box>
          <Box color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
            <DefaultNavbarLink
              icon="donut_large"
              name="dashboard"
              route="/Dashboard"
              light={light}
            />
          </Box>
          <Box
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </Box>
        </Box>
      </Box>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Declaring default props for DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: "E-commerce Sample",
  transparent: false,
  light: false,
  action: false,
};

export default DefaultNavbar;
