import axios from 'axios';

const API = {
  call: function () {
    return axios.create({
      baseURL: 'http://wp-api.test/wp-json/',
    });
  },
  callWithToken: function (token) {
    if (!token) token = localStorage.getItem("ACCESS_TOKKEN")
    return axios.create({
      baseURL: 'http://wp-api.test/wp-json/',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
};

export default API;
