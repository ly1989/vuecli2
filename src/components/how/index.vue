<template>
<div class="module-how">
  <div class="toast-dialog">
    <div class="toast-mask" @click="onClose">
      <div class="main" @click="stop">
        <div class="help-btn" @click="goHelp">帮好友助力</div>
      </div>
      <div class="close"></div>
    </div>
  </div>
</div>
</template>
<script>
// https://static.zmjx.com/fe/images/FE/free-charge/howtohelpbg.png
import { goFreeOrder } from '@/utils' 
export default { 
  name: 'detail',
  props: {
    list: Array,
    showHelp: Boolean,
    // onClose: Function
  },
  data() {
    return {
      active: 0, 
    };
  },
  methods: {
    stop: e => {
      e.stopPropagation();
    },
    onClose() {
      this.$parent.onClose();
    },
    goHelp() {
      goFreeOrder();
    }
  },
  mounted() {
    window.document.body.overflow = 'hidden';
  }
};

</script>

<style lang="less" scoped>

  .module-how {
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
        text-align: center;

      }
      .main {
        padding-top: 0.01rem;
        margin-top: 0.16rem;
        height:4.185rem;
        background: url(https://static.zmjx.com/fe/images/FE/free-charge/howtohelpbg.png);
        background-size: 100% 100%;
        // https://zmjx-public.oss-cn-hangzhou.aliyuncs.com/fe/images/FE/free-charge/howtohelpbg.png
      }
      .close {
        display: inline-block;
        height: 0.26rem;
        width: 0.26rem;
        background: url('../../assets/close.png'); 
        background-size: 100% 100%;
        margin-top: 0.34rem;
        // margin: 0 auto; 
      }


    }
  }
  .help-btn {
    margin: 3.5rem auto 0;
    width:2.1rem;
    height:0.425rem;;
    background:linear-gradient(0deg,rgba(255,212,152,1) 0%,rgba(255,252,247,1) 100%);
    box-shadow:0px 0px 0.15rem 0.015rem rgba(101,27,27,0.65);
    border-radius:0.21rem;
    text-align:center;
    line-height: 0.425rem;
    font-size:0.18rem;
    font-weight:500;
    color:rgba(169,43,25,1);

  }
  
</style>
