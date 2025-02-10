import axios from "axios";
import { LOCAL_STORAGE } from "./consts";

const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const SESSION = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
    return {
      ...config,
      headers: {
        ...(SESSION.token !== null && {
          Authorization: `Bearer ${SESSION.token}`,
        }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //(`unauthorized :)`);
      //localStorage.removeItem("persist:root");
      //removeLocalStorageToken
      //window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
