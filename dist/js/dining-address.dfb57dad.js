(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dining-address"],{"1bf5":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".container .van-grid-item__content{padding:.1rem .08rem}.container .van-index-anchor{font-size:.13rem;font-weight:400;color:#999;padding:.1rem .16rem 0}",""])},"1ecb":function(t,e,n){"use strict";var r=n("bc9a"),i=n.n(r);i.a},"6bef":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-search",{staticClass:"search-input",attrs:{placeholder:"请输入城市名",shape:"round"},on:{input:t.onSearch},model:{value:t.keyWord,callback:function(e){t.keyWord=e},expression:"keyWord"}},[n("van-icon",{attrs:{slot:"left-icon",size:"0.2rem",name:"search",color:"#ABABAB"},slot:"left-icon"})],1),t.keyWord?n("div",t._l(t.searchCities,(function(e){return n("van-cell",{key:e.districtId,attrs:{title:e.city},on:{click:function(){return t.chooseCity(e)}}})})),1):n("div",{staticClass:"container"},[n("div",{staticClass:"area"},[n("van-index-anchor",{attrs:{index:"当前城市"}},[t._v("当前城市")]),n("van-grid",{attrs:{"column-num":3,gutter:10}},[n("van-grid-item",{attrs:{text:t.currentCity.city},on:{click:function(){return t.chooseCity(t.currentCity)}}})],1)],1),n("div",{staticClass:"hotCity"},[n("van-index-anchor",{attrs:{index:"热门城市",id:"热"}},[t._v("热门城市")]),n("van-grid",{attrs:{"column-num":3,gutter:10}},t._l(t.hotCity,(function(e,r){return n("van-grid-item",{key:r,attrs:{text:e.city},on:{click:function(){return t.chooseCity(e)}}})})),1)],1),n("div",{staticClass:"list"},t._l(t.cities,(function(e){return n("div",{key:e.cityHead,ref:e.cityHead,refInFor:!0},[n("van-index-anchor",{attrs:{index:e.cityHead,id:e.cityHead}},[t._v(t._s(e.cityHead))]),t._l(e.kfcAreas,(function(e){return n("van-cell",{key:e.districtId,attrs:{title:e.city},on:{click:function(){return t.chooseCity(e)}}})}))],2)})),0),n("city-alphabet",{on:{change:t.changeSort}})],1)],1)},i=[],a=(n("3b2b"),n("28a5"),n("2f62")),o=n("8641"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{ref:"alpha",staticClass:"list",on:{touchstart:function(e){return e.stopPropagation(),e.preventDefault(),t.handleTouchStart(e)},touchmove:function(e){return e.stopPropagation(),e.preventDefault(),t.handleTouchMove(e)},touchend:function(e){return e.stopPropagation(),e.preventDefault(),t.handleTouchEnd(e)}}},t._l(t.letters,(function(e){return n("li",{key:e,staticClass:"item",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.handleLetterClick(e)}}},[t._v(t._s(e))])})),0)},s=[],l="热ABCDEFGHIJKLMNOPQRSTUVWXYZ",u={name:"Alphabet",data:function(){return{letters:l.split(""),touchStatus:!1,startY:0,barHeight:0,currentIndex:0}},methods:{handleLetterClick:function(t){this.$emit("change",t.target.innerText)},handleTouchStart:function(t){this.$emit("change",t.target.innerText),this.touchStatus=!0,this.startY=this.$refs["alpha"].offsetTop,this.barHeight=this.$refs["alpha"].offsetHeight/this.letters.length},handleTouchMove:function(t){var e=this;this.touchStatus&&this.$nextTick((function(){var n=t.touches[0].clientY,r=Math.floor((n-e.startY)/e.barHeight);r>=0&&r<e.letters.length&&e.currentIndex!==r&&(e.currentIndex=r,e.$emit("change",e.letters[r]))}))},handleTouchEnd:function(){this.touchStatus=!1}}},d=u,f=(n("1ecb"),n("2877")),h=Object(f["a"])(d,c,s,!1,null,"2c865d92",null),p=h.exports,m={components:{CityAlphabet:p},data:function(){return{keyWord:"",searchCities:[],hotCity:[],cities:[]}},created:function(){window.document.title="地区选择"},mounted:function(){var t=this;o["a"].areaList().then((function(e){if(e.status){var n=e.entry||[];t.cities=n}else t.$toast(e.message)})),o["a"].hotAreaList().then((function(e){if(e.status){var n=e.entry||[];t.hotCity=n}else t.$toast(e.message)}))},computed:Object(a["d"])({currentCity:function(t){return t.home.locCity}}),methods:{chooseCity:function(t){this.$store.commit("home/selCity",t),this.$router.push({path:"/"})},changeSort:function(t,e){if(t){var n=document.getElementById(t);n&&n.scrollIntoView({block:e||"start",behavior:"smooth"})}},onSearch:function(t){if(this.keyWord=t,t.length>0){var e=t.split(""),n=e.reduce((function(t,e,n){return t.push(e,"\\S*"),t}),["\\S*"]),r=new RegExp(n.join("")),i=this.cities.map((function(t){var e=t.kfcAreas||[];return e.filter((function(t){return r.test(t.city)}))}));this.searchCities=i.flat(),console.log("结果",this.searchCities)}else this.searchCities=[]}}},v=m,g=(n("9da3"),n("94f6"),Object(f["a"])(v,r,i,!1,null,"113f659c",null));e["default"]=g.exports},"6e3b":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".list[data-v-2c865d92]{flex-direction:column;position:fixed;right:0;top:1rem;bottom:1rem;width:.3rem;list-style:none;z-index:999}.list[data-v-2c865d92],.list .item[data-v-2c865d92]{display:flex;justify-content:center;align-items:center}.list .item[data-v-2c865d92]{flex:1;color:#ababab;font-size:.14rem;font-weight:400;text-align:center;width:100%}",""])},8641:function(t,e,n){"use strict";n("96cf");var r=n("3b8d"),i=(n("ac6a"),n("456d"),n("1b69")),a={areaList:"item-center/app/kfc/area/list",hotAreaList:"item-center/app/kfc/hot/area/list",restaurantList:"item-center/app/kfc/restaurant/list",location:"item-center/app/kfc/location"},o={},c={};Object.keys(a).map((function(t){c[t]=function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return"",r=a[t],e.next=4,Object(i["a"])({url:r,params:n});case 4:return o=e.sent,console.log(t,o),e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()})),Object.keys(o).map((function(t){c[t]=function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return"",r=o[t],e.next=4,Object(i["a"])({url:r,data:n,method:"POST"});case 4:return a=e.sent,console.log(t,a),e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()})),c.getpacketDetail=function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["a"])({url:a.getParentPacketDetail+e});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),c.getHelps=function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["a"])({url:a.getHelps+e,params:{pageNo:1,pageSize:3}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e["a"]=c},"94f6":function(t,e,n){"use strict";var r=n("9aae"),i=n.n(r);i.a},"9aae":function(t,e,n){var r=n("bc3c");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("499e").default;i("76a41346",r,!0,{sourceMap:!1,shadowMode:!1})},"9da3":function(t,e,n){"use strict";var r=n("e090"),i=n.n(r);i.a},bc3c:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'.container[data-v-113f659c]{background:#f5f5f5}.hot-top[data-v-113f659c]{font-size:.26rem;font-weight:600;color:#212121;padding:.15rem}.hot-bottom[data-v-113f659c]{background:#fff;font-size:.25rem;position:relative;overflow:hidden}.hot-bottom[data-v-113f659c]:before{content:"";position:absolute;height:100%;width:33.33333%;left:33.33333%;border-left:.02rem solid #ddd;border-right:.02rem solid #ddd}.hot-item[data-v-113f659c]{color:#212121;width:33.33333%;height:.9rem;line-height:.9rem;text-align:center;float:left;border-bottom:.02rem solid #ddd;position:relative}.right-nav[data-v-113f659c]{position:fixed;z-index:1;right:0;top:1rem;bottom:1rem;display:flex;flex-direction:column}.right-nav .item[data-v-113f659c]{flex:1;text-align:center;font-size:.14rem;color:#fa8919;width:.5rem}.sort-top[data-v-113f659c]{font-size:.26rem;font-weight:600;color:#212121;padding:.15rem}.sort-bottom[data-v-113f659c]{background:#fff;font-size:.23rem;height:3.6rem}.sort-item[data-v-113f659c]{color:#212121;width:16.66666%;height:.9rem;line-height:.9rem;text-align:center;float:left}.list-top[data-v-113f659c]{font-size:.26rem;font-weight:600;color:#212121;padding:.15rem}.list-bottom[data-v-113f659c]{background:#fff;font-size:.25rem;position:relative;overflow:hidden}.list-bottom[data-v-113f659c]:before{left:25%;border-right:.02rem solid #ddd}.list-bottom[data-v-113f659c]:after,.list-bottom[data-v-113f659c]:before{content:"";position:absolute;height:100%;width:25%;border-left:.02rem solid #ddd}.list-bottom[data-v-113f659c]:after{left:75%}.list-item[data-v-113f659c]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#212121;width:25%;height:.9rem;line-height:.9rem;text-align:center;float:left;border-bottom:.02rem solid #ddd}',""])},bc9a:function(t,e,n){var r=n("6e3b");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("499e").default;i("2e53df06",r,!0,{sourceMap:!1,shadowMode:!1})},e090:function(t,e,n){var r=n("1bf5");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("499e").default;i("7b903518",r,!0,{sourceMap:!1,shadowMode:!1})}}]);