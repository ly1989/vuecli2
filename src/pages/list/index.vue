<template>
  <div class="layout">
    <div class="top">当前{{buyingCount}}人正在下单，获取取餐码等待时间约为{{waitTime}}分钟</div>
    <div class="address">
      <div class="address_left">
        <div class="text01">{{ name }}</div>
        <div class="text02">{{ address }}</div>
      </div>
      <div class="address_right">
        <!-- <div class="imgSize"><img src="../../assets/index/Like@2x.png" class="imgSize" /></div>
        <div class="text03">收藏</div>-->
      </div>
    </div>
    <!-- S 内容区域 -->
    <div class="content1" v-if="goodList">
      <!-- S 左侧边栏 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            v-for="(item, index) in goodList"
            class="menu-item"
            :class="{ current: currentIndex === index }"
            @click="selectMenu(index, $event)"
            :key="index"
          >
            <span class="text">{{ item.category }}</span>
          </li>
        </ul>
      </div>
      <!-- E 左侧边栏 -->
      <!-- S 右侧边栏 -->
      <div class="foods-wrapper" ref="foodWrapper" id="foods-wrapper">
        <ul>
          <li
            v-for="(item, call) in goodList"
            class="food-list food-list-hook"
            :key="call"
          >
            <div class="title">{{ item.category }}</div>
            <ul>
              <li
                v-for="(food, inl) in item.products"
                class="food-item"
                @click="selectFood(food, $event)"
                :key="inl"
              >
                <div class="icon">
                  <img :src="food.img" alt class="iconSize" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <div class="dis">已减¥{{food.thriftAmount}}</div>
                  <div class="price">
                    <span class="now">
                      <span class="small">￥</span>
                      {{ food.settlePrice }}
                    </span>
                    <span class="old">
                      <span class="small">￥</span>
                      {{ food.officialPrice }}
                    </span>
                  </div>
                  <btn-area :item="food" :showBall="showBall" />
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- E 右侧边栏 -->
    </div>
    <cart />
    <ball />
    <!-- E 内容区域 -->
  </div>
</template>

<script>
import api from "./api/index.js";
import { goodList } from "./constants/mock.js";
import btnArea from "./mods/btn-area.vue";
import cart from "./mods/cart.vue";
import ball from "./mods/ball.vue";

