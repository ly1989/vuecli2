<template>
  <div class="no-data">
    <img
      src="https://static.zmjx.com/zmjx/2019/12/201912111137513832035.png"
      class="image_no_data"
    />
    <div>暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "noData"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.no-data {
  color: #666;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  font-size: 13px;
  .image_no_data {
    width: 88px;
    height: 99px;
    margin-bottom: 20rpx;
  }
}
</style>
