<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    // localStorage.setItem("token", '')

    window.dsBridge.call(
      "async.setTitleBarRight",
      {
        text: "我的订单",
        textColor: "#000000"
      },
      () => {
        window.dsBridge.call("async.pushPage", {
          url: `zhimajx://kfcOrder`
        });
      }
    );
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 3.75rem;
}
.head-token {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  color: #fff;
  background: #f00;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  width: 100%;
}
</style>
