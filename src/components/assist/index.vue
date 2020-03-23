<template>
  <div class="module-assist">
    <div class="title">
      好友助力详情
    </div>
    <div class="line"></div>
    <div class="info">每个好友参与免单成功助力1次,免单确认收货后,计为有效助力!好友退款,则视为助力失效.</div>
    <div class="list-wrapper">
      
      <div class="list"  v-if="helps.length">
        <div class="item" v-for="(item,index) in helps" :key="index">
          <span class="">
            <img :src="item.headImg" />
            <span class="nick">{{item.nickName}}</span>
            <span class="money" v-if="item.helpStatus === 1">+{{item.payment}}元</span>
            <span class="error" v-else>助力失败</span>
          </span>
          <span class="status">{{statusDesc[item.orderStatus]}}</span>
        </div>
      </div>
      <div class="empty" v-else>
        <img src="https://static.zmjx.com/fe/images/FE/free-charge/empty.png" />
        <div>
          <span>暂无好友助力</span>
        </div>
      </div>
    </div>
    <div class="more" v-if="type !== 1 && helps.length > 0">
      <span @click="goAssist">更多助力>></span>
    </div>
  </div>
</template>
<script>
import { pushPage } from '@/utils'
const statusDesc = {
  '-1': '待付款',
  1: '已付款',
  2: '确认收货',
  3: '已结算',
  4: '退款失效',
  5: '维权失效',
  6: '违规失效',
  8: '非多多进宝商品',
}
export default { 
  name: 'assist',
  props: {
    type: Number,
    helps: Array,
    packet: Object,
  },
  data() {
    return {
      statusDesc,
    };
  },
  methods: {
    goAssist() {
      // pushPage(`zhimajx://redEnvelopes`)
      pushPage(`zhimajx://assistanceDetails?packetId=${this.packet.packetId}&type=2`);
              //  zhimajx://assistanceDetails?packetId=1&type=2
    }   
  }
};
</script>
<style lang="less" scoped>
  .module-assist {
    -webkit-font-smoothing:antialiased;
    width: 3.38rem;
    background:rgba(38,126,248,1);
    position: relative;
    margin: 0.2rem auto 0;
    padding: 0.5rem 0.14rem 0.15rem;
    min-height: 2rem;
    box-sizing: border-box;
    .title {
      text-align: center;
      width:1.335rem;
      // height:0.16rem;
      font-size:0.17rem;
      font-weight:600;
      color:rgba(234,254,255,1);
      margin: 0 auto;
      -webkit-font-smoothing:antialiased;
      background: rgba(38,126,248,1);
      // background:#f00;
      z-index: 2;
      position: absolute;
      top: 0.16rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .line {
      width: 1.835rem;
      // z-index: -1;
      height: 0.01rem;
      background:#fff;
      position: absolute;
      top: 0.29rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .info {
      // width:3.1; 
      font-size:0.12rem;
      font-weight:400;
      color:rgba(227,253,254,1);
      line-height:0.2rem;
    }
    .list-wrapper {
      margin-top: 0.12rem;
      min-height:1.6rem;
      background:rgba(255,255,255,1);
      border:1px solid rgba(249, 249, 249, 0.93);
      box-shadow:0px 0px 0.135rem 0px rgba(119,124,255,0.47) inset;
      .item {
        padding: 0 0.12rem;
        min-height: 0.53rem;
        align-items: center;
        display: flex;
        border-bottom: solid 1px rgba(222,222,222,1);
        justify-content: space-between;

        img {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          margin-right:0.08rem;
          vertical-align: middle;
        } 
      
        .nick {
          vertical-align: middle;
          color:rgba(51,51,51,1);
          font-size:0.12rem; 
          width: 1rem;
          display: inline-block;
        }
        .money {
          // align-self: flex-end;
          vertical-align: middle;
          width: 0.65rem;
          text-align: center;
          font-size: 0.15rem;
          color:rgba(255,88,22,1);
          display: inline-block;
        }
        .error {
          min-width:0.65rem;
          height:0.24rem;
          background:rgba(255,233,225,1);
          border-radius:0.12rem;
          font-size:0.12rem;
          font-weight:400;
          color:rgba(255,83,15,1);
          display: inline-block;
          text-align: center;
          line-height: 0.24rem;
        }
        .status {
          // float: right;
          vertical-align: middle;
          color:rgba(153,153,153,1);
          font-size:0.12rem;
        }
      }
    }
  }
  .more {
    margin-top: 0.14rem;
    text-align: center;
    span {
      font-size: 0.13rem;
      color: #fff;
      text-decoration: none;
    }
  }
  .empty {
    text-align: center;
    padding-top: 0.33rem;
    img {
      width: 0.6rem;
      height: auto;
    }
    span {
      font-size:0.15rem;
      color:rgba(153,153,153,1);
      margin-top: 0.12rem;
      display: inline-block;
    }
  }
</style>
