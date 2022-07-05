<template>
  <main class="cart d-flex flex-column">
    <div class="cart__wrapper d-flex">
      <div class="vld-parent" v-if="!orderIsSubmitted">
        <CustomMap
          @on-get-address="
            newAddress => {
              externalAddress = newAddress;
            }
          "
          :address="userEnteredAddress"
          :shop-locations="shopsInCartLocations"
        />
        <CartForm
          class="cart__form"
          @on-submit="createOrder"
          @on-address-entered="
            newAddress => {
              userEnteredAddress = newAddress;
            }
          "
          :is-loading="orderIsLoading"
          :external-address="externalAddress"
        />
      </div>
      <p v-if="orderIsSubmitted" class="cart__feedback">Thank you!</p>
      <CartList class="cart__list"></CartList>
    </div>
    <footer class="cart__footer">
      <p class="cart__total">
        Total Cost: <span class="card__total-val">{{ totalCost || 0 }}</span>
      </p>
    </footer>
  </main>
</template>

<script>
import axios from 'axios';
import { API } from '../consts/api';
import { mapGetters } from 'vuex';

import CartForm from '../components/CartForm.vue';
import CartList from '../components/CartList.vue';
import CustomMap from '../components/CustomMap.vue';

export default {
  components: {
    CartForm,
    CartList,
    CustomMap,
  },
  data() {
    return {
      userEnteredAddress: '',
      externalAddress: '',
      shopsInCartLocations: [],
      orderIsLoading: false,
      orderIsSubmitted: false,
    };
  },
  mounted() {
    this.createShopLocations();
  },
  computed: {
    ...mapGetters(['totalCost', 'cartItems', 'companies']),
  },
  watch: {
    cartItems: {
      handler() {
        this.createShopLocations();
      },
      deep: true,
    },
  },
  methods: {
    createOrder(customerData) {
      const loader = this.$loading.show();
      const newOrder = {
        ...customerData,
        orders: this.cartItems.map(item => {
          return { product: item.id, quantity: item.quantity };
        }),
      };

      this.orderIsLoading = true;
      axios
        .post(`${API}orders`, newOrder, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          this.$store.commit('clearCart');
          this.orderIsLoading = false;
          loader.hide();
          this.orderIsSubmitted = true;
          setTimeout(() => (this.orderIsSubmitted = false), 3000);
        })
        .catch(err => console.log(err));
    },
    createShopLocations() {
      const locations = [];
      const uniqCompanyId = new Set();
      this.cartItems.forEach(item => uniqCompanyId.add(item.company));
      uniqCompanyId.forEach(companyId => {
        const company = this.companies.find(
          comapany => comapany.id === companyId
        );
        company && locations.push(company.location);
      });
      this.shopsInCartLocations = locations;
    },
  },
};
</script>
<style lang="scss" scoped>
.cart {
  &__list {
    padding-bottom: 20px;
  }

  &__footer {
    height: 200px;
    margin: auto -20px 0;
    padding: 20px;
    background: #ffffff;
  }

  &__total,
  &__value {
    font-size: 1.2em;
  }

  &__total {
    font-weight: 700;
    background: #ffffff;
  }

  &__feedback {
    margin: 30% auto auto;
    padding: 40px;
    color: green;
    font-size: 2em;
    font-weight: 700;
    background: #ffffff;
    border-radius: 10px;
  }
}
</style>
