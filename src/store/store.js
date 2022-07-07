import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      companies: null,
      allProducts: null,
      displayedProducts: null,
      cart: [],
    };
  },
  mutations: {
    addCompanies(state, payload) {
      state.companies = payload;
    },
    addProducts(state, payload) {
      state.allProducts = payload;
      state.displayedProducts = state.allProducts;
    },
    filterProducts(state, companyId) {
      state.displayedProducts = state.allProducts.filter(
        product => product.company === companyId
      );
    },
    resetFilteredProducts(state) {
      state.displayedProducts = state.allProducts;
    },
    addCart(state, cart) {
      state.cart = cart;
    },
    addProductToCart(state, productId) {
      const newProduct = state.allProducts.find(
        product => product.id === productId
      );
      newProduct.quantity = 1;
      state.cart.push(newProduct);
    },
    removeProductFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    setProductQuantity(state, options) {
      const { index, newQuantity } = options;
      state.cart[index].quantity = newQuantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  getters: {
    companies(state) {
      return state.companies;
    },
    products(state) {
      return state.displayedProducts;
    },
    storeIsLoaded(state) {
      return state.allProducts && state.companies;
    },
    cartItems(state) {
      return state.cart;
    },
    //Added due to Vuex issue with history API https://forum.vuejs.org/t/vuex-state-data-change-after-route-change/6562/10
    productIsInCart: state => id => {
      return state.cart.some(product => product.id === id);
    },
    totalCost(state) {
      if (state.cart.length) {
        return state.cart.reduce((accumulator, currentProduct) => {
          return accumulator + currentProduct.price * currentProduct.quantity;
        }, 0);
      }
      return null;
    },
  },
});
