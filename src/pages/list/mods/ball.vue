<template>
  <div class="ball-container">
    <!--小球-->
    <div v-for="ball in getBalls">
      <transition
        name="drop"
        @before-enter="beforeDrop"
        @enter="dropping"
        @after-enter="afterDrop"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ball",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters("cart", {
      getBalls: "getBalls",
      total: "dropBalls"
    })
  },
  methods: {
    ...mapActions("cart", ["deleteBall"]),
    beforeDrop(el) {
      let balls = this.$store.state.cart.balls;
      let count = balls.length;
      while (count--) {
        let ball = balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22); 
          el.style.display = "";
          el.style.webkitTransform = "translateY(" + y + "px)";
          el.style.transform = "translateY(" + y + "px)";
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = "translateX(" + x + "px)";
          inner.style.transform = "translateX(" + x + "px)";
        }
      }
    },
    dropping(el, done) {
      let rf = el.offsetHeight;
      el.style.webkitTransform = "translate3d(0,0,0)";
      el.style.transform = "translate3d(0,0,0)";
      let inner = el.getElementsByClassName("inner-hook")[0];
      inner.style.webkitTransform = "translate3d(0,0,0)";
      inner.style.transform = "translate3d(0,0,0)";
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      this.deleteBall(ball => {
        if (ball) {
          ball.show = false;
          el.style.display = "none";
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  /*贝塞尔曲线*/
}

.inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ddb776;
  transition: all 0.4s linear;
}

.cart {
  position: fixed;
  bottom: 22px;
  left: 32px;
  width: 30px;
  height: 30px;
  background-color: #ddb776;
  color: rgb(255, 255, 255);
}
</style>
