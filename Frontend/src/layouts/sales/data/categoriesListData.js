
import Typography from "../../../components/Typography";
import CategoryIcon from '@mui/icons-material/Category';

const categoriesListData = [
  {
    color: "dark",
    icon: <CategoryIcon />,
    name: "Devices",
    description: (
      <>
        250 in stock,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          346+ sold
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <CategoryIcon />,
    name: "Tickets",
    description: (
      <>
        123 closed,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          15 open
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <CategoryIcon />,
    name: "Error logs",
    description: (
      <>
        1 is active,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          40 closed
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <CategoryIcon />,
    name: "Happy Users",
    description: (
      <>
        <Typography variant="caption" color="text" fontWeight="medium">
          +&nbsp;430
        </Typography>
      </>
    ),
    route: "/",
  },
];

export default categoriesListData;
