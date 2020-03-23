<style lang="less">
  .page-item {
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
      margin-bottom: 5px;
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
  <div :class="data.checked ? 'page-item redBorder' : 'page-item'">
    <div class="page-item-box">
    <img :src="data.img" alt="" class="iconSize" />
    <div class="title">{{data.title}}</div>
    <div class="btn-area">
      <div class="btn-reduce" @click.stop="reduceItem(index, listName, selectNumName)" v-if='data.num > 0'></div>
      <div class="btn-reduce-empty" v-else></div>
      <div class="cart-num">{{data.num || 0}}</div>
      <div :class="selectNum == total ? 'btn-add-empty':'btn-add'"
           @click.stop="addItem(selectNum, total, index, listName, selectNumName)"></div>
    </div>
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
      selectNumName: String,
      listName: String
    },
    components: {

    },
    data() {
      return {}
    },
    methods: {
      addItem(selectNum, total, index, selectNumName, listName) {
        if (selectNum >= total) {
          Toast(`只能选择${total}种食品`)
          return;
        }
        this.$emit('addItem', index, selectNumName, listName);
      },
      reduceItem(index, listName, selectNumName) {
        this.$emit('reduceItem', index, listName, selectNumName);
      },
    },
  };
</script>
