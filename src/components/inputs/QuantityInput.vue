<template>
  <div class="form-group cart-list__input">
    <label for="input"><b>Quantity:</b></label>
    <input
      id="input"
      type="number"
      class="form-control"
      min="1"
      v-model="quantity"
    />
  </div>
</template>

<script>
export default {
  props: {
    productIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    quantity: {
      get() {
        return this.$store.state.cart[this.productIndex].quantity;
      },
      set(value) {
        this.$store.commit('setProductQuantity', {
          index: this.productIndex,
          newQuantity: +value,
        });
      },
    },
  },
};
</script>
