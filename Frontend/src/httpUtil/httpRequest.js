import axios from 'axios';
import { getCookie, clearCookie } from "./cookieHelper"

const request = (method, url, params) => {
  return new Promise(async (resolve, reject) => {
    try {

      const cookie = getCookie()
      if (cookie && cookie.token) {
        axios.defaults.headers.common.authorization = `Bearer ${cookie.token}`;
      }

      let reqParams = {
        method: method.toLowerCase(),
        url: url
      };

      if (params) {
        reqParams.data = params;
      }

      let response = await axios(reqParams)
      if (response.data.success) {
        resolve(response.data);
      }
      else {
        reject(response.data.message)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        clearCookie();
        reject("Session expired login again");
      } else {
        reject(error)
      }
    }
  })
}

export default request;