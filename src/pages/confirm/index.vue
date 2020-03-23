
<style lang="less">
  .page-confirm {
    color: #333;
    min-height: 100vh;
    background: #f6f6f6;
    width: 3.75rem;
    margin: 0 auto;
    padding-bottom: 1rem;
    box-sizing: border-box;
    .module-address {
      padding: 0.14rem;
      background: #fff;
      .name {
        line-height: 0.24rem;
        strong {
          font-size: 0.12rem;
          padding: 0 0.04rem;
          font-weight: 400;
          height: 0.2rem;
          line-height: 0.2rem;
          border-radius: 0.02rem;
          color: rgba(201,167,90,1);
          border:1px solid rgba(201,167,90,1);
          vertical-align: middle;
        }
        span {
          font-size: 0.17rem;
          color: #333;
          margin-left: 0.04rem;
          vertical-align: middle;
        }
      }
      .address {
        line-height: 0.17rem;
        font-size: 0.12rem;
        font-weight:400;
        color:rgba(171,171,171,1);
        line-height: 0.17rem;
        margin-top: 0.04rem;
      }
    }

    .module-detail {
      margin-top: 0.1rem;
      background: #fff;
      padding-bottom: 0.2rem;
      .list {
        border-top: solid 1px #E1E1E1;
        padding: 0.1rem 0.14rem 0 0.2rem;
        .item {
          align-items: center;
          line-height: 0.24rem;
          display: flex;
          font-size: 0.14rem;
          .name {
            flex: 1;
          }
          .price {
            // width: 1rem;
          }
          .count {
            width: 0.34rem;
            text-align: right;
            color: #ABABAB;
          }
        }
      }
      .total {
        font-size: 0.14rem;
        margin-top: 0.2rem;
        text-align: right;
        padding-right: 0.14rem;
        strong {
          font-weight: 500;
          color: #FF6116;
        }
      }
    }
    .head {
      // line-height: 0.5rem;
      display: flex;
      justify-content: space-between;
      padding: 0.14rem;
      line-height: 0.22rem;
      .title {
        font-size: 0.16rem;
        i {
          // content: '';
          display: inline-block;
          width: 0.03rem;
          height: 0.15rem;
          background:rgba(207,167,94,1);
          vertical-align: middle;
          margin-right: 0.03rem;
        }
        span {
          vertical-align: middle;
          display: inline-block;
        }
      }
      .mobile {
        input {
          border: none;
          vertical-align: middle;
          width: 1rem;
          font-size: 0.14rem;
          // background: #f00;
        }
        label {
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          background: url('../../assets/edit.png');
          background-size: 100% 100%;
          // margin-left: 0.1rem;
          vertical-align: middle;
        }
      }
    }

    .module-type {
      margin-top: 0.1rem;
      background: #fff;
      padding-bottom: 0.2rem;

      .types {
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
      }
      .in, .out  {
        width: 1.58rem;
        height: 0.4rem;
        border: 1px solid rgba(225,225,225,1);
        // line-height: 0.4rem;
        text-align: center;
        font-size: 0.16rem;

        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .selected {
        width: 1.6rem;
        // line-height: 0.42rem;
        height: 0.42rem;
        border: none;
        color: #C9A75A;
        background: url('../../assets/order-type.png') ;
        background-size: 100% 100%;
      }

    }

    .module-tel {
      margin-top: 0.1rem;
      background: #fff;
    }

    .module-btn {
      width: 3.1rem;
      position: fixed;
      bottom: 0.2rem;
      text-align: center;
      background: #C9A75A;
      border-radius: 0.22rem;
      font-size: 0.17rem;
      color: #fff;
      line-height: 0.44rem;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);

    }

    .module-warn {
      padding:0.1rem  0.16rem;
      .line {
        margin-bottom: 0.06rem;
        display: flex;
        line-height: 0.2rem;
        .key {
          // background: #f00;
          width: 0.66rem;
          color: #ababab;
          text-align-last:justify;
          text-align:justify;
          text-justify:distribute-all-lines; // 这行必加，兼容ie浏览器
          
        }
        .symbol {
          color: #ababab;
        }
        .val {
          flex: 1;
          color: #333;
        }
      }
    }


    .module-payment {
      padding-bottom: 0.4rem;
      .head {
        // width:375px;
        // height:1px;
        // background:rgba(246,246,246,1);
        text-align:center;
        line-height: 0.55rem;
        font-size: 0.17rem;
        border-bottom: solid 1px #F6F6F6;
      }
      // '2019-12-21 16:21:45'    
      .wxpay {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333;
        line-height:0.55rem;
        padding: 0 0.22rem;
        i {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.12rem;
          display: inline-block;
          background: url('../../assets/wxpay.png');
          background-size: 100% 100%;
          vertical-align: middle;
        }
        em {
          font-style: normal;
          vertical-align: middle;
        }
        .selected {
          width: 0.22rem;
          height: 0.22rem;
          display: inline-block;
          background: url('../../assets/selected.png');
          background-size: 100% 100%;
          vertical-align: middle;
        }
      }

      .btn {
        width: 3.3rem;
        height: 0.44rem;
        background:rgba(222,183,111,1);
        border-radius: 0.06rem;
        margin: 0.38rem auto 0;
        color: #fff;
        font-size: 0.18rem;
        text-align: center;
        line-height:0.44rem;
      }
    }
    
  }



  

