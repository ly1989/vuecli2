<template>
  <div class="page-pay">
    <div class="module-base">
      <!-- <div class="head">
        <i></i> 
        <span>微信支付信息</span>
      </div> -->
      <div class="title">订单信息</div>
      <div class="info">
        <div class="item">
          <span>订单号</span>
          <span>{{payInfo.orderId}}</span>
        </div>
        <div class="item">
          <span>手机号</span>
          <span class="tel">{{payInfo.mobile}}</span>
        </div>
        <div class="item">
          <span>总金额</span>
          <span class="total">{{payInfo.totalPayAmount}}</span>
        </div>
      </div>
    </div>
    
    <div class="module-btn" @click="launchPay">{{btnTxt}}</div>
  </div>
</template>
<script>

import apis from '@/apis/buy';
import { isInApp, isInWechat } from '@/utils/index';

export default { 
  name: 'rule',
  data() {
    return {
      payInfo: {},
      payData: {},
      btnTxt: '正在支付中',
      signed: false,
    }
  },
  methods: {
    goSuccess() {
      window.location.href = '#/successfulPay/' + this.payInfo.orderId;
    },
    setError() {
      document.title = '支付失败';
      this.btnTxt = '重新支付';
    },
    async payResult() {
      const res = await apis.payResult({
        paymentSerialNo: this.payInfo.paymentSerialNo,
        orderId: this.payInfo.orderId
      })
      const isSuccess = res.entry && res.entry.payResult === 3;
      if (isSuccess) {
        this.goSuccess();
        return !!isSuccess;
      }
      return false;
    },
    async launchPay() {
      const result = await this.payResult();
      if (result) return;
      if (isInWechat){
        await this.signWx(() => {
          this.launchPayWx();
        });
      } else if(isInApp) {
        this.launchPayApp();
      }
    },
    async launchPayApp() {
      dsBridge.call("async.wxPay", this.payData, status => {
        if (status === 'OK') {
          this.goSuccess();
        } else {
          this.setError();
        }
      })
    },
  

    async launchPayWx() {
      wx.chooseWXPay({
        timestamp: this.payData.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: this.payData.noncestr, // 支付签名随机串，不长于 32 位
        package: `prepay_id=${this.payData.prepayid}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: this.payData.sign, // 支付签名
        success:  res => {
          // alert(res)
          // alert('res')
          this.goSuccess();
          // console.log(res)
          // 支付成功后的回调函数
        },
        error: err => {
          // alert('err', err)
          // alert('error')
          this.setError();
          // console.log(err, 'err')
        }
      });
    },
    async signWx(cb) {
      if (this.signed) {
        cb && cb();
      }
      const res = await apis.getShareSign({
        url: encodeURIComponent(location.href.split('#')[0]),
      });
      
      const entry = res.entry;

      if (entry) {
        const { nonceStr, signature, timestamp } = entry //  res.entry;
        // console.log(nonceStr, signature, timestamp)
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxf5b4acfaca03ba5f', // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature,// 必填，签名
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        });


        wx.ready((success) => {
          this.signed = true;
          cb && cb();
          // console.log('success', success)
        })

        wx.error((err) => {
          // console.log('error______________', err)
        })

      }
    }
  },
  created() {
    
  },
  async mounted() {
    const { payInfo } = this.$route.params;
    
    // return ;
    try {
      this.payInfo = JSON.parse(payInfo);
      this.payData = JSON.parse(this.payInfo.payData);
      this.launchPay();
      
    } catch (e) {
      alert('参数错误');
    }
    
    
    // return;
//     wx.config({
//       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//       appId: 'wxf5b4acfaca03ba5f', // 必填，公众号的唯一标识
//       timestamp: '', // 必填，生成签名的时间戳
//       nonceStr: '', // 必填，生成签名的随机串
//       signature: '',// 必填，签名
//       jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
//     });
//     wx.ready((success) => {
//       console.log('success', success)
//     })
//     wx.error(() => {
//       console.log(err)
//     })
//     const res = {body: {}}
//     wx.invoke(
//          'getBrandWCPayRequest',
//           {
//                  appId: res.body.appid, //公众号名称，由商户传入
//                  timeStamp: '"'+ res.body.timestamp +'"', //时间戳，自1970年以来的秒数
//                  nonceStr: res.body.noncestr, //随机串
//                  package: res.body.package,
//                  signType: "MD5", //微信签名方式
//                  paySign: res.body.paySign //微信签名
//             },
//             function (wxresult){ //成功回调
//                  console.log('微信支付结果====',wxresult)
//                  if (wxresult.err_msg == "get_brand_wcpay_request:ok") {
//                          Toast({
//                                  message:"微信支付成功!"
//                           });
//                          /* 跳转到支付成功页面 */
//                          var url = `支付成功页面的url`
//                          window.location.href = url;
//                          return;
//                  } else if (wxresult.err_msg == "get_brand_wcpay_request:cancel"){
//                          Toast({
//                                  message:'取消支付!',
//                                  duration:1500
//                              });
//                              return;
//                   } else { //失败回调
//                          Toast({
//                                  message:"支付失败!",
//                                  duration:1500
//                              });
//                            /* 跳转到失败页面 */
//                             self.$router.push({ name:'PayFail', query:query });
//                              return;
//                  };
//  });


//     window.document.title = '微信支付'
//     const { payInfo } = this.$route.params;
//     try {
//       this.payInfo = JSON.parse(payInfo);
//     } catch(err) {}
  }
};
</script>

<style lang="less" scoped>
  .page-pay {
    min-height: 100vh;
    width: 3.75rem;
    margin: 0 auto;
    padding-top: 0.1rem;
    background: #f6f6f6;
    box-sizing: border-box;
    .module-base {
      width: 3.45rem;
      background:rgba(255,255,255,1);
      box-shadow: 0px 0px 6px -1px rgba(225,225,225,0.5);
      border-radius: 0.08rem;
      margin: 0 auto;
      // padding-top: 0.2rem;
      .head {
        text-align: center;
        i {
          width: 0.2rem;
          height: 0.2rem;
          margin-right: 0.07rem;
          display: inline-block;
          background: url('../../assets/wxpay.png');
          background-size: 100% 100%;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .title {
        text-align: center;
        line-height:0.63rem;
        font-size: 0.15rem;
        font-weight:500;
        color:rgba(26,26,26,1);
        // line-height: 0.2rem;
        margin-top: 0.33rem;
        // padding-bottom: 0.15rem;
        // padding-left: 0.14rem;
        border-bottom: 1px solid rgba(230,230,230,1);
      }
      .info {
        padding-left: 0.14rem;
        line-height: 0.54rem;
        .item {
          display: flex;
          justify-content: space-between;
          padding-right: 0.14rem;
          border-bottom: solid 1px #E6E6E6;
          color: #1a1a1a;
          font-size: 0.15rem;
          &:last-child {
            border-bottom: none;
          }
        }
        .tel {
          color: #DEB76F;
          font-weight: 500;
        }
        .total {
          color: #1A1A1A;
        }
      }
    }
    .module-btn {
      width: 3.3rem;
      height: 0.5rem;
      background: rgba(222,183,111,1);
      border-radius: 0.06rem;
      font-size: 0.17rem;
      text-align: center;
      line-height:0.5rem;
      margin: 0.5rem auto 0;
      color: #fff;
    }
  }
  
</style>
