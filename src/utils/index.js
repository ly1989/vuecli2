import { Dialog } from 'vant';
// Dialog.alert({
//   title: '提示',
//   message: `我们无法获取您的位置，您可尝试：
// 1、由于信号弱，离开页面重新进入 
// 2、在手机设置中开启定位权限`
// })
const href = window.location.href;
export const appId = 'wxf5b4acfaca03ba5f';
export const isInWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
export const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export const isInKuaizhan = window.location.href.match(/kuaizhan/);
export const isInMp = window.location.href.indexOf('isinmp');
export const cardName = href.indexOf('black=1') > -1 ? '黑鲸卡' : '小鲸卡'
export const isInApp = !!window.dsBridge.call("getStorage", {
  key: 'app_version'
}) || window.location.href.match('inapp=1')

export function getParamFromUrl(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  return r ? decodeURIComponent(r[2]) : '';
}

export const inviteCode = getParamFromUrl('inviteCode') || getParamFromUrl('ic');
// let env = '';

export function goDownload() {
  let url = `https://h5.zmjx.com/NASA/free-charge/index.html`;
  if (isInKuaizhan) {
    let env = getParamFromUrl('env');
    if (env === 'daily') {
      url = `https://dailyh5.zmjx.com/NASA/free-charge/index.html`;
    } else if (env === 'gray') {
      url = `https://grayh5.zmjx.com/NASA/free-charge/index.html`;
    }
  }
  const webUrl = encodeURIComponent(url)
  const downloadUrl = `/95/52/p655000935a6a7f?inviteCode=${inviteCode}&webUrl=${webUrl}`;
  // alert(downloadUrl);
  window.location.href = downloadUrl;
}

export function pushPage(url) {
  // alert(url)
  window.dsBridge.call("async.pushPage", {
    url
  });
}

// 兼容非主流的格式
export const isInWeChat = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
export function queryParamsFromQuery() {
  const params = {};
  try {
    // http://localhost:3000/#/coupon/?userId=111111#coupon 非标准网址
    // 正常网址： domain + search + hash
    const search = window.location.href.split('?')[1].split('#')[0];
    search.split('&').forEach(item => {
      const kv = item.split('=');
      params[kv[0]] = kv[1];
    })
  } catch (err) { };
  return params;
}

// 去登录页
export function goAuthPage() {
  const currentPage = encodeURIComponent(encodeURIComponent(location.href));
  const loginUrl = `https://dailyh5.zmjx.com/NASA/black-whale/index.html${location.search}#/login/${currentPage}`

  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${
    encodeURIComponent(loginUrl)
    }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
}

export function addParameterToUrl(url, key, value) {
  var split = url.split('#');
  url = split[0]
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = url.indexOf('?') !== -1 ? "&" : "?";
  if (url.match(re)) {
    url = url.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    url = url + separator + key + "=" + value;
  }
  return url + (split[1] ? '#' + split[1] : '');
}

export async function getLocation() {
  if (!isInApp) return {
    latitude: '40.2874',
    longitude: '116.0108',
    // latitude: '40',
    // longitude: '120',
  }
  // alert(2)
  // 120 & latitude=40
  return new Promise((resolve, reject) => {
    dsBridge.call('async.getLocation', {}, v => {
      // v = '经度,纬度'，
      // alert(v)
      if (!v) {
        Dialog.alert({
          title: '提示',
          message: `我们无法获取您的位置，您可尝试：
1、由于信号弱，离开页面重新进入 
2、在手机设置中开启定位权限`
        })
        return resolve({
          latitude: '40.2874',
          longitude: '116.0108',
          // latitude: '40',
          // longitude: '120',
        });
      }
      const location = v.split(',');
      return resolve({
        latitude: location[1],
        longitude: location[0], // '120.0108',
      })
    });
  })
}