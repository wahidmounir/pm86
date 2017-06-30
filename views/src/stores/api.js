
import Vue from 'vue'
import config from '../../config/config.js'
const version = 'v1';

const axios = require('axios').create({
  baseURL: `${config.base_url}/${version}`,
  timeout: 10000,
  withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  transformResponse: [function (data) {
    console.log(data);
    let json;
    try {
      json = JSON.parse(data)
    } catch (e){
      return {};
    }
    return json;
  }],
});

export default axios

// export const get = function (url) {
//   return axios.get(url)
// }

// // 新建数据
// export const post = function (info) {
//   return axios.post(`/${info.url}`, info.data);
// }

// export const put = function (info) {
//   return axios.put(`/${info.url}`, info.data);
// }

// // 获取数据
// export const fetchBuckets = () => {
//   return axios({method: 'get', url: '/buckets'})
// }

// export const addBucket = (data) => {
//   return axios({method: 'put', url: '/bucket/create', data: data})
// }

// export const login = (data) => {
//   return axios({method: 'post', url: '/account/login', data: data})
// }

// export const register = (data) => {
//   return axios({method: 'post', url: '/account/register', data: data})
// }

// export const logout = (data) => {
//   return axios({method: 'post', url: '/account/logout', data: data})
// }


