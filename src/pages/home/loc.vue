<template>
  <div></div>
</template>

<script>
import { getLocation } from "@/utils";
import EventBus from "@/utils/eventBus";
import api from "@/apis/home";

export default {
  mounted() {
    getLocation().then(loc => {
      if (loc) {
        this.$store.commit("home/saveLocation", loc);
        api.location(loc).then(res => {
          if (res.status) {
            let entry = res.entry || {};
            this.$store.commit("home/saveLocationCity", {
              ...entry,
              ...loc
            });
            EventBus.$emit("locOk");
          } else {
            this.$toast(res.message);
          }
          // debugger;

          this.$router.replace({
            path: "/index"
          });
        });
      }
    });
  }
};
</script>

<style>
</style>