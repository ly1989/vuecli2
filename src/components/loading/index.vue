<template>
    <div class="posLoading" v-if="loading"><van-loading type="spinner"/></div>
</template>

<script>
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);
export default {
  name: "loading",
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.posLoading{
  position: absolute;
  top: 30%;
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
</style>
