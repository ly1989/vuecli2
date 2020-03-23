<template>
  <div class="city-select">
    <div class="step-icons">
      <img
        class="img"
        :src="require('../../assets/dining-room/headImg@2x.png')"
        alt
        srcset
      />
    </div>
    <!--  -->
    <div class="ding-body">
      <div class="search-bar">
        <span class="address" @click="chooseCity">
          {{ currentCity.city }}
          <van-icon name="arrow-down" color="#ABABAB" />
        </span>
        <span class="search-input">附近餐厅</span>
        <span class="address" @click="chooseCity" style="visibility: hidden;">
          {{ currentCity.city }}
          <van-icon name="arrow-down" color="#ABABAB" />
        </span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多啦~"
        @load="onLoad"
      >
        <van-cell
          center
          v-for="item in dataList"
          :key="item.storeId"
          class="van-cell-override"
          @click="() => chooseDiningRoom(item)"
        >
          <span slot="title" class="title">{{ item.name }}</span>
          <span slot="label" class="label">{{ item.address }}</span>
          <span slot="default" class="value"
            >{{ item.distance }} {{ item.distance > 0 ? "km" : "" }}</span
          >
          <van-icon slot="right-icon" name="arrow" color="#ABABAB" />
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/utils/eventBus";
import api from "@/apis/home";
export default {
  data() {
    return {
      dataList: [],
      page: 1,
      pageSize: 10,
      error: false,
      loading: false,
      finished: false,
      locOk: false
    };
  },
  created() {
    window.document.title = "选择餐厅";
    // EventBus.$on("locOk", () => {
    //   if (this.dataList.length == 0) {
    //     this.onLoad();
    //   }
    // });
  },
  computed: mapState({
    currentCity: state => state.home.selCity
  }),
  methods: {
    chooseCity() {
      this.$router.push({
        path: `/dining-address`
      });
    },
    calTime() {
      const curT = new Date();
      const curH = curT.getHours();
      if (curH > 6 && curH < 23) {
        if (curH < 23) {
          return true;
        }
      } else if (curH === 6) {
        const curM = curT.getMinutes();
        if (curM >= 30) {
          return true;
        }
      }

      return false;
    },
    chooseDiningRoom(item) {
      this.calTime()
        ? this.$dialog
            .confirm({
              confirmButtonColor: "#DEB467",
              confirmButtonText: "继续点餐",
              cancelButtonColor: "#494949",
              cancelButtonText: "重选餐厅",
              title: "温馨提示",
              message: `肯德基点餐为第三方供应商提供的代下单服务。当您支付后，请凭取餐码等候门店屏幕的显示即可取餐。如有疑问请联系小鲸卡特权客服。`
            })
            .then(() => {
              // on confirm
              this.$store.commit("home/selDiningRoom", item);
              this.$store.commit("cart/clearCartData");
              this.$router.push({
                path: `/list`
              });
            })
            .catch(() => {
              // on cancel
            })
        : this.$dialog.alert({
            // title: "温馨提示",
            message: "6:30-23:00才开始营业哦",
            confirmButtonColor: "#DEB467",
            confirmButtonText: "知道了"
          });
    },
    onLoad() {
      // console.log(
      //   "....onload",
      //   this.currentCity,
      //   this.$store.state.home.selCity
      // );

      // if (this.$store.state.home.selCity.isLoc === false) {
      //   return;
      // }
      api
        .restaurantList({
          page: this.page,
          pageSize: this.pageSize,
          districtId: this.$store.state.home.selCity.districtId,
          latitude: this.$store.state.home.selCity.latitude,
          longitude: this.$store.state.home.selCity.longitude
        })
        .then(res => {
          this.loading = false;
          if (
            res.entry &&
            res.entry.length > 0 &&
            this.pageSize == res.entry.length
          ) {
            this.page = this.page + 1;
          } else {
            this.finished = true;
          }
          if (res.status) {
            if (res.entry && res.entry.length > 0) {
              this.dataList.push(...res.entry.map(item => item));
            }
          } else {
            this.finished = true;
            // this.$toast(res.message);
          }
        })
        .catch(e => {
          this.loading = false;
          this.error = true;
        });
    }
  }
};
</script>

<style lang="less">
.city-select {
  .van-grid-item__content::after {
    border: none;
  }

  .van-grid-item__content {
    background: unset;
  }

  .van-list {
    background: white;

    .van-cell__label,
    .van-cell__value {
      color: #ababab;
      span {
        display: block;
      }
    }

    .van-cell__title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .van-cell__value {
      flex: unset;
      padding-left: 20px;
    }
  }

  .van-cell-override {
    padding: 13px 14px;
    .title {
      color: #333333;
      font-size: 14px;
    }
    .label {
      font-size: 12px;
    }
  }
}
</style>

<style lang="less" scoped>
.city-select {
  background: linear-gradient(
    90deg,
    rgba(219, 189, 132, 1) 0%,
    rgba(201, 167, 90, 1) 100%
  );
  .step-icons {
    padding: 33px 30px 24px;
    .img {
      width: 100%;
      height: auto;
    }
  }

  .ding-body {
    border-radius: 10px 10px 0 0;
    min-height: 100vh;
    background: white;
  }

  .search-bar {
    border-bottom: 0.5pt solid rgba(225, 225, 225, 0.3);
    background: white;
    display: flex;
    width: 100%;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    height: 58px;
    line-height: 58px;
    color: #767676;

    .address {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0 0 14px;
      font-size: 12px;
    }

    .search-input {
      flex: 1;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>