<template>
  <div class="form vld-parent">
    <form action="" novalidate @submit.prevent="submit">
      <div class="form-group">
        <label for="name"> Name*:</label>
        <input
          v-model="name"
          @blur="v$.name.$touch"
          id="name"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': v$.name.$error,
            'is-valid': !v$.name.$error && v$.name.$dirty,
          }"
          placeholder="Name"
        />
        <div v-if="v$.name.$error" class="invalid-feedback">
          {{ v$.name.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <label for="email"> Email*:</label>
        <input
          v-model="email"
          @blur="v$.email.$touch"
          id="email"
          type="email"
          class="form-control"
          placeholder="Email"
          :class="{
            'is-invalid': v$.email.$error,
            'is-valid': !v$.email.$error && v$.email.$dirty,
          }"
        />
        <div v-if="v$.email.$error" class="invalid-feedback">
          {{ v$.email.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <label for="address"> Address*:</label>
        <input
          v-model="address"
          @blur="emitAddress"
          id="address"
          type="text"
          class="form-control"
          placeholder="Address"
          :class="{
            'is-invalid': v$.address.$error,
            'is-valid': !v$.address.$error && v$.address.$dirty,
          }"
        />
        <div v-if="v$.address.$error" class="invalid-feedback">
          {{ v$.address.$errors[0].$message }}
        </div>
      </div>
      <div class="form-group">
        <label for="phone"> Phone*:</label>
        <input
          v-model="phone"
          @blur="v$.phone.$touch"
          id="phone"
          type="text"
          class="form-control"
          placeholder="Phone"
          :class="{
            'is-invalid': v$.phone.$error,
            'is-valid': !v$.phone.$error && v$.phone.$dirty,
          }"
        />
        <div v-if="v$.phone.$error" class="invalid-feedback">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>
      <button class="button" type="submit" :disabled="v$.$invalid || isLoading">
        Submit Order
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  minLength,
  alpha,
  helpers,
  numeric,
  maxLength,
} from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: '',
      email: '',
      address: '',
      phone: '',
    };
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    externalAddress: {
      type: String,
      default: '',
    },
  },
  watch: {
    externalAddress(newAddress, oldAddress) {
      if (newAddress != oldAddress) {
        this.address = newAddress;
        this.v$.address.$touch();
      }
    },
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage('Name cannot be empty', required),
        minLength: helpers.withMessage(
          'Name must be at least 3 characters',
          minLength(3)
        ),
        alpha: helpers.withMessage(
          'Name must contain english letters only',
          alpha
        ),
      },
      address: {
        required: helpers.withMessage('Address cannot be empty', required),
        minLength: helpers.withMessage(
          'Address must be at least 5 characters',
          minLength(5)
        ),
      },
      email: {
        required: helpers.withMessage('Email cannot be empty', required),
        email: helpers.withMessage('Email is not correct', email),
      },
      phone: {
        required: helpers.withMessage('Phone cannot be empty', required),
        numeric: helpers.withMessage(
          'Phone must contain numbers only',
          numeric
        ),
        minLength: helpers.withMessage(
          'Pone must be 10 characters',
          minLength(10)
        ),
        maxLength: helpers.withMessage(
          'Pone must be 10 characters',
          maxLength(10)
        ),
      },
    };
  },
  methods: {
    submit() {
      const customerData = {
        name: this.name,
        email: this.email,
        address: this.address,
        phone: this.phone,
      };
      !this.v$.$invalid && this.$emit('onSubmit', customerData);
    },
    emitAddress() {
      this.v$.address.$touch;
      this.$emit('onAddressEntered', this.address);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  min-width: 300px;
  padding: 20px 40px;
  background: #ffffff;
  border-radius: 5px;
}
</style>
