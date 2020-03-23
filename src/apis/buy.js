import urlWrapper from './urlWrapper';

export default urlWrapper({
  
  // getAddressAndCodes: 'trade/zmjxCard/addressList/getAddressAndCodes',
  // remainQuota: 'trade/zmjxCard/orderList/remainQuota',
  // orderDetail: 'trade/zmjxCard/orderList/orderDetail',
  // payResult: 'trade/zmjxCard/order/payResult',
  // getShareSign: 'usercenter/weixin/getShareSign',
  getUserInfo: 'usercenter/personal/info/get',
  payResult: 'trade/zmjxBizOrderPay/payResultQuery',
  // getShareSign: 'http://192.168.6.140:8080/usercenter/weixin/getShareSign',
}, {
  creteOrder: 'trade/zmjxBizOrder/createZmjxBizOrder',
  payOrder: 'trade/zmjxBizOrderPay/orderPay',
  // payOrder: 'trade/zmjxCard/order/payOrder',
  // wxAuth: '/usercenter/wxlogin/wxgzh/auth',
})