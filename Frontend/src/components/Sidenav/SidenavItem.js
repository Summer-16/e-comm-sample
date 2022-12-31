
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Box from "../Box";
import { item, itemIcon, itemText, itemIconBox } from "./styles/sidenavItem";
import { useECommController } from "../../context";

function SidenavItem({ icon, name, active, open, ...rest }) {
  const [controller] = useECommController();
  const { miniSidenav, darkSidenav, sidenavColor } = controller;

  return (
    <>
      <ListItem component="li">
        <Box
          {...rest}
          sx={(theme) => item(theme, { active, darkSidenav, sidenavColor, miniSidenav })}
        >
          <ListItemIcon sx={(theme) => itemIconBox(theme, { active, darkSidenav, sidenavColor })}>
            {typeof icon === "string" ? (
              <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => itemText(theme, { miniSidenav, darkSidenav, active })}
          />
        </Box>
      </ListItem>
    </>
  );
}

// Setting default values for the props of SidenavItem
SidenavItem.defaultProps = {
  color: "info",
  active: false,
  open: false,
};


export default SidenavItem;
