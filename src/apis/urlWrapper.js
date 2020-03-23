import request from './axios';


function fillStr(str, data = {}) {
  return str
    .replace(/{(.*?)}/igm, function ($, $1) {
      return data[$1] ? data[$1] : '';
    });
}

/**
 * 封装请求，支持get,post,和RESTful
 * @param {Object} getUrls get 请求的url列表 
 * @param {Object} postUrls post 请求的url列表 
 * @param {Object} restfulUrls RESTful 请求的url列表
 * @example 
 *  wrapper(gets)
 *  wrapper({}, posts)
 *  wrapper({getList: '/item/get'}, {addData: 'item/add'}, {getData: 'item/{itemId}'})
 */
export default function wrapper(getUrls, postUrls, restfulUrls) {
  const re = {};
  // 封装get请求
  getUrls && Object.keys(getUrls).forEach(item => {
    re[item] = async params => {
      const res = await request({
        url: getUrls[item],
        params,
      });
      return res;
    }
  });
  // 封装Post请求
  postUrls && Object.keys(postUrls).forEach(item => {
    re[item] = async data => {
      const res = await request({
        url: postUrls[item],
        method: 'POST',
        data,
      });
      return res;
    }
  });

  // 封装RESTFul请求
  restfulUrls && Object.keys(restfulUrls).forEach(item => {
    re[item] = async data => {
      const res = await request({
        url: fillStr(restfulUrls[item], data),
      });
      return res;
    }
  });
  return re;
}






// import request from './axios';

// export default function ({get, post, restful}) {

// }

// const urls = {
//   queryMyCoupon: 'marketing/redpacket/surprise', // 获取待助力和全部红博爱
//   pendingCoupon: 'marketing/redpacket/packet/tohelp?freeType=2', // 助力中的红包
//   getItemList: 'marketing/activityitem/phonefrees', // 获取商品列表
//   canFreeOrder: 'marketing/redpacket/suspend?freeType=1', // 是否有天天免单资格
//   checkIsNeedHelp: 'marketing/redpacket/packet/parenthelp?freeType=2', // 是否有待助力的红包
//   getScreenBullets: 'marketing/ScreenBullets/get?key=CALL_COST_FREE_ORDER_SCREEN_BULLETS', // 弹幕
//   getpacketDetail: 'marketing/redpacket/packet/', // 获取红包详情
//   getHelps: 'marketing/redpacket/helps/', // 获取助力列表
//   getShareUrl: 'itemcenter/share/getActivityUrl?activityType=2', // 获取活动分享的url
//   getUserInfoByInviteCode: 'usercenter/wxlogin/login/inviteruser/get', // 根据邀请码获取用户信息,
//   getParentPacketDetail: 'marketing/redpacket/packet/phone/',
// };

// const postUrls = {
//   convertLink: 'itemcenter/link/convert',
// }

// const restfulUrls = {

// }
// const re = {}

// Object.keys(urls).map(item => {
//   re[item] = async params => {
//     let paramsStr = '';
//     let url = urls[item];
//     // if (params) {
//     //   paramsStr = Object.keys(params).map(key => {
//     //     return `${key}=${params[key]}`
//     //   }).join('&');
//     //   url += (url.indexOf('?') === -1 ? '?' : '&') + paramsStr
//     // };
//     const res = await request({
//       url,
//       params,
//     });
//     console.log(item, res);
//     return res;
//   }
// });

// Object.keys(postUrls).map(item => {
//   re[item] = async data => {
//     let paramsStr = '';
//     let url = postUrls[item];
//     const res = await request({
//       url,
//       data,
//       method: 'POST',
//     });
//     console.log(item, res);
//     return res;
//   }
// })




// re.getpacketDetail = async id => {
//   return await request({
//     url: urls.getParentPacketDetail + id,
//     // url: urls.getpacketDetail + id
//   });
// }

// re.getHelps = async id => {
//   return await request({
//     url: urls.getHelps + id,
//     params: {
//       pageNo: 1,
//       pageSize: 3,
//     }
//   });
// }

// export default re;
