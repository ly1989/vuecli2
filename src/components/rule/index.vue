<template>
  <div class="module-rule">
    <a href="#/rule"></a>
  </div>
</template>

<script>
export default { 
  name: "my",
  data() {
    return {
      active: 0,
    };
  }
};
</script>

<style lang="less" scoped>
  .module-rule {
    margin: 0.2rem auto 0;
    height: 3.39rem;
    width: 3.38rem;
    background: url(https://static.zmjx.com/fe/images/FE/free-charge/rule.png) #2173f7;
    background-size:100% 100%;
    position: relative; 
    a { 
      position: absolute; 
      bottom: 0.05rem;
      left: 1.3rem;
      // background: rgba(0, 0, 0, 0.3);
      height:0.3rem;
      width: 0.8rem;
    }
  }
</style>
