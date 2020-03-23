<template>
  <div class="">
    <spacex-share v-model="isShow" :config="shareConfig" />
  </div>
</template>
<script>
import spacexShare from "@spacex/share";
import { pushPage, getParamFromUrl } from '@/utils';
import apis from '@/apis'


const shareTitles = [
  '拜托啦，差您帮我点下话费就到手', 
  '芝麻鲸选话费补贴，每年免费领取1200元话费，每月可免费充100元！', 
]
const shareSubTitles = [
  '别再原价充话费啦，送你1200元话费，速抢！',
  '重磅福利！每年免费领取1200元话费，每月可充100元！', 
];

// const isHelp = getParamFromUrl('h') === '1';


export default { 
  name: 'assist',
  props: {
    // shareConfig: Object,
    // isShowShare: Boolean,
  },
  
  data() {
    return {
      shareUrl: '',
      isShow: false,
      shareConfig: {
        url: '', //分享的链接地址
        title: "拜托啦，帮我点一下就得话费了",
        subTitle: "芝麻鲸选话费补贴冲50返50 冲100返100",
        posterType: 'async.showCallChargePoster',
        qrStr : '', // 邀请海报的链接,传给bridge用,
        picUrl: 'https://static.zmjx.com/fe/images/free-order/share-wx-icon.png',
      },
    }
  },
  methods: {
    showShare(isHelp) {
      const shareUrl = this.shareUrl;
      let url = shareUrl;
      let qrStr = shareUrl;
      if (isHelp) {
        url += '&h=1';
        qrStr += '&h=1';
      }
      if (window.location.href.match('daily')) {
        qrStr += '&env=daily';
        url += '&env=daily';
      }
      if (window.location.href.match('gray')) {
        qrStr += '&env=gray';
        url += '&env=daily';
      }

      const random = Math.floor(Math.random() * shareTitles.length);
      this.shareConfig = {
        ...this.shareConfig,
        url: url,
        qrStr: url,
        title: shareTitles[random],
        subTitle: shareSubTitles[random],
      }
      this.isShow = true;
    },
    async getShareUrl() {
      const res = await apis.getShareUrl();
      this.shareUrl = res.entry.shareUrl;
    }
  },
  created(){
    this.getShareUrl();
  },
  components: {
    spacexShare
  }
};
</script>
<style lang="less" scoped>
  
</style>
