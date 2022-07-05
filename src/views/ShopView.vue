<template>
  <main class="shop d-flex flex-column">
    <div class="shop__wrapper d-flex vld-parent">
      <SelectShop></SelectShop>
      <ProductsList class="flex-wrap"></ProductsList>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { API } from '../consts/api';
import { mapGetters } from 'vuex';

import SelectShop from '../components/SelectShop.vue';
import ProductsList from '../components/ProductsList.vue';

export default {
  components: { SelectShop, ProductsList },
  computed: {
    ...mapGetters(['storeIsLoaded']),
  },
  mounted() {
    if (!this.storeIsLoaded) {
      const loader = this.$loading.show();
      const store = this.$store;

      axios
        .get(`${API}companies`)
        .then(response => store.commit('addCompanies', response.data.companies))
        .catch(err => console.log(err));
      axios
        .get(`${API}products`)
        .then(response => {
          store.commit('addProducts', response.data.products);
          loader.hide();
        })
        .catch(err => console.log(err));
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
}
</style>
