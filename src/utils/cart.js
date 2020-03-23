

const addCart = function(payload) {
   
};

const reduceCart = function(payload) {
  
};

const getCartCount = function() {
    return window.GlobalCart && window.GlobalCart.getCount();
};

const getCartData = function() {
    return (window.GlobalCart && window.GlobalCart.getCartData()) || {};
};

const saveCartData = function(data) {
    return (window.GlobalCart && window.GlobalCart.saveCartData(data)) || {};
};

export {
    addCart,
    reduceCart,
    updateCart,
    getCartCount,
    getCartData,
    saveCartData
};