</style>
<template>
  <div class="page-confirm">
    <div class="module-address">
      <div class="name">
        <strong>就餐地址</strong>
        <span>{{name}}</span>
      </div>
      <div class="address">{{address}}</div>
    </div>

    <div class="module-detail">
      <div class="head">
        <div class="title">
          <i></i>
          <span>餐品详情</span>
        </div>
      </div>

      <div class="list">
        <div class="item" v-for="(item, index) in cartData" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.settlePrice}}</div>
          <div class="count">x{{item.quantity}}</div>
        </div>
        
      </div>

      <div class="total">
        共计{{total.quantity}}件，小计：
        <strong>￥ {{total.amount}}</strong>
      </div>
    </div>

    <div class="module-type">
      <div class="head">
        <div class="title">
          <i></i>
          <span>就餐方式</span>
        </div>
      </div>

      <div class="types">
        <div class="in " :class="{selected: this.type === 1}" @click="type = 1">店内就餐</div>
        <div class="out" :class="{selected: this.type === 2}" @click="type = 2">打包带走</div>
      </div>
      
    </div>

    <div class="module-tel">
      <div class="head">
        <div class="title">
          <i></i>
          <span>联系方式</span>
        </div>
        <div class="mobile">
          <input id="J_Tel" v-model="phone" @blur="onBlur" />
          <label for="J_Tel" class="edit"></label>
        </div>
      </div>
    </div>

    <div class="module-btn" @click="onCreateOrder">
      提交订单
    </div>


    <van-dialog
      v-model="showWarn"
      title="请确认取餐地址"
      show-cancel-button
      confirmButtonColor="#C9A75A"
      cancelButtonText="取消"
      confirmButtonText="确认并付款"
      @confirm="onConfirm"
    >
      <div class="module-warn">
        <div class="line">
          <div class="key">餐厅名称</div>
          <div class="symbol">：</div>
          <div class="val">{{name}}</div>
        </div>


        <div class="line">
          <div class="key">餐厅地址</div>
          <div class="symbol">：</div>
          <div class="val">{{address}}</div>
        </div>

        <div class="line">
          <div class="key">提示</div>
          <div class="symbol">：</div>
          <div class="val">请凭取餐码到店取餐，有时订单可能包含多个取餐码，请留意【我的订单】</div>
        </div>
      </div>
    </van-dialog>



    <van-popup
      v-model="showPayment"
      position="bottom"
      closeable
    >
      <div class="module-payment">
        <div class="head">请选择支付方式</div>
        <div class="payments">
          <div class="wxpay">
            <span class="">
              <i></i><em>微信支付</em>
            </span>
            <span class="selected"></span>
          </div>
        </div>
        <div class="btn" @click="goPay">{{payTxt}}</div>
      </div>
    </van-popup>

  </div>
</template>
<script>

import apis from '@/apis/buy';
import { isInApp, isInWechat, getLocation, isIOS } from '@/utils/index';
import Vue from 'vue';
import { DropdownMenu, DropdownItem, Toast, Dialog, Popup } from 'vant';
import Item from '@/components/item';


// 全局注册
// Vue.use(Dialog);



