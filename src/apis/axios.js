import axios, { create } from "axios";
import Qs from 'qs'
import { isInApp, getParamFromUrl, isIOS, isInWeChat, appId } from '@/utils'
import { goAuthPage } from '@/utils/goPage'


let baseUrl = 'https://api.zmjx.com/';
const domain = window.document.domain;
const env = getParamFromUrl('env');
if (domain.match('devh5') || domain.match('localhost')) {
  baseUrl = 'https://devapi.zmjx.com/';
} else if (domain.match('daily') || env === 'daily' || domain.match('192')) {
  baseUrl = 'https://dailyapi.zmjx.com/';
} else if (domain.match('gray') || env === 'gray') {
  baseUrl = 'https://grayapi.zmjx.com/';
} else if (domain.match('kuaizhan')) {
  baseUrl = 'https://dailyapi.zmjx.com/';
}
// baseUrl = 'https://devapi.zmjx.com/';


let token = window.localStorage.getItem('token');
//let token = 'ab7321472bf2bb0a3b6f7ed06df22cbe';
if (isInApp) {
  token = dsBridge.call("getStorage", { key: "token" }, function (v) { }) || window.localStorage.getItem('token');
}

axios.default.retry = 3 // 重试次数
axios.default.retryDelay = 5000 // 重试延时，5秒重试一次
axios.default.shouldRetry = (error) => true // 重试条件，默认只要是错误都需要重试

axios.default.withCredentials = true // 表示跨域请求时是否需要使用凭证(cookie/session)


function setHeaders(axios) {
  axios.defaults.headers.post['Content-Type'] = 'application/json;utf-8';
}

function requestIntercptor(axios) {
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['token'] = token;
    config.headers['zmjx_client'] = isIOS ? 1 : 2;
    config.headers['app_version'] = window.dsBridge.call("getStorage", {
      key: 'app_version'
    }) || '3.0.0';
    //config.headers['zmjx_client'] = 2;
    config.url = `${config.url}`;
    return config;
  }, function (error) {
    // 对请求错误做些什么  
    return Promise.reject(error);
  });
}

function responceIntercptor(axios) {
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    const data = response.data;
    if (data.responseCode === 1000010001) {
      // goAuthPage();
      // return Promise.reject('no login')
    }
    // 对响应数据做点什么 
    return data;
  }, function (err) {
    var config = err.config

    // 判断是否配置了重试
    if (!config || !config.retry) return Promise.reject(err)
    if (!config.shouldRetry || typeof config.shouldRetry !== 'function') return Promise.reject(err)

    // 判断是否满足重试条件
    if (!config.shouldRetry(err)) return Promise.reject(err)

    // 设置重试次数
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) return Promise.reject(err)

    // 重试次数自增
    config.__retryCount += 1

    // 延时处理
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })
    config.data = Qs.parse(config.data)
    // 重新发起axios请求
    return backoff.then(() => {
      return axios(config)
    })

  });
}

export default (() => {
  const axios = create({
    baseURL: baseUrl,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间) 
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断 
    timeout: 10000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // 默认的false, true:让ajax携带cookie
  });

  setHeaders(axios)
  requestIntercptor(axios);
  responceIntercptor(axios);
  return axios;
})();
