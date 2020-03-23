


const Helpers = {
  getCartList : () => { 
    try {
      return JSON.parse(localStorage.getItem("kfc_cart") || "[]")
    } catch (e) { 
      return '[]'
    }
  },
  saveProductsToStorage: (cartList) => { 
    window.localStorage.setItem("kfc_cart", JSON.stringify(cartList));
  }
}


const state = {
  items: [], //Helpers.getCartList(),
  visible : false,
  balls: [{ show: false }, { show: false }, { show: false }],
  dropBalls: [],
  kfcCart : []
};



// getters
const getters = {

  cartProductsNum: (state, getters) => {
    const cartItem = state.items.find(item => item.productId === product.productId);
    return cartItem ? cartItem.quantity : 0;
  },
  cartProducts: (state, getters, rootState) => {
    return state.items;
  },
  cartTotalCount: (state, getters) => {
    return getters.cartProducts.length;
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.settlePrice * product.quantity;
    }, 0);
  },
  cartTotalThriftAmount: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.thriftAmount * product.quantity;
    }, 0);
  },
  getCartProducts: state => {
    return state.items;
  },
  cartProductsCount: (state,getters) => {
    return getters.cartProducts.length;

    // return getters.cartProducts.reduce((total, product) => {
    //   return total + product.quantity;
    // }, 0);
  },
  dropBalls: state => {
    return state.dropBalls;
  },
  getBalls: state => { 
    return state.balls
  },
  getCartVisible: state => { 
    return state.visible;
  },
};

// actions
const actions = {
  addProductToCart({ state, commit }, product) {
    if (product.productId) {
      const cartItem = state.items.find(item => item.productId === product.productId);
      if (!cartItem) {
        commit("pushProductToCart", {
          productId: product.productId,
          img: product.img,
          settlePrice: product.settlePrice,
          officialPrice: product.officialPrice,
          thriftAmount:product.thriftAmount,
          name: product.name
        });
      } else {
        commit("incrementItemQuantity", cartItem);
      }
    }
    commit("saveProductsToStorage", state.items);
    Helpers.saveProductsToStorage(state.items);
  },
  reduceProductToCart({ state, commit }, product) {
    if (product.productId > 0) {
      const cartItem = state.items.find(item => item.productId === product.productId);
      if (cartItem) {
        commit("reduceItemQuantity", { productId: product.productId, price: product.price });
      }
    }
    Helpers.saveProductsToStorage(state.items);
    commit("saveProductsToStorage", state.items);
  },
  dropBall({ state, commit }, el) { 
    for (let i = 0; i < state.balls.length; i++) {
      let ball = state.balls[i];
      if (!ball.show) {
        ball.show = true;
        ball.el = el;
        state.dropBalls.push(ball);
        return;
      }
    }
  },
  showCartList({ state, commit }) { 
    commit("toggleCartVisible");
  },
  deleteBall({ state, commit }, cb) {
    let ball = state.dropBalls.shift();
    cb(ball)
  }
};

// mutations
const mutations = {
  pushProductToCart(state, { productId, name, thriftAmount, img, settlePrice ,officialPrice }) {
    console.log('name');
    state.items.push({
      productId,
      name,
      img,
      settlePrice,
      thriftAmount,
      officialPrice,
      quantity: 1
    });
  },
  incrementItemQuantity(state, { productId }) {
    const cartItem = state.items.find(item => item.productId === productId);
    cartItem.quantity++;
  },
  reduceItemQuantity(state, { productId }) {
    const cartItem = state.items.find(item => item.productId === productId);
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      state.items = state.items.filter(item => item.productId !== cartItem.productId);
      if (state.items.length == 0) { 
        state.visible = false;
      }
    }
  },
  setCartItems(state, items ) {
    state.items = items;
  },
  clearCartData(state, items) { 
    state.items = [];
    Helpers.saveProductsToStorage([]);
  },
  toggleCartVisible(state) { 
    state.visible = !state.visible;
  },
  saveProductsToStorage(state, arr) { 
    state.kfcCart = arr;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
