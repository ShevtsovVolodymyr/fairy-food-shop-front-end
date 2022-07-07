export default {
  beforeMount() {
    const vm = this;
    this.$store.commit('addCart', this.getCartFromStorage());
    window.addEventListener('beforeunload', () => {
      vm.saveToStorage(vm.$store.getters.cartItems);
    });
    console.log(vm.$store.getters.cartItems);
  },
  methods: {
    saveToStorage(item) {
      window.localStorage.setItem('cart', JSON.stringify(item));
    },
    clearStorage() {
      window.localStorage.clear();
    },
    getCartFromStorage() {
      const cart = window.localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    },
  },
};
