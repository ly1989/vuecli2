<template>
<div class="module-back">
  <div class="toast-dialog">
    <div class="toast-mask">
      <div class="toast-main">
        <div class="toast-obtain">
          <div class="hot-area" @click="goFreeOrder">
            <div class="go-wrapper">
              <div class="go zoom-in-out">立即参与</div>
            </div>
          </div>
          <div class="close" @click="goBack"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { goFreeOrder } from '@/utils'
// https://static.zmjx.com/fe/images/FE/free-charge/howtohelpbg.png 
export default {
  name: 'detail',
  props: {
    list: Array,
  },
  data() {
    return {
      active: 0, 
    };
  },
  methods: {
    goFreeOrder() {
      goFreeOrder();
    },
    goBack() {
      window.dsBridge.call("async.navigationPop", { delta:1}, () => {});
    }
  },
  mounted() {
    // debugger;
    window.document.body.style.overflow = 'hidden';
  }
};

</script>

<style lang="less" scoped>
  .module-back {
    .toast-dialog {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      .toast-mask {
        position: fixed;
        left: 0;
        top: 0; 
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 100;
      }
      .toast-main {
        height: 100%;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        // flex-direction: column;
        // background: #f00;
      }
      // .toast-content {
      //   width: 100%;
      //   display: flex;
      //   justify-content: space-between;
      //   flex-direction: column;
      //   align-items: center;
      // }
      
      .hot-area {
        padding-top: 3.815rem;
        // background: #f00;
      }
      .toast-obtain {
        text-align: center;
        box-sizing: border-box;
        height: 5.07rem;
        width: 3.21rem;
        background: url(https://static.zmjx.com/fe/images/FE/free-charge/back-bg.png);
        background-size: 100% 100%;
        .go-wrapper {
          height: 0.6rem;
        }
        .go {
          // width: 100%;
          // height: 0.42rem;
          // margin: 0.59rem auto 0;

          width:2.6rem;
          height:0.45rem;
          background:linear-gradient(0deg,rgba(246,28,35,1) 0%,rgba(255,115,60,1) 92%);
          border-radius:0.23rem;
          text-align: center;
          line-height:0.45rem;
          font-size:0.18rem;
          font-weight:500;
          color:rgba(255,255,255,1);
          margin: 0 auto;

         
          // background: #DC0300;
        }
       
      }


    }
  }
  
  .content-wrapper {
    box-sizing: border-box;
    padding-top: 1rem;
    width:2.56rem;
    height:2.95rem;
    margin: 0.19rem auto;
    background:rgba(255,255,255,1);
    box-shadow:0px -0.03rem 0.12rem 0px rgba(255,212,212,1) inset;
    position:relative;
  }

  .close {
    display: inline-block;
    height: 0.3rem;
    width: 0.3rem;
    // background: rgba(255, 255, 0, 0.4);
    margin-top: 0.3rem;

    // background: url('../../../assets/coupon/close.png');
    // background-size: 100% 100%;
  }
</style>
