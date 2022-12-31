
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "../Box";
import Typography from "../Typography";

function DefaultInfoCard({ color, icon, iconSize, title, description, value }) {
  return (
    <Card>
      <Box p={2} mx={3} display="flex" justifyContent="center">
        <Box
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width={iconSize ? `${iconSize + 1}rem` : "4rem"}
          height={iconSize ? `${iconSize + 1}rem` : "4rem"}
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Box component="img" src={icon} alt="EComm Logo" height={iconSize ? `${iconSize}rem` : "1rem"} mr={0.25} />
        </Box>
      </Box>
      <Box pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>
        {description && (
          <Typography variant="caption" color="text" fontWeight="regular">
            {description}
          </Typography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <Typography variant="h5" fontWeight="medium">
            {value}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

export default DefaultInfoCard;
