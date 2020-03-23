
<style lang="less">
  .module-item {
    .item {
      width: 3.5rem;
      margin: 0 auto 0.12rem;
      background: #fff;
      background:rgba(255,255,255,1);
      border-radius: 0.06rem;
      box-sizing: border-box;
      padding: 0.14rem 0 0 0.14rem;
      display: flex;
      justify-content: space-between;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      }
      .detail {
        position: relative;
        width: 2.74rem;
        .name {
          font-size: 0.16rem;
          font-weight: 500;
          color: rgba(27,27,31,1);
          line-height: 0.22rem;
        }

        .price {
          color:rgba(234,48,23,1);
          line-height: 0.28rem;
          font-size: 0.12rem;
          font-weight:400;
          margin-top: 0.05rem;
          strong {
            margin-right: 0.05rem;
            font-size: 0.18rem;
            font-weight:500;
          }
        }

        .coupon {
          // background: #000;
          margin-top: 0.03rem;
          .reduce {
            width: 0.76rem; 
            height: 0.2rem;
            box-sizing: border-box;
            // background: url('../../assets/reduce.png');
            background-size: 100% 100%;
            padding-left: 0.2rem;
            text-align: center;
            color: #EA3017;
            display: inline-block;
            font-size:0.12rem;
            line-height: 0.12rem;
            padding-top: 0.04rem;
            vertical-align:middle;
          }
          .whom {
            height: 0.2rem;
            box-sizing: border-box;
            background: #EA3017;
            color: #fff;
            display: inline-block;
            margin-left: 0.06rem;
            font-size: 12px;
            // line-height: 0.2rem;
            padding: 0.04rem 0.06rem 0.04rem;
            border-radius: 0.02rem;
            vertical-align:middle;
            line-height: 0.12rem;
          }
        }
        .address {
          margin-top: 0.14rem;
          border-top: solid 1px #e1e1e1;
          padding: 0.1rem 0;
          font-size: 0.12rem;
          color: #494949;
          // background: url('../../assets/locate.png') no-repeat;
          background-position: left center;
          background-size: 0.12rem auto;
          padding-left: 0.18rem;
          box-sizing: border-box;
          padding-right: 0.12rem;
          // width: 2.56rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .navigate {
          position: absolute;
          width: 0.7rem;
          height: 0.3rem;
          top: 0.19rem;
          right: 0.12rem;
          // background: url('../../assets/navigate.png') no-repeat;
          background-size: 100% 100%;
        }
        .distance {
          position: absolute;
          color: #858585;
          font-size: 0.12rem;
          right: 0.12rem;
          line-height: 0.17rem;
          top: 0.61rem;
        }
      }
    }
  }
</style>
<template>

<!-- 
id: 425
gasId: "ZH000001449"
gasName: "中化石油（五杭站）"
price: "6.30"
down: "直降0.98"
unit: "升"
oilNo: "92"
distance: "距您79.33km"
address: "运河街道杭信村"
lat: 31
lon: 120
-->
  <div class="module-item" @click="goDetail">
    <div class="item">
        <img class="icon" :src="data.imgUrl" />
        <div class="detail">
          <div class="name">{{data.gasName}}</div>
          <div class="price">
            <strong>¥ {{data.price}}</strong>
            <span>/{{data.unit}}/{{data.oilNo}}#</span>
          </div>
          <div class="coupon">
            <span class="reduce">{{data.down}}</span>
            <span class="whom">新人专享</span>
          </div>
          <div class="address">
            {{data.address}}
          </div>
          <div class="navigate" title="导航" @click="onNav"></div>
          <div class="distance">{{data.distance}}</div>
        </div>
      </div>
  </div>
</template>
<script>

import apis from '@/apis/buy';
import { isInApp, isInWechat } from '@/utils/index';
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';

Vue.use(DropdownMenu).use(DropdownItem);

export default { 
  name: 'Item',
  props: {
    data: Object,
    type: String,
  },
  data() {
    return {
      
    }
  },
  methods: {
    onNav(e) {
      // alert(JSON.stringify({"dLat": this.data.lat,"dLon": this.data.lon,"dName":this.data.gasName}))
      dsBridge.call("async.nav", {"dLat": this.data.lat,"dLon": this.data.lon,"dName":this.data.gasName});
      // e.preventDefault();
      e.stopPropagation();
    },
    goDetail() {
      if (this.type !== 'list') return;
      const { gasId, oilNo } = this.data;
      window.location.href = `#/detail/${gasId}/${oilNo}`
    }
  },
  created() {
    
  },
  async mounted() {

  }
};
</script>



