
import TableCell from "@mui/material/TableCell";
import Typography from "../Typography";
import Box from "../Box";

function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <Box display="flex" alignItems="center" width="max-content">
          <Box component="img" src={image} alt={content} width="1.5rem" height="auto" />{" "}
          <Box display="flex" flexDirection="column" ml={3}>
            <Typography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </Typography>
            <Typography variant="button" fontWeight="medium" textTransform="capitalize">
              {content}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}:
          </Typography>
          <Typography variant="button" fontWeight="medium" textTransform="capitalize">
            {content}
          </Typography>
        </Box>
      </TableCell>
    );
  }

  return template;
}

// Setting default values for the props of SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

export default SalesTableCell;
