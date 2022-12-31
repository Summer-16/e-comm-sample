
import Grid from "@mui/material/Grid";
import Box from "../../../components/Box";
import Typography from "../../../components/Typography";
import DefaultNavbar from "../../../components/DefaultNavbar";
import PageLayout from "../../../components/LayoutContainers/PageLayout";

function Layout({ color, header, title, description, button, illustration, children }) {
  return (
    <PageLayout background="white">
      <DefaultNavbar />
      <Grid container>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <Box pt={3} px={3}>
              {!header ? (
                <>
                  <Box mb={1}>
                    <Typography variant="h4" fontWeight="bold">
                      {title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </Typography>
                </>
              ) : (
                header
              )}
            </Box>
            <Box p={3}>{children}</Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            display={{ xs: "none", lg: "flex" }}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            position="relative"
            borderRadius="lg"
            textAlign="center"
            m={2}
            px={13}
            sx={{ overflow: "hidden" }}
          >
            <Box
              component="img"
              src={illustration.image}
              alt="background"
              width="100%"
              position="absolute"
              top={0}
              left={0}
            />
            <Box
              bgColor={color}
              variant="gradient"
              width="100%"
              height="100%"
              position="absolute"
              topl={0}
              left={0}
              opacity={0.7}
            />
            <Box position="relative">
              {illustration.title && (
                <Box mt={6} mb={1}>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    {illustration.title}
                  </Typography>
                </Box>
              )}
              {illustration.description && (
                <Box mb={1}>
                  <Typography variant="body2" color="white">
                    {illustration.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of Layout
Layout.defaultProps = {
  color: "info",
  header: "",
  title: "",
  description: "",
  button: { color: "info" },
  illustration: {},
};

export default Layout;
