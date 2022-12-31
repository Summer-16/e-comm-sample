import { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from "../../components/Box";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from "../../components/Typography";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/DashboardNavbar";
import { apis, request } from "../../httpUtil";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Modal from "../../components/modal"
import Input from "../../components/Input";
import Switch from "@mui/material/Switch";

const defaultProductObj = { name: "", description: "", price: "", currency: "", isActive: 1 };

const columns = (clickUpdate) => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      width: 300
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 150
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 150
    },
    {
      field: 'isActive',
      headerName: 'Active',
      type: 'number',
      width: 100,
      valueGetter: (value) => value.row,
      valueFormatter: (params) => {
        return params.value.isActive ? "Yes" : "No";
      }
    },
    {
      field: 'action',
      headerName: 'Actions',
      type: 'action',
      width: 150,
      filterable: false, sortable: false,
      valueGetter: (value) => value.row,
      renderCell: (params) => {
        return (<>
          <IconButton color="primary" onClick={() => clickUpdate("update", params.value)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => clickUpdate("delete", params.value)}>
            <DeleteIcon />
          </IconButton>
        </>)
      }
    },
  ]
};

function Tables() {

  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({ modal: false, action: "" });
  const [productData, setProductData] = useState({});
  const [formError, setFormError] = useState({});
  const [refresh, setRefresh] = useState(0);


  useEffect(() => {
    fetchProducts();
  }, [refresh]);


  const fetchProducts = () => {
    request('POST', apis.getProduct, {})
      .then((result) => {
        if (result.success) {
          setProductList(result.data);
        }
      })
      .catch((err) => {
        console.error("error in fetchProducts=>", err)
      })
  }

  const clickAdd = () => {
    setProduct({ modal: true, action: "add" });
  }

  const clickUpdate = (action, data) => {
    console.log(action, data)
    setProduct({ modal: true, action: action, id: data.id });
    setProductData(data);
  }

  function handleClose() {
    setProduct({ modal: false, action: "" });
    setProductData(defaultProductObj)
  }

  const handleChange = (event) => {
    if (event) event.persist();
    console.log("event=>", event.target.name, event.target.value, event.target.type, event.target.checked)
    if (event.target.name === 'isActive') {
      setProductData((productData) => ({ ...productData, [event.target.name]: event.target.checked ? 1 : 0 }));
      setFormError((formError) => ({ ...formError, [event.target.name]: "" }));
    } else {
      setProductData((productData) => ({ ...productData, [event.target.name]: event.target.value }));
      setFormError((formError) => ({ ...formError, [event.target.name]: "" }));
    }
  };

  const validate = (value) => {
    const error = {};

    if (!value.name) {
      error.name = "Name Missing";
    }
    if (!value.description) {
      error.description = "Description Missing";
    }
    if (!value.price) {
      error.price = "Price Missing";
    }
    if (!value.currency) {
      error.currency = "Currency Missing";
    }
    return error;
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const validateResult = validate(productData);
    if (Object.keys(validateResult).length) {
      setFormError(validateResult);
      return;
    }

    let method = "POST", route = apis.addProduct, form = productData;
    if (product.action === 'update') {
      route = apis.updateProduct;
      form = { id: product.id, updateObj: productData };
    } else if (product.action === 'delete') {
      method = "DELETE";
      route = apis.deleteProduct;
      form = { id: product.id };
    }

    console.log({ method, route, form })

    request(method, route, form)
      .then((result) => {
        if (result.success) {
          handleClose();
          setRefresh(refresh + 1);
        }
      })
      .catch((err) => {
        console.error("error=>", err)
      })

  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Card >
            <CardHeader title={<Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h6">Products table</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button color='primary' variant="contained" onClick={clickAdd}>Add Product</Button>
              </Grid>
            </Grid>} />
            <CardContent>
              <DataGrid
                rows={productList}
                columns={columns(clickUpdate)}
                disableSelectionOnClick
                autoHeight
              />
            </CardContent>
          </Card>
        </Box>
      </Box>

      {product.modal && (product.action === 'add' || product.action === 'update') &&
        <Modal
          tittle={"Add New Product"}
          open={product.modal}
          onClose={handleClose}
          onSubmit={handleSubmit}>
          <Box component="form" role="form">
            <Box mb={2}>
              <Input type="text" name="name" placeholder="Name" size="large" value={productData.name} onChange={handleChange} />
              {formError.name && <Typography variant="caption" color="error" fontWeight="small">{formError.name}</Typography>}
            </Box>
            <Box mb={2}>
              <Input type="text" name="description" multiline rows={5} placeholder="Description" size="large" value={productData.description} onChange={handleChange} />
              {formError.description && <Typography variant="caption" color="error" fontWeight="small">{formError.description}</Typography>}
            </Box>
            <Box mb={2}>
              <Input type="number" name="price" placeholder="Price" size="large" value={productData.price} onChange={handleChange} />
              {formError.price && <Typography variant="caption" color="error" fontWeight="small">{formError.price}</Typography>}
            </Box>
            <Box mb={2}>
              <Input type="text" name="currency" placeholder="Currency" size="large" value={productData.currency} onChange={handleChange} />
              {formError.currency && <Typography variant="caption" color="error" fontWeight="small">{formError.currency}</Typography>}
            </Box>
            <Box display="flex" alignItems="center">
              <Switch name="isActive" checked={productData.isActive ? true : false} onChange={handleChange} color={productData.isActive ? "success" : 'error'} />
              <Typography variant="button" fontWeight="regular" sx={{ cursor: "pointer", userSelect: "none" }} >&nbsp;&nbsp;Is Active</Typography>
            </Box>
          </Box>
        </Modal>}


      {product.modal && (product.action === 'delete') &&
        <Modal
          tittle={"Delete Product"}
          open={product.modal}
          onClose={handleClose}
          onSubmit={handleSubmit}>
          <Typography variant="h5">Confirm delete, this action is irreversible!</Typography>
        </Modal>}

    </DashboardLayout>
  );
}

export default Tables;
