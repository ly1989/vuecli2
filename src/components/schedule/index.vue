<template>
  <div class="module-process">
    <div class="body">
      <div class="detail" v-if="packet.packetAmount">
        <div class="title" v-if="packet.packetStatus === 1">
          <van-count-down :time="packet.dueTime" format="DD天 HH:mm:ss后领取失效"></van-count-down>
        </div>

          <div class="title-red" v-if="packet.packetStatus === 2">红包待到账</div>
          <div class="title-red" v-if="packet.packetStatus === 3">红包已到账</div>
          <div class="title-gray" v-if="packet.packetStatus === 4">红包已失效</div>

        <!-- <div class="title-red" >红包待到账</div> -->
        <!-- <div class="total" > -->
          <div class="total" :class="{'total-gray': packet.packetStatus === 4}">
          <em>￥</em>
          <strong>{{packet.helpSuccAmount}}</strong>
        </div>

        <div v-if="packet.packetStatus === 1">
          <div class="remain">
            已拆得<strong>{{packet.helpSuccAmount}}</strong>元，还差{{(packet.packetAmount -  packet.helpSuccAmount).toFixed(2)}}元即得红包
          </div>
          <div class="bar">
            <div class="to" :style="{width: porcess}"></div>
          </div>
        </div>

        <div v-if="packet.packetStatus !== 1">
          <div class="line"></div>
          <div class="coming">
            <van-count-down :time="packet.nextTime" format="DD天 HH:mm:ss后活动开始"></van-count-down>
          </div>
        </div>

        <template v-if="type === 1">
          <div class="btn-wrapper">
            <template v-if="packet.packetStatus === 1">
              
              <!-- 就是时间过了，但是红包为助力中 ，展示【还有助力已结束】 -->
              <div class="btn-disabled" v-if="packet.dueTime <= 0">好友助力已结束</div>
            
              <!-- 就是时间过了，但是红包为助力中 ，展示【还有助力已结束】 -->
              <div class="btn-disabled"  v-else-if="packet.packetAmount === packet.helpSuccAmount">好友已完成助力</div>
              <template v-else>
                <div class="btn zoom-in-out" @click="goHelp" v-if="packet.helpStatus === null">帮好友助力拆红包</div>
                <div class="btn-disabled" @click="goHelp" v-if="packet.helpStatus === 1">助力成功</div>
                <div class="btn-disabled"  v-if="packet.helpStatus === 2">助力失败</div>
              </template>
            </template>
            <div class="btn-disabled" v-else>助力已结束</div>
          </div>
          <div class="btn-common" @click="goAct">我也要红包</div>
        </template>

        <div v-else class="btn-invite-wrapper">
          <template v-if="packet.packetStatus === 1">
            <div class="btn-disabled" v-if="packet.packetAmount === packet.helpSuccAmount">已完成助力</div>
            <div class="btn-invite zoom-in-out" v-else @click="onInvite">邀请好友 拆开鲸喜红包</div>
          </template>
          <div class="btn-invite" v-else>活动暂未开始</div>
        </div> 
        <!-- <div v-else class="btn-invite"></div> -->
      </div>
    </div>
    <how v-if="showHelp" />


    <!-- <spacex-share v-model="isShow" :config="shareConfig" /> -->

  </div>
</template>
<script>

import Vue from "vue";
import { CountDown } from "vant";
Vue.use(CountDown);

import how from '../how';
import spacexShare from "@spacex/share";


export default { 
  name: 'detail',
  props: {
    type: Number,
    packet: Object,
  },
  components: {
    how,
    spacexShare
  },
  computed: {
    porcess() {
      return this.packet.helpSuccAmount * 100 / this.packet.packetAmount + '%'
    }
  },
  data() {
    const packetStatues = {
      1: '待助力',
      2: '待到账',
      3: '已失效',
      4: '已结算',
    }
    return {
      packetStatues,
      time: 100000000,
      showHelp: false,

      isShow: false,
        //默认可不配config
    };
  },
  methods: {
    onClose() {
      this.showHelp = false;
    },
    goHelp() {
      this.showHelp = true;
    },
    goAct() {
      window.location.href = '#/'
    },
    onInvite() {
      this.$parent.onShare(true);
      // this.isShow = true
    }
  }
};
</script>

<style lang="less" scoped>
  .module-process {
    background:rgba(23,163,255,1);
    padding: 0.09rem 0.075rem;
    .body {
      background:rgba(20,66,208,1);
      border-radius:0.02rem;
      padding: 0.11rem;
    }
    .detail {
      text-align: center;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 0.45rem 0px rgba(243,54,52,0.27) inset; 
      border-radius:0.05rem;
      display: flex;
      flex-direction:column;
      align-items:center;
      padding-top: 0.24rem;
      padding-bottom: 0.15rem;
      
      .title, .title-red, .title-gray {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(51,51,51,1);
        display: flex;
      }
      .title-red {
        color:rgba(225,34,17,1);
      }
      .title-gray {
        color:rgba(94,94,94,1);
      }
      .total {
        margin-top: 0.18rem;
        color: #E12211;

        em {
          font-size:0.18rem;
          font-style: normal;
          vertical-align: bottom;
          margin-right:0.06rem;
        font-weight:500;

        }
        strong {
          
          font-size:0.45rem;
          font-weight:500;
          height: 0.34rem;
          line-height:0.34rem;
          vertical-align: bottom;
          
        }
      }
      .total-gray {
        color: #999;
      }
      .remain {
        margin-top: 0.25rem;
        font-size:0.12rem;
        font-weight:400;
        color:rgba(244,32,31,1);
        strong {
          font-size:0.19rem;
          font-weight:500;
        }
      }
      .bar {
        width: 2.53rem;
        height:0.09rem;
        background:rgba(247,178,179,1);
        border-radius:0.045rem;
        overflow: hidden;
        .to {
          background:rgba(253,59,62,1);
          border-radius:0.045rem;
          height:0.09rem;
          transition: all 0.3s;
        }
      }
      .btn-wrapper {
        height: 0.70rem;
        display: flex;
        align-items: center;
      }
      .btn, .btn-invite, .btn-disabled {
        width:2.65rem;
        height:0.44rem;
        line-height:0.44rem;
        border-radius: 0.22rem;
        font-size: 0.16rem;
        margin-top: 0.15rem;
        background:linear-gradient(90deg,rgba(253,56,62,1) 0%,rgba(254,109,52,1) 100%);
        text-align: center;
        color:rgba(253,253,253,1);
        font-size: 0.16rem;
        
      }
      .btn-disabled {
        background:rgba(232,232,232,1);
        color:rgba(131,131,131,1);
      }

      .btn-common {
        width:2.65rem;
        height:0.44rem;
        border-radius: 0.22rem;
        line-height:0.44rem;
        text-align: center;
        color:rgba(253,253,253,1);
        font-size: 0.16rem;
        margin-top: 0.125rem;
        background:rgba(255,255,255,1);
        border:2px solid rgba(253,57,62,1);
        color:rgba(244,32,31,1);
        box-sizing:border-box;
        
      }
    }
  }

  .line {
    width: 0.85rem;
    border-top:  0.015rem dashed #FF7063; 
    margin: auto;
    margin-top: 0.2rem;
  }
  .coming {
    margin-top: 0.2rem;
    font-size:0.14rem;
    color:rgba(51,51,51,1);
  }
  .btn-invite-wrapper {
    // background-color: #00f;
    height: 0.6rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }

  
</style>
