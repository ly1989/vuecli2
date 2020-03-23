

//定义一个默认城市为 杭州
const state = {
  //state用来存放需要用到的变量
  latitude: '40.2874',
  longitude: '116.0108',
  locCity: { city: "北京", districtId: 110000 },
  selCity: { city: "北京", districtId: 110000, isLoc: false },
  selDiningRoom: {
    // storeId: 100700
    // name: "临平万悦店KFC"
    // address: "余杭区临平运河街道东湖北路万悦城"
    // province: "浙江省"
    // city: "杭州市"
    // distance: null
  },
}

const mutations = {
  selCity(state, payload) {
    state.selCity = payload;
  },
  selDiningRoom(state, payload) {
    state.selDiningRoom = payload;
  },
  saveLocationCity(state, payload) {
    console.log("...save...", state.selCity, payload)
    if (state.selCity.isLoc === false) {
      state.selCity = payload;
    }
    state.locCity = payload;
  },
  saveLocation(state, payload) {
    state.latitude = payload.latitude;
    state.longitude = payload.longitude;
  }
}


export default {
  namespaced: true,
  state,
  mutations,

}

