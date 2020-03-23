import Vue from 'vue'
import App from './App.vue'
import { currency } from './utils/currency'
import "./index.less"
import VueRouter from 'vue-router';
import routes from './router'
import store from './store/index.js'

import { Row, Col, IndexBar, IndexAnchor, Search, Swipe, SwipeItem, NavBar, Grid, GridItem, Image, Toast, RadioGroup, Radio, Cell, CellGroup, Tab, Tabs, Card, Tabbar, Button, Uploader, Progress, TabbarItem, Overlay, Dialog, Icon, Field, Area, Popup, Divider, List } from 'vant';
Vue.use(Row).use(Col).use(IndexBar).use(IndexAnchor).use(Search).use(Swipe).use(SwipeItem).use(NavBar).use(Grid).use(GridItem).use(Image).use(Toast).use(Cell).use(CellGroup).use(RadioGroup).use(Radio).use(Tab).use(Tabs).use(Card).use(Button).use(Uploader).use(Progress).use(Tabbar).use(TabbarItem).use(Overlay).use(Dialog).use(Icon).use(Field).use(Area).use(Popup).use(Divider).use(List);
Vue.config.productionTip = false;
Vue.filter('currency', currency);
Vue.use(VueRouter)



const router = new VueRouter({
  routes
})



new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
