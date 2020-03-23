<template>
  <ul
    class="list"
    ref="alpha"
    @touchstart.stop.prevent="handleTouchStart"
    @touchmove.stop.prevent="handleTouchMove"
    @touchend.stop.prevent="handleTouchEnd"
  >
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      @click.stop.prevent="handleLetterClick"
    >{{item}}</li>
  </ul>
</template>

<script>
const letters = "热ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export default {
  name: "Alphabet",
  data() {
    return {
      letters: letters.split(""),
      touchStatus: false,
      startY: 0,
      barHeight: 0,
      currentIndex: 0
    };
  },
  methods: {
    handleLetterClick(e) {
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart(e) {
      this.$emit("change", e.target.innerText);
      this.touchStatus = true;
      this.startY = this.$refs["alpha"].offsetTop;
      this.barHeight = this.$refs["alpha"].offsetHeight / this.letters.length;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        this.$nextTick(() => {
          // A字母距离滚动条顶部距离
          const touchY = e.touches[0].clientY;
          const index = Math.floor((touchY - this.startY) / this.barHeight);
          if (index >= 0 && index < this.letters.length) {
            if (this.currentIndex !== index) {
              this.currentIndex = index;
              this.$emit("change", this.letters[index]);
            }
          }
        });
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  top: 1rem;
  bottom: 1rem;
  width: 30px;
  list-style: none;
  z-index: 999;

  .item {
    flex: 1;
    color: rgba(171, 171, 171, 1);
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    width: 100%;
    // background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>