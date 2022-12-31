
import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Box from "../../components/Box";
import DefaultInfoCard from "../../components/Cards/InfoCard";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/DashboardNavbar";
import { apis, request } from "../../httpUtil";
import icon from "../../assets/images/ecommerce.png";

function Billing() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);


  function fetchProducts() {
    request('POST', apis.getProduct, { filter: { isActive: 1 } })
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
        }
      })
      .catch((err) => {
        console.error("error in fetchProducts=>", err)
      })
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Grid container spacing={3}>
            {products.map((item) => {
              return <Grid item xs={12} md={6} xl={3}>
                <DefaultInfoCard
                  icon={icon}
                  iconSize={10}
                  title={item.name}
                  description={item.description}
                  value={item.price + " " + item.currency}
                />
              </Grid>
            })}
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Billing;
