import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import home from './modules/home'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

Vue.use(Vuex) //Vue.use是Vuex的插件



export default new Vuex.Store({
  modules: {
    cart,
    home
  },
  plugins: [vuexLocal.plugin]
})

