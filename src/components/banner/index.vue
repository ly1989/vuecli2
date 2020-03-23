<template>
  <div class="module-banner">
    <a href="#/rule"></a>
    <div class="barrage-wrapper" >
      <spacex-barrage v-if="isInApp && barrageList.length" :barrageList="barrageList" />
    </div>
  </div>
</template>

<script>
// alert(3)
import { isInApp } from '@/utils'
import apis from '@/apis';
// import SpacexBarrage from '@spacex/barrage'
import SpacexBarrage from './barrage'
export default { 
  name: 'my',
  components: {
    SpacexBarrage
  },
  data() {
    return {
      isInApp,
      // isInWechat,
      barrageList : [],
    //默认可不配config
    // config : {
    //   channels: 2,
    //   loop: true,
    //   speed: 8
    // }
    };
  },
  async created() {
    if (!isInApp) return;
    const res = await apis.getScreenBullets();
    const entry = res.entry;
     if (entry && entry.length > 0) {
      entry.forEach(item => {
        item.type = '话费'
        item.avatar =
          item.headImg ||
          "https://zmjx-public.oss-cn-hangzhou.aliyuncs.com/fe/images/free-order/avatar.png";
      });
    }
    this.barrageList = entry;

  }
};
</script>
<style lang="less" scoped>
  .module-banner {
    height: 2.35rem;
    background: url(https://static.zmjx.com/fe/images/FE/free-charge/banner.png) #2173f7;
    background-size:100% 100%;
    position: relative;
    padding-top: 0.01rem;
    
    .barrage-wrapper {
      margin-top: 0.2rem;
      // background: #f00;
      height: 1.6rem;
    }
    a { 
      position: absolute; 
      right: 0;
      top: 0rem;
      height:0.6rem;
      width: 0.6rem;
      z-index: 20;
    }
  }
</style>
