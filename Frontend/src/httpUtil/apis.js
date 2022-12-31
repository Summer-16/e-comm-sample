
let baseUrl = (window.location.hostname === "localhost") ? 'http://localhost:2000' : window.location.origin;
let url = baseUrl + '/api'

const apis = {
  baseUrl: baseUrl,
  url: url,
  login: url + "/login",
  getProduct: url + "/getProduct",
  addProduct: url + "/addProduct",
  updateProduct: url + "/updateProduct",
  deleteProduct: url + "/deleteProduct",
}

export default apis;