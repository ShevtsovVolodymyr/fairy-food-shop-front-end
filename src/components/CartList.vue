<template>
  <div class="cart-list flex-wrap d-flex">
    <ShopCard
      class="cart-list__product"
      v-for="(product, index) in cartItems"
      :key="product.id"
      :image="product.image"
      :title="product.name"
      :description="product.description"
      :price="product.price"
      :is-removable="true"
      @on-close="removeProduct(index)"
    >
      <QuantityInput :productIndex="index" />
    </ShopCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuantityInput from './inputs/QuantityInput.vue';

export default {
  components: {
    QuantityInput,
  },
  computed: {
    ...mapGetters(['cartItems']),
  },
  methods: {
    removeProduct(index) {
      this.$store.commit('removeProductFromCart', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  gap: 20px;
  padding: 0 20px;
  align-items: flex-start;

  &__product {
    flex: 0 0 30%;
  }
  &__input {
    margin-top: 16px;
  }
}
</style>
