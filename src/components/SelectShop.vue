<template>
  <div class="list">
    <h2 class="list__title">Shops:</h2>
    <div class="list__items">
      <ShopButton
        class="list__item"
        @button-click="() => $store.commit('resetFilteredProducts')"
        >All
      </ShopButton>
      <ShopButton
        class="list__item"
        v-for="company in companies"
        :key="company.id"
        :item-id="company.id"
        @button-click="filterProducts"
        >{{ company.name }}</ShopButton
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['companies']),
  },
  methods: {
    filterProducts(companyId) {
      this.$store.commit('filterProducts', companyId);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 20px 40px;
  min-width: 280px;
  max-width: 400px;

  &__title {
    font-weight: 700;
    font-size: 2em;
    color: #ffffff;
  }
  &__items {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__item {
    margin-bottom: 16px;
  }
}
</style>