export default {
  data() {
    const selDiningRoom = this.$store.state.home.selDiningRoom;
    const address = (selDiningRoom.province || '') + (selDiningRoom.city || '') + selDiningRoom.address;
    return {
      name: selDiningRoom.name || '',
      show: false,
      showBall: true,
      address:  address || '',
      pageNum: 0,
      listHeight: [],
      scrolly: 0, // 滚动处始值
      goodList: [],
      buyingCount: '',
      waitTime : ''
    };
  },
  components: {
    btnArea,
    cart,
    ball
  },
  created() {
    window.document.title = "菜单";
  },

  mounted() {
    this.getList(()=>{
      this.$nextTick(() => {
        this._calculateHeight();
      });
      this.$refs.foodWrapper.addEventListener("scroll", e => {
        this.scrolly = Math.abs(Math.round(this.$refs.foodWrapper.scrollTop));
      });
    });
    this.getBuyerInfo();
  },
  computed: {
    currentIndex() {
      //计算到达哪个区域的区间的时候的对应的索引值
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]; //当前menu子块的高度
        let height2 = this.listHeight[i + 1]; //下一个menu子块的高度
        //滚动到底部的时候,height2为undefined,需要考虑这种情况
        //需要确定是在两个menu子块的高度区间
        if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
          let munuItems = this.$refs.menuWrapper.getElementsByClassName(
            "menu-item"
          );
          if (munuItems && munuItems.length > 0) {
            munuItems[i].scrollIntoView(true);
          }
          return i; //返回这个menu子块的索引
        }
      }
      return 0;
    }
  },
  methods: {
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      ); //获取每一个food的dom对象
      let height = 0;
      this.listHeight.push(height); //初始化第一个高度为0
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]; //每一个item都是刚才获取的food的每一个dom
        height += item.clientHeight; //主要是为了获取每一个foods内部块的高度
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      el.scrollIntoView(true);
    },
    selectFood() {
      console.log("selectFood");
    },
    async getList (cb){
        let res = await api.getMenuList({
          storeId : this.$store.state.home.selDiningRoom.storeId, // '100702'
        });
        if (res && res.responseCode == 0) {
          this.goodList = res.entry;
          cb && cb();
        }
    },
    async getBuyerInfo() {
       let res = await api.getBuyerInfo({
          storeId : this.$store.state.home.selDiningRoom.storeId, // '100702'
        });
        if (res && res.responseCode == 0) {
          this.buyingCount = res.entry.buyingCount;
          this.waitTime = res.entry.waitTime;
        }
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: #f5f5f5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #c8c8c8;
  }
  width: 100%;

  .top {
    height: 29px;
    background: rgba(252, 244, 223, 1);
    color: #d3af27;
    font-size: 12px;
    //padding-left: 38px;
    text-align: center;
    line-height: 29px;
  }

  .address {
    height: 66px;
    background: rgba(255, 255, 255, 1);
    padding: 0px 30px 0px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: #e6e6e6 solid 1px;

    .address_left {
      width: 270px;
      text-align: left;

      .text01 {
        color: #494949;
        font-size: 16px;
        font-weight: bold;
        padding-top: 12px;
        line-height: 22px;
      }

      .text02 {
        color: #ababab;
        font-size: 11px;
        line-height: 22px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .address_right {
      padding-top: 13px;
      text-align: right;

      .imgSize {
        width: 20px;
        height: 18px;
      }

      .text03 {
        padding-top: 5px;
        color: #ababab;
        font-size: 11px;
        text-align: right;
      }
    }
  }

  .content1 {
    display: flex;
    position: absolute;
    top: 96px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;

    .menu-wrapper {
      //flex: 0 0 80px;
      width: 80px;
      overflow-y: auto;
      background: rgba(247, 247, 247, 1);
      .menu-item {
        display: table;
        width: 80px;
        height: 60px;
        line-height: 14px;
        color: #494949;
        //padding: 0 12px;
        text-align: center;

        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;

          //font-weight: 700;
          &:after {
            width: 4px;
            height: 22px;
            background: rgba(222, 183, 111, 1);
            position: absolute;
            left: 0px;
            top: 19px;
            content: "";
          }

          .text {
            &:after {
              display: none;
            }
          }
        }

        .text {
          display: table-cell;
          //width: 56px;
          vertical-align: middle;
          position: relative;
          font-size: 11px;
          padding: 0px 10px;
          &:after {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            //border-top: 1px solid red;
            width: 100%;
            content: "";
          }
        }
      }
    }

    .foods-wrapper {
      flex: 1;
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }

      .food-list {
        .title {
          padding-left: 3px;
          height: 18px;
          line-height: 18px;
          padding-top: 12px;
          color: #494949;
          //border-left: 2px solid #d9dde1;
          font-size: 13px;
          color: #494949;
          font-weight: 400;
        }

        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          border-bottom: #e6e6e6 solid 1px;

          &:after {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            //border-top: 1px solid red;
            width: 100%;
            content: "";
          }

          &:last-child {
            &:after {
              display: none;
            }
          }

          .icon {
            flex: 0 0 57px;
            margin-right: 10px;
            .iconSize {
              width: 110px;
              //height: 110px;
            }
          }

          .content {
            flex: 1;

            .name {
              margin: 2px 0 0px 0;
              font-size: 14px;
              line-height: 18px;
              // color: rgb(7, 17, 27);
              color: #494949;
              height: 36px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .dis {
              min-width: 48px;
              height: 20px;
              background: rgba(255, 250, 250, 1);
              border-radius: 3px;
              border: 1px solid rgba(248, 81, 81, 1);
              font-size: 10px;
              color: #f85151;
              margin-top: 5px;
              display: inline-block;
              text-align: center;
              padding: 0 5px;
              line-height: 20px;
            }
            .desc,
            .extra {
              font-size: 10px;
              line-height: 10px;
              color: rgb(147, 153, 159);
            }

            .desc {
              margin-bottom: 8px;
              line-height: 12px;
            }

            .extra {
              .count {
                margin-right: 12px;
              }
            }

            .price {
              font-weight: 700px;
              line-height: 28px;
              padding-top: 5px;
              .small {
                font-size: 11px;
                //padding-right: 3px;
              }
              .now {
                margin-right: 5px;
                color: #d51616;
                font-size: 18px;
                font-weight: bold;
              }

              .old {
                font-size: 11px;
                color: #d0d0d0;
                text-decoration: line-through;
              }
            }

            .btn-area {
              display: flex;
              align-items: center;
              .btn-reduce {
                background: url(../../assets/index/btn-reduce.png) no-repeat;
                background-size: 100% auto;
                width: 22px;
                height: 22px;
              }
              .cart-num {
                width: 86px;
                text-align: center;
              }
              .btn-add {
                background: url(../../assets/index/btn-add.png) no-repeat;
                background-size: 100% auto;
                width: 22px;
                height: 22px;
              }
            }

            .cartControl-wrapper {
              position: absolute;
              right: 0;
              bottom: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