Vue.use(DropdownMenu).use(DropdownItem).use(Toast).use(Dialog).use(Popup)

export default { 
  name: 'index',
  components: {
    Item,
  },
  data() {
    let cartData = [];
    try {
      cartData = JSON.parse(localStorage.getItem('kfc_cart'));
    } catch(err) { }


    const selDiningRoom = this.$store.state.home.selDiningRoom;
    const address = (selDiningRoom.province || '') + (selDiningRoom.city || '')  + selDiningRoom.address;
    console.log(selDiningRoom)
    // return {
    //   name: selDiningRoom.name || '',
    //   show: false,
    //   showBall: true,
    //   address:  address || '',

    return {
      shopId: selDiningRoom.storeId,
      name: selDiningRoom.name || '',
      address:  address || '',
      payTxt: '立即支付',
      cartData: cartData || [],
      phone: '',
      type: 1,
      showWarn: false,
      showPayment: false,
      orderId: '',
      payData: null,
    }
  },
  computed: {
    total() {
      let amount = 0;
      let quantity = 0;
      this.cartData.forEach(item => {
        amount += (+item.settlePrice) * item.quantity
        quantity += item.quantity;
      })
      return {
        quantity, // 必填，生成签名的
        amount: amount.toFixed(2),
      }
      // return totalAmount.toFixed(2);
    },
    // totalAmount() {
    //   let totalAmount = 0;
    //   this.cartData.forEach(item => {
    //     totalAmount += (+item.settlePrice) * item.quantity
    //   })
    //   return totalAmount.toFixed(2);
    // }
  },
  methods: {
    onBlur() {
      window.scrollTo(0, window.scrollY);
    },
    async getUserInfo() {
       const res = await apis.getUserInfo();
        if (res.entry) {
          this.phone = res.entry.mobile;
        }
    },
    async onConfirm() {
      if (!/^1\d{10}$/.test(this.phone)) {
        return Toast('请输入正确的手机号码');
      }
      const submitData = {
        sourceType: isIOS ? 1 : 2,
        totalAmount: this.total.amount,
        actualAmount: this.total.amount,
        useCoupon: false,
        zmjxAllBizOrderModel: {
          shopSkuModelList: [{
            additionInfoJson: JSON.stringify({
              phone: this.phone,
              eatType: this.type === 1 ? 'EAT_IN' : 'TAKE_AWAY',
            }),
            outShopAddress: this.address,
            outShopName: this.name,
            shopId: '-1',
            skuModelList: this.cartData.map(item => {
              return {
                itemId: this.shopId,
                quantity: item.quantity,
                mainImgUrl: item.img,
                itemTitle: item.name,
                skuId: item.productId,
                virtualType: 1,
                itemType: 9, // KFC 9
              }
            })
          }],
          
        }
      };
      const res = await apis.creteOrder(submitData);
      
     
      if (res.entry && res.entry[0]) {
        this.orderId = Object.keys(res.entry[0])[0];
        return this.showPayment = true;
        // this.showPayment = true
      } else {
        Toast(res.message);
      }
    },
    async onCreateOrder() {
      this.showWarn = true;
      
    },
    async payResult() {
      const res = await apis.payResult({
        paymentSerialNo: this.paymentSerialNo,
        orderId: this.orderId
      })
      const isSuccess = res.entry && res.entry.payResult === 3;
      if (isSuccess) {
        this.goSuccess();
        return !!isSuccess;
      }
      return false;
    },
    async goPay() {
      const res = await apis.payOrder({
        actualAmount: this.total.amount,	
        bizOrderIds: this.orderId,	
        jingDouPayCount: 0,
        paymentMode: 	'WIN_XIN',
      });
      if (!res.entry) {
        return Toast(res.message);
      }
      this.payData = JSON.parse(res.entry.payData)
      this.paymentSerialNo = res.entry.paymentSerialNo;
      const payResult = await this.payResult();
      if (payResult) {
        return location.href = '#/result/1';
      }

      dsBridge.call("async.wxPay", this.payData, status => {
        if (status === 'OK') {
          return location.href = '#/result/1/' + this.orderId;
        } else {
          return location.href = '#/result/2';
        }
      });
    }
  },
  created() {
    this.getUserInfo();
    
  },
  async mounted() {

   
   
  }
};
</script>



