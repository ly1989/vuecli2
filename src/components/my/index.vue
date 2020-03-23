<template>
  <div class="module-my">
    <div>
      <div class="way">
        <em>￥</em>
        <strong>{{waitAmount}}</strong>
      </div>
      <div class="total">
        <em>￥</em>
        <strong>{{accountAmount}}</strong>
      </div>
    </div>
    <div class="detail" @click="goList"></div>
  </div>
</template>

<script>
import { pushPage } from '@/utils'
import apis from '@/apis';

export default { 
  name: "my",
  data() {
    return {
      accountAmount: 0,
      waitAmount: 0
    };
  },
  methods: {
    // goDetail() {
    //   alert('跳转详情页');
    // },
    goList() {

      pushPage(`zhimajx://redEnvelopes`)
    }
  },
  async created() {
    const res = await apis.queryMyCoupon();
    if (res.entry) {
      this.accountAmount = res.entry.accountAmount;
      this.waitAmount = res.entry.waitAmount; 
    }
  }
}; 
</script>

<style lang="less" scoped>
  .module-my {
    margin-top: 0.175rem;
    height: 2.89rem;
    background: url(https://static.zmjx.com/fe/images/FE/free-charge/my.png);
    background-size:100% 100%;
    position: relative;
    color:rgba(232,39,16,1);
    font-family: 'Helvetica';
  }
  .way,.total {
    position: absolute;
    // background: rgba(0, 0, 0, 0.3);
    width: 1.08rem;
    height: 0.27rem;
    top: 1.28rem;
    left: 0.52rem;
    // text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    
    em {
      font-size:0.18rem;
      font-style: normal;
      vertical-align: bottom;
    }
    strong {
      
      font-size:0.36rem;
      font-weight:500;
      height: 0.36rem;
      line-height:0.36rem;
      vertical-align: bottom;
      
    }
  }
  .total {
    left: 2.16rem;
  }
  .detail {
    position: absolute;
    bottom: 0.2rem;
    left: 1.3rem;
    // background: rgba(0, 0, 0, 0.3);
    height:0.3rem;
    width: 1.2rem;
    
  }
</style>
