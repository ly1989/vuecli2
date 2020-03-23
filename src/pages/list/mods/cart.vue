<template>
  <div>
    <div class="foods-bottom" @click="togglePopupVisible">
      <div class="cart-icon">
        <span v-if="count > 0">{{ count }}</span>
      </div>
      <div class="cart-info" v-if="count > 0">
        <div class="cart-info-price">
          ¥<span> {{ total | currency }}</span>
        </div>
        <div class="cart-info-desc">已为您节省¥{{ totalThriftAmount | currency }}</div>
      </div>
      <div class="cart-info" v-else>
        <div class="cart-info-price">
          ¥<span> {{ total | currency }}</span>
        </div>
      </div>
      <div class="cart-btn" v-if="count" @click.stop="buy">
        <span>选好了</span>
      </div>
      <div class="cart-btn-disabled" v-else>
        <span>未选择商品</span>
      </div>
    </div>
    <van-popup
      v-model="visible"
      position="bottom"
      @click-overlay="togglePopupVisible"
    >
      <div class="popup-main">
        <div class="cart-item" v-for="(item, index) in products">
          <div class="cart-item-name">{{ item.name }}</div>
          <div class="cart-item-price">¥{{ Number(item.settlePrice * item.quantity).toFixed(2) }}</div>
          <div class="cart-item-btnarea">
            <btnArea :item="item" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import btnArea from "./btn-area.vue";

export default {
  name: "cart",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    btnArea
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("cart", {
      count: "cartProductsCount",
      products: "getCartProducts",
      total: "cartTotalPrice",
      totalThriftAmount: "cartTotalThriftAmount"
    }),
    visible: {
      get() {
        return this.$store.state.cart.visible;
      },
      set(val) {
        this.$store.state.cart.visible = val;
      }
    }
  },
  methods: {
    ...mapActions("cart", ["showCartList"]),
    togglePopupVisible() {
      if (this.count > 0) {
        this.showCartList();
      }
    },
    buy() {
       this.$router.push({
        path: `/confirm`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.foods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 50px;
  background: rgba(51, 51, 51, 1);
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 9999;
}
.cart-icon {
  // width: 60px;
  // height: 50px;
  width: 31px;
  height: 24px;
  margin-left: 10px;
  margin-right: 12px;
  background: url(../../../assets/index/cart-icon.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  span {
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    font-size: 10px;
    background: rgba(254, 118, 59, 1);
    position: absolute;
    right: -5px;
    top: -5px;
    border-radius: 50%;
    color: #fff;
  }
}
.cart-info {
  width: 200px;
  .cart-info-price {
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }
  .cart-info-desc {
    height: 14px;
    font-size: 10px;
    font-weight: 500;
    color: rgba(212, 212, 212, 1);
    line-height: 14px;
  }
}

.cart-btn-disabled,
.cart-btn {
  width: 100px;
  height: 37px;
  background: rgba(222, 183, 111, 1);
  border-radius: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.cart-btn-disabled {
  background: #4F4F4F;
  color:rgba(169,169,169,1);
  //padding:0 8px;
}

.popup-main {
  padding-bottom: 50px;
  max-height: 280px;
  overflow: auto;
}
.cart-item {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  .cart-item-name {
    width: 200px;
    text-indent: 10px;
    font-size: 14px;
  }
  .cart-item-name {
    //width:40px;
  }
  .cart-item-btnarea {
    width: 90px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 14px !important;

  }
  .cart-item-price {
    font-size: 14px;
  }
}
</style>
