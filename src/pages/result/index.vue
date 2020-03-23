
<style lang="less">
  .page-result {
    height: 100vh;
    background:linear-gradient(90deg,rgba(255,154,49,1) 0%,rgba(255,97,22,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
    .module-pay {
      transform: translateY(-100%);
    }
    .status {
      padding-left: 0.25rem;
      display: inline-block;
      font-size: 0.22rem;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:0.3rem;
      background: url('../../assets/pay/success.png') no-repeat;
      background-size: auto 0.2rem;
      background-position: center left;
    }
    .fail {
      background-image: url('../../assets/pay/fail.png');
    }
    .btns {
      margin-top: 0.2rem;
      span {
        display: inline-block;
        width: 1.1rem;
        height: 0.3rem;
        box-sizing: border-box;
        line-height:0.28rem;
        font-size:0.14rem;
        border-radius: 0.15rem;
        border: solid 1px #fff;
        margin: 0 0.1rem;
      }
    }
  }



  

</style>
<template>
  <div class="page-result">
    <div class="module-pay">
      <template v-if="status === '1'">
        <div class="status ">支付成功</div>
        <div class="btns">
          <span @click="onGoHome">返回首页</span>
          <span @click="onGoDetail">查看订单</span>
        </div>
      </template>

      <template v-else>
        <div class="status fail">支付失败</div>
        <div class="btns">
          <span @click="onReOrder">重新下单</span>
        </div>
      </template>
      
    </div>

  </div>
</template>
<script>

import apis from '@/apis/index';
import { isInApp, isInWechat, getLocation, pushPage } from '@/utils/index';
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
    const { status, orderId } = this.$route.params;
    // console.log(this)
    return {
      // status: 1,
      status, 
      orderId
    }
  },
  computed: {
    totalAmount() {
      let totalAmount = 0;
      this.cartData.forEach(item => {
        totalAmount += (+item.settlePrice) * item.quantity
      })
      return totalAmount.toFixed(2);
    }
  },
  methods: {
    onReOrder() {
      history.go(-1);
    },
    onGoHome() {
      history.go(-3);
    },
    onGoDetail() {
      pushPage(`zhimajx://kfcOrderDetails?orderId=${this.orderId}`)
      // zhimajx://kfcOrderDetails?orderId=${orderId}
    }
  },
  created() {
    
    
  },
  async mounted() {

   
   
  }
};
</script>



