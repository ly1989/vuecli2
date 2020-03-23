<style lang="less">
 .page-item2 {
    border-radius:2px;
    margin: 10px 12px 0px 0px;
    border: solid #e6e6e6 1px;
    color: #494949;
    //padding: 9px;
    display: inline-block;
    width: 106px;
    
    .page-item-box{
      padding: 8px;
    }
    .iconSize {
      width: 90px;
      height: 90px;
    }

    .title {
      font-size: 13px;
      
      line-height: 18px;
      height: 36px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      width: 90px;
      padding-top: 5px;
      text-overflow: ellipsis;
      //margin-bottom: 5px;
    }

    .btn-area {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
       font-size: 15px;
      .btn-reduce {
        background: url(../../../assets/index/btn-reduce.png) no-repeat;
        background-size: 100% auto;
        width: 20px;
        height: 20px;
      }

      .btn-reduce-empty {

        width: 20px;
        height: 20px;
      }

      .cart-num {
        max-width: 86px;
        text-align: center;
      }

      .btn-add {
        background: url(../../../assets/index/btn-add.png) no-repeat;
        background-size: 100% auto;
        width: 20px;
        height: 20px;
      }
      .btn-add-empty {
        background: url(../../../assets/index/default-btn-add.png) no-repeat;
         background-size: 100% auto;
        width: 20px;
        height: 20px;
      }
    }

    .addPrice {
      padding-top: 5px;
      color: red;
      font-size: 12px;
      //line-height: 30px;
    }
  }

  .redBorder {
    border-color: #DEB76F;
  }
</style>
<template>
  <div :class="data.checked ? 'page-item2 redBorder' : 'page-item2'" @click="addItem(index, listName)">
    <div class="page-item-box">
    <img :src="data.img" alt="" class="iconSize" />
    <div class="title">{{data.title}}</div>
    </div>
  </div>
</template>
<script>
  import apis from '@/apis/index';
  import Vue from 'vue';
  import {
    Toast
  } from 'vant';
  Vue.use(Toast);
  export default {
    name: 'Item',
    props: {
      data: Object,
      selectNum: Number,
      total: Number,
      index: Number,
      listName: String
    },
    components: {

    },
    data() {
      return {}
    },
    methods: {
      addItem(index, listName) {
        this.$emit('selectFirst', index, listName);
      },
    },
  };
</script>
