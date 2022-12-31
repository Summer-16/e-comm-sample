
import Link from "@mui/material/Link";
import Button from "../Button";
import Box from "../Box";
import Typography from "../Typography";
import { useECommController } from "../../context";
import icon from "assets/images/illustrations/icon-documentation.svg";

function SidenavFooter() {
  const [controller] = useECommController();
  const { miniSidenav, darkSidenav } = controller;

  return (
    <Box opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <Box position="relative" textAlign="center">
        <Box component="img" src={icon} alt="sidebar_illustration" width="60%" />
        <Box
          width="100%"
          pb={2}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <Typography color="inherit" variant="h6">
            Need help?
          </Typography>
          <Typography color="inherit" variant="caption">
            Please check our docs
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Button
          component={Link}
          href="https://www.creative-tim.com/learning-lab/react/overview/argon-dashboard/"
          target="_blank"
          rel="noreferrer"
          color="dark"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
        >
          Documentation
        </Button>
        <Button
          component={Link}
          href="https://www.creative-tim.com/product/argon-dashboard-material-ui"
          target="_blank"
          rel="noreferrer"
          color="info"
          size="small"
          fullWidth
          mb={2}
        >
          Upgrade to PRO
        </Button>
      </Box>
    </Box>
  );
}

export default SidenavFooter;
