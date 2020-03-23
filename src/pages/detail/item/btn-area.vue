<template>
  <div class="btn-area">
    <div class="btn-reduce" @click.stop="reduceItem" v-if="true"></div>
    <div class="cart-num"></div>
    <div class="btn-add" @click.stop="addItem"></div>
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
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      addGoods: "addGoods"
    }),
    addItem() {
      let goods = this.item;
      goods.num = 1;
      console.log("addItem", goods);
      if(goods.id) {
      this.addGoods(goods);
      }
    },
    reduceItem() {
      console.log("reduceItem");
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>
