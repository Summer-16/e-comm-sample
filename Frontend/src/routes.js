
import Dashboard from "./layouts/dashboard";
import Sales from "./layouts/sales";
import Product from "./layouts/product";
import SignIn from "./layouts/sign-in";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CategoryIcon from '@mui/icons-material/Category';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "Dashboard",
    route: "/Dashboard",
    icon: (<DashboardIcon />),
    component: <Dashboard />,
  },
  { type: "title", title: "Admin", key: "admin-section" },
  {
    type: "route",
    name: "Sales",
    key: "Sales",
    route: "/Sales",
    icon: (<PointOfSaleIcon />),
    component: <Sales />,
    admin: true
  },
  {
    type: "route",
    name: "Products",
    key: "Product",
    route: "/Product",
    icon: (<CategoryIcon />),
    component: <Product />,
    admin: true
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: (<VpnKeyIcon />),
    component: <SignIn />,
    signIn: true
  }
];

export default routes;
