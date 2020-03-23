<style lang="less">
  .page-detail {
    margin-bottom: 50px;

    .top {
      width: 100%;
      height: 240px;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .defaultList {
      border-top: solid 10px #F3F3F3;
      width: 100%;
      padding-bottom: 14px;
    }

    .defaultList ul li {
      margin: 0px 14px;

      .defaultList_box {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding: 10px 0px;
        border-bottom: #e6e6e6 solid 1px;
        font-size: 13px;
        color: #494949;

        .defaultList_box_left {
          display: flex;
          align-items: center;

          .leftImgSize {
            padding-left: 6px;
            padding-right: 24px;
            width: 56px;
            height: 56px;

          }

          .leftText {
            flex: 1;
            padding-left: 10px;
            vertical-align: middle;
            line-height: 20px;

          }
        }
      }

      .defaultList_box_right {
        padding-left: 20px;
        width: 60px;
        text-align: right;
        white-space: nowrap;
      }
    }

    .title_text {
      font-size: 13px;
      position: relative;
      color: #494949;
      font-weight: bold;
      padding: 14px 0px 0px 14px;
      line-height: 22px;

      &:after {
        position: absolute;
        left: 0px;
        top: 14px;
        width: 4px;
        content: "";
        height: 22px;
        background: rgba(222, 183, 111, 1);
      }
    }

    .list {
      border-top: solid 10px #F3F3F3;
      width: 100%;
      padding-bottom: 16px;

      .desc {
        padding: 10px 14px 0px 14px;
      }

      .desc li {
        line-height: 20px;
        color: #ABABAB;
        font-size: 13px;
      }

      .divList {
        padding: 0px 14px 0px 14px;
        overflow: hidden;
        //display: flex;
      }

      .divListBox {
        width: 360px;
      }
    }

    .totalPrce {
      position: fixed;
      bottom: 0px;
      left: 0px;
      background: #333;
      color: #fff;
      height: 50px;
      line-height: 50px;
      display: flex;
      width: 100%;
      //padding: 0px 10px;
      justify-content: space-between;

      .price_text {
        font-size: 20px;
        padding-left: 28px;
      }

      .smallFont {
        font-size: 10px;
        text-decoration: line-through;
        color: #D4D4D4;
        padding-left: 10px;
      }

      .goToBuy {
        margin-right: 28px;
        background: #DEB76F;
        width: 124px;
        color: #fff;
        font-size: 14px;
        border-radius: 20px;
        //padding: 0px 10px;
        height: 37px;
        line-height: 37px;
        margin-top: 6px;
        text-align: center;
      }
    }
  }
</style>
<template>
  <div class="page-detail">
    <div class="top">
      <img :src="itemObj.imgUrl" alt="" class="img" />
    </div>
    <div class="defaultList" v-if="defaultList && defaultList.length > 0">
      <div class="title_text">已选餐品</div>
      <ul>
        <li
            v-for="(item, index) in defaultList"
            :key="index">
          <div class="defaultList_box">
            <div class="defaultList_box_left"> <img :src="item.img" alt="" class="leftImgSize" /><span
                    class="leftText">{{item.title}}</span></div>
            <div class="defaultList_box_right">30份</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list" v-if="dataList && dataList.length > 0">
      <div class="title_text">请选择小食</div>
      <div class="desc">
        <ul>
          <li
              v-for="(item, index) in dataList"
              :key="index"
              v-if="item.checked">
            已选: {{ item.title }} X {{ item.num }}
          </li>
        </ul>
      </div>
      <div class="divList">
        <div class="divListBox">
          <template v-if="total > 1">

            <Item
                  :data="item"
                  :total="total"
                  v-for="(item, index) in dataList"
                  :selectNum="selectNum"
                  :index="index"
                  listName="dataList"
                  selectNumName="selectNum"
                  @addItem="addItem"
                  @reduceItem="reduceItem"
                  :key="index" />
          </template>
          <template v-else>
            <FirstItem
                       :data="item"
                       :total="total"
                       v-for="(item, index) in dataList"
                       :selectNum="selectNum"
                       :index="index"
                       listName="dataList"
                       @selectFirst="selectFirst"
                       :key="index" />
          </template>
        </div>
      </div>
    </div>
    <div class="list" v-if="sendDataList && sendDataList.length > 0">
      <div class="title_text">请选择小食</div>
      <div class="desc">
        <ul>
          <li
              v-for="(item, index) in sendDataList"
              :key="index"
              v-if="item.checked">
            已送: {{ item.title }} X {{ item.num }}
          </li>
        </ul>
      </div>
      <div class="divList">
        <div class="divListBox">
          <template v-if="sendTotal > 1">
            <Item
                  :data="item"
                  :total="sendTotal"
                  v-for="(item, index) in sendDataList"
                  :selectNum="sendSelectNum"
                  :index="index"
                  listName="sendDataList"
                  selectNumName="sendSelectNum"
                  @addItem="addItem"
                  @reduceItem="reduceItem"
                  :key="index" />
          </template>
          <template v-else>
            <FirstItem
                       :data="item"
                       :total="sendTotal"
                       v-for="(item, index) in sendDataList"
                       :selectNum="sendSelectNum"
                       :index="index"
                       listName="sendDataList"
                       @selectFirst="selectFirst"
                       :key="index" />
          </template>
        </div>
      </div>
    </div>
    <div class="totalPrce">
      <div class='price_text'>¥{{(Number(priceObj.price || '')).toFixed(2)}}<span
              class="smallFont">¥{{(Number(priceObj.oldPrice || '')).toFixed(2)}}</span></div>
      <div class="goToBuy" @click="goToCart">加入购物车</div>
    </div>
  </div>
</template>
<script>
  import api from "./api/api.js";
  import {
    mapMutations,
    mapActions
  } from "vuex";
  import _ from "lodash";
  import Vue from "vue";
  import {
    DropdownMenu,
    DropdownItem,
    Toast
  } from "vant";
  import Item from "./item/index";
  import FirstItem from "./item/index_1";
  Vue.use(DropdownMenu)
    .use(DropdownItem)
    .use(Toast);

  export default {
    name: "detail",
    components: {
      Item,
      FirstItem
    },
    computed: {
      priceObj() {
        let dataList = this.dataList;
        let price = this.price;
        let oldPrice = this.oldPrice;
        if (dataList && dataList.length > 0) {
          dataList.forEach((item, i) => {
            if (item.checked) {
              price = price + item.addPrice * item.num;
              oldPrice = oldPrice + item.oldPrice * item.num;
            }
          });
        }
        return {
          price: price,
          oldPrice: oldPrice
        };
      }
    },
    data() {
      return {
        id: '',
        itemObj: {
          imgUrl: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        },
        //默认餐品数据
        defaultList: [{
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "小菜小菜小菜小菜小菜小菜小菜",
            checked: true,
            num: 1,
            addPrice: 1,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 2,
            oldPrice: 2.1,
          }
        ],
        oldPrice: 2.3, //老的价格
        price: 2.1, //新价格
        total: 3, //选择类别产品的总数量
        selectNum: 1, //选择的数量统计
        sendTotal: 1, //赠送产品数量统计
        sendSelectNum: 1, //赠送选择的数量
        //赠送餐品数据
        sendDataList: [{
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "小菜1111",
            checked: true,
            num: 1,
            addPrice: 1,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 2,
            oldPrice: 2.1,
          }
        ],
        //选择餐品的数据
        dataList: [{
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜小菜",
            checked: true,
            num: 1,
            addPrice: 1,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 1.3,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 1.3,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 1.3,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 1.3,
            oldPrice: 2,
          },
          {
            id: 1,
            img: "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
            price: "20",
            dis: "1",
            title: "雪糕234",
            num: 0,
            addPrice: 1.3,
            oldPrice: 2,
          }
        ],
      };
    },
    methods: {
      async getDetailAjax() {
        let data = {
          orderId: this.id
        };
        let result = await api.getDetailAjax(data);
        if (result && result.responseCode == 0) {

        }
      },
      ...mapActions('cart', [
        'addProductToCart',
        'reduceProductToCart'
      ]),
      //如果只有一个数据时当成单旋钮
      selectFirst(index, listName) {
        let dataList = _.cloneDeep(this[listName]);
        dataList.forEach(element => {
          element.checked = false;
          element.num = 0;
        });
        let item = dataList[index];
        item.checked = true;
        item.num = 1;
        this[listName] = dataList;
      },
      //多个时复选框
      addItem(index, listName, selectNumName) {
        this[selectNumName] = ++this[selectNumName];
        let dataList = _.cloneDeep(this[listName]);
        let item = dataList[index];
        item.checked = true;
        item.num = ++item.num;
        this[listName] = dataList;
      },
      //多个时复选框
      reduceItem(index, listName, selectNumName) {
        this[selectNumName] = --this[selectNumName];
        let dataList = _.cloneDeep(this[listName]);
        let item = dataList[index];
        item.num = --item.num;
        if (item.num <= 0) {
          item.num = 0;
        }
        if (item.num == 0) {
          item.checked = false;
        }
        this[listName] = dataList;
      },
      goToCart() {
        if (this.selectNum < this.total) {
          Toast(`只能选择${this.total}种食品`)
          return;
        }
        //this.addProductToCart();

      }
    },
    created() {
      window.document.title = '套餐选择';
      this.id = this.$route.params.detailId;
      //获取详情请求
      //this.getDetailAjax();
    },
    async mounted() {}
  };
</script>
