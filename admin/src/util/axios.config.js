import axios from 'axios'

// 请求前
axios.interceptors.request.use(function (config) {

    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearea ${token}`

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 请求成功后首先执行
axios.interceptors.response.use(function (response) {

    //console.log('---response headers---',response.headers)
    const {authorization} = response.headers
    authorization && localStorage.setItem('token',authorization)

    return response;
  }, function (error) {
    const {status} = error.response
    if(status===401){
      localStorage.removeItem('token')
      location.href = '#/login'
    }
    return Promise.reject(error);
  });