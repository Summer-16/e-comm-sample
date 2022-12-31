
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Box from "../../components/Box";
import Typography from "../../components/Typography";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/DashboardNavbar";
import DetailedStatisticsCard from "../../components/Cards/StatisticsCard";
import SalesTable from "../../components/SalesTable";
import CategoriesList from "../../components/CategoriesList";
import GradientLineChart from "../../components/GradientLineChart";
import typography from "../../assets/theme/base/typography";
import gradientLineChartData from "./data/gradientLineChartData";
import salesTableData from "./data/salesTableData";
import categoriesListData from "./data/categoriesListData";
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';

function Default() {

  const { size } = typography;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="today's money"
              count="$53,000"
              icon={{ color: "info", component: <AttachMoneyRoundedIcon /> }}
              percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="today's users"
              count="2,300"
              icon={{ color: "error", component: <PeopleRoundedIcon /> }}
              percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="new clients"
              count="+3,462"
              icon={{ color: "success", component: <AssignmentIndRoundedIcon /> }}
              percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="sales"
              count="$103,430"
              icon={{ color: "warning", component: <PointOfSaleRoundedIcon /> }}
              percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={12}>
            <GradientLineChart
              title="Sales Overview"
              description={
                <Box display="flex" alignItems="center">
                  <Box fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </Box>
                  <Typography variant="button" color="text" fontWeight="medium">
                    4% more{" "}
                    <Typography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </Typography>
                  </Typography>
                </Box>
              }
              chart={gradientLineChartData}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title="Sales by Country" rows={salesTableData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoriesList title="categories" categories={categoriesListData} />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Default;
