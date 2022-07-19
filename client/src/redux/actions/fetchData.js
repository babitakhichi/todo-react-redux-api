import axios from "axios";
import {  fetchDataRequest, fetchDataSuccess, fetchDataError } from "./action";

export function fetchProducts() {
    var config = {
        method: 'get',
        url: 'http://localhost:4000/details',
        headers: { },
        data : ''
      };
  return dispatch => {
    dispatch(fetchDataRequest());
    axios(config)      
      .then(response => {          
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}