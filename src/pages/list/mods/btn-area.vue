<template>
  <div class="btn-area-wrap">
    <div class="btn-area">
      <div
        :class="[productCount > 0 ? 'btn-reduce' : 'btn-reduce-disabled']"
        @click.stop="reduceProductToCart(item)"
      ></div>
      <div class="cart-num" v-if="productCount > 0">{{ productCount }}</div>
      <div class="btn-add" @click.stop="add(item, $event.target)"></div>
    </div>
    <van-popup v-model="show" :round="true" :closeable="true">
      <div class="item-popup">
        <div class="item-popup-hd">九龙金玉珍珠奶茶</div>
        <div class="item-popup-bd">
          <div class="item-popup-subtitle">规格</div>
          <div class="item-popup-bd-main">
            <div class="item-popup-sku">冷</div>
            <div class="item-popup-sku">热</div>
          </div>
        </div>
        <div class="item-popup-ft">
          <div class="item-popup-price">¥35.50</div>
          <div class="item-popup-btn">加入购物车</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "btn-area",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    showBall: {
      type: Boolean
    },
    drop: {
      type: Function
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    productCount() {
      return this.showProductQuantity(this.item.productId);
    }
  },
  methods: {
    ...mapActions("cart", [
      "addProductToCart",
      "reduceProductToCart",
      "dropBall"
    ]),
    showProductQuantity(productId) {
      let cart = this.$store.state.cart;
      const product = cart.items.find(product => product.productId === productId);
      return product ? product.quantity : "";
    },
    add(item, el) {
      if(item && item.productId) {
        this.addProductToCart(item);
        if(this.showBall) {
          this.dropBall(el);
        }
      }

      //this.showPopup();
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>
<style lang="less" scoped>
.btn-area-wrap {
  width: 100%;
}
.btn-area {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  .btn-reduce {
    background: url(../../../assets/index/btn-reduce.png) no-repeat;
    background-size: 100% auto;
    width: 22px;
    height: 22px;
  }
  .btn-reduce-disabled {
    background: none;
  }
  .cart-num {
    max-width: 86px;
    text-align: center;
  }
  .btn-add {
    background: url(../../../assets/index/btn-add.png) no-repeat;
    background-size: 100% auto;
    width: 22px;
    height: 22px;
  }
}
.item-popup {
  width: 300px;
  min-height: 130px;
  box-sizing: border-box;
  padding: 12px;

  .item-popup-hd {
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .item-popup-bd {
    min-height: 100px;
    padding: 0 25px;
    .item-popup-subtitle {
      color: #999;
      font-size: 12px;
    }
    .item-popup-bd-main {
      justify-content: center;
      padding-top: 10px;
    }
    .item-popup-sku {
      border:1px solid #ddb674;
      border-radius: 6px;
      padding:2px 8px;
      display: inline;
      margin-right: 10px;
      color:#666;
    }
  }

  .item-popup-ft {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .item-popup-price {
    color: #ff4400;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    text-indent: 12px;
  }
  .item-popup-btn {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    background-color: #ddb674;
    border-radius: 18px;
    padding: 5px 14px;
    color: #fff;
    font-size: 12px;
  }
}
.van-popup--round {
  border-radius: 8px;
}
</style>
