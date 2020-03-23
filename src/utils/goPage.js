import { appId, isInApp, isInMp } from './index';

let baseUrl = location.origin + location.pathname;

// if (location.href.indexOf('kuaizhan') > -1) {
//   baseUrl = 'https://h5.zhima666.cn/NASA/black-whale/index.html';
// }
baseUrl = 'https://dailyh5.zmjx.com/NASA/black-whale/index.html';
// baseUrl = './index.html'
// 去登录页
export function goAuthPage() {
  if (isInApp) return '';
  const currentPage = encodeURIComponent(encodeURIComponent(location.href));
  const loginUrl = `${baseUrl}${location.search}#/login/${currentPage}`
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${
    encodeURIComponent(loginUrl)
  }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
}

// 去支付页面
export function goPay(info) {
  const stringifyData = JSON.stringify(info);
  // if (isIn) { 
  //   return wx.miniProgram.navigateTo({ 
  //     url: '/pages/pay/index?payData=' + stringifyData
  //   })
  // }
  return window.location.href = `#/pay/${stringifyData}`
}