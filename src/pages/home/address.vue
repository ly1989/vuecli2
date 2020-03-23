<template>
  <div>
    <van-search
      v-model="keyWord"
      class="search-input"
      placeholder="请输入城市名"
      shape="round"
      @input="onSearch"
    >
      <van-icon size="0.2rem" slot="left-icon" name="search" color="#ABABAB" />
    </van-search>
    <!-- <city-list :hotCity="hotCity" :cities="cities"></city-list> -->
    <div class="container" v-if="!keyWord">
      <div class="area">
        <van-index-anchor index="当前城市">当前城市</van-index-anchor>
        <van-grid :column-num="3" :gutter="10">
          <van-grid-item :text="currentCity.city" @click="()=>chooseCity(currentCity)" />
        </van-grid>
      </div>
      <!-- 热门城市开始 -->
      <div class="hotCity">
        <van-index-anchor index="热门城市" id="热">热门城市</van-index-anchor>
        <van-grid :column-num="3" :gutter="10">
          <van-grid-item
            v-for="(item, index) in hotCity"
            :key="index"
            :text="item.city"
            @click="()=>chooseCity(item)"
          />
        </van-grid>
      </div>
      <!-- 热门城市结束 -->

      <!-- 地区列表开始 -->
      <div class="list">
        <div v-for="group in cities" :ref="group.cityHead" :key="group.cityHead">
          <van-index-anchor :index="group.cityHead" :id="group.cityHead">{{group.cityHead}}</van-index-anchor>
          <van-cell
            v-for="item in group.kfcAreas"
            :key="item.districtId"
            :title="item.city"
            @click="()=>chooseCity(item)"
          />
        </div>
      </div>
      <!-- 地区列表结束 -->

      <!-- 字母导航开始 -->
      <city-alphabet @change="changeSort"></city-alphabet>
      <!-- 字母导航结束 -->
    </div>
    <div v-else>
      <van-cell
        v-for="item in searchCities"
        :key="item.districtId"
        :title="item.city"
        @click="()=>chooseCity(item)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/apis/home";
import CityAlphabet from "./alphabet";
export default {
  components: {
    CityAlphabet
  },
  data() {
    return {
      keyWord: "",
      searchCities: [],
      hotCity: [],
      cities: []
    };
  },
  created() {
    window.document.title = "地区选择";
  },
  mounted() {
    api.areaList().then(res => {
      if (res.status) {
        let entry = res.entry || [];
        this.cities = entry;
      } else {
        this.$toast(res.message);
      }
    });

    api.hotAreaList().then(res => {
      if (res.status) {
        let entry = res.entry || [];
        this.hotCity = entry;
      } else {
        this.$toast(res.message);
      }
    });
  },
  computed: mapState({
    currentCity: state => state.home.locCity
  }),
  methods: {
    chooseCity(v) {
      this.$store.commit("home/selCity", v);
      this.$router.push({
        path: `/`
      });
    },
    // 锚点滚动
    changeSort(anchorName, block) {
      if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          anchorElement.scrollIntoView({
            block: block || "start",
            behavior: "smooth"
          });
        }
      }
    },
    onSearch(v) {
      this.keyWord = v;
      if (v.length > 0) {
        let arr = v.split("");
        let str = arr.reduce(
          (t, val, ind) => {
            // console.log(t)
            t.push(val, "\\S*");
            return t;
          },
          ["\\S*"]
        );

        let reg = new RegExp(str.join(""));

        let ret = this.cities.map(group => {
          let kfcAreas = group.kfcAreas || [];
          return kfcAreas.filter(item => {
            // console.log(item.city, reg, reg.test(item.city));
            return reg.test(item.city);
          });
        });

        this.searchCities = ret.flat();
        console.log("结果", this.searchCities);
        //
      } else {
        this.searchCities = [];
      }
    }
  }
};
</script>

<style lang="less">
.container {
  .van-grid-item__content {
    padding: 10px 8px;
  }

  .van-index-anchor {
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    padding: 10px 16px 0;
  }
}
</style>

<style lang="less" scoped>
.container {
  background: rgba(245, 245, 245, 1);
}
/* 热门城市开始 */
.hot-top {
  font-size: 0.26rem;
  font-weight: 600;
  color: #212121;
  padding: 0.15rem;
}
.hot-bottom {
  background: #fff;
  font-size: 0.25rem;
  /* height: 3.68rem; */
  position: relative;
  overflow: hidden;
}
/* ul加一个伪类标签实现右侧边框 */
.hot-bottom::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 33.33333%;
  /* 距离左边 */
  left: 33.33333%;
  border-left: 0.02rem solid #ddd;
  border-right: 0.02rem solid #ddd;
}
.hot-item {
  color: #212121;
  width: 33.33333%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  float: left;
  border-bottom: 0.02rem solid #ddd;
  position: relative; /*解决被伪类覆盖的问题 */
}
/* 热门城市结束 */
/* 26个字母开始 */
// .right-nav {
//   position: fixed;
//   z-index: 1;
//   right: 0;
//   top: 50%;
//   margin-top: -7.0667rem;
//   .item {
//     text-align: center;
//     font-size: 14px;
//     color: #fa8919;
//     height: 0.5rem;
//     width: 1rem;
//   }
// }

.right-nav {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 1rem;
  bottom: 1rem;
  // margin-top: -7.0667rem;
  display: flex;
  flex-direction: column;
  .item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #fa8919;
    // height: 0.5rem;
    width: 0.5rem;
  }
}
.sort-top {
  font-size: 0.26rem;
  font-weight: 600;
  color: #212121;
  padding: 0.15rem;
}
.sort-bottom {
  background: #fff;
  font-size: 0.23rem;
  height: 3.6rem;
}
.sort-item {
  color: #212121;
  width: 16.66666%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  float: left;
}
/* 26个字母结束 */
/* 字母列表开始 */
.list-top {
  font-size: 0.26rem;
  font-weight: 600;
  color: #212121;
  padding: 0.15rem;
}
.list-bottom {
  background: #fff;
  font-size: 0.25rem;
  /* height: 3.68rem; */
  position: relative;
  overflow: hidden;
}
/* ul加一个伪类标签实现右侧边框 */
.list-bottom::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 25%;
  /* 距离左边 */
  left: 25%;
  border-left: 0.02rem solid #ddd;
  border-right: 0.02rem solid #ddd;
}
.list-bottom::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 25%;
  /* 距离左边 */
  left: 75%;
  border-left: 0.02rem solid #ddd;
}
.list-item {
  /* 不换行，小数点显示 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #212121;
  width: 25%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  float: left;
  border-bottom: 0.02rem solid #ddd;
}
/* 字母列表结束 */
</style>