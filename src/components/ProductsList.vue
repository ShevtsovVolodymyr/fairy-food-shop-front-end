<template>
  <div class="products-list">
    <ShopCard
      class="products-list__product"
      v-for="product in products"
      :key="product.id"
      :image="product.image"
      :title="product.name"
      :description="product.description"
      :price="product.price"
    >
      <ShopButton
        :disabled="productIsInCart(product.id)"
        class="card__button"
        :item-id="product.id"
        @button-click="addToCart"
        >{{
          productIsInCart(product.id) ? 'Added to cart' : 'Add to Cart'
        }}</ShopButton
      >
    </ShopCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['products', , 'productIsInCart']),
  },
  methods: {
    addToCart(productId) {
      if (!this.productIsInCart(productId)) {
        this.$store.commit('addProductToCart', productId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.products-list {
  display: flex;
  gap: 20px;

  &__product {
    flex: 0 0 30%;
  }
}
</style>
