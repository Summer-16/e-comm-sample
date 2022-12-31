
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Box from "../Box";
import Typography from "../Typography";

function DefaultNavbarLink({ icon, name, route, light }) {
  return (
    <Box
      component={Link}
      to={route}
      mx={1}
      p={1}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", userSelect: "none" }}
    >
      <Icon
        sx={{
          color: ({ palette: { white, secondary } }) => (light ? white.main : secondary.main),
          verticalAlign: "middle",
        }}
      >
        {icon}
      </Icon>
      <Typography
        variant="button"
        fontWeight="regular"
        color={light ? "white" : "dark"}
        textTransform="capitalize"
        sx={{ width: "100%", lineHeight: 0 }}
      >
        &nbsp;{name}
      </Typography>
    </Box>
  );
}

export default DefaultNavbarLink;
