<template>
  <header class="header">
    <router-link class="button button--inverse" to="/">Shop</router-link>
    <router-link class="button button--inverse" to="/shopping-cart"
      >Shopping cart</router-link
    >
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 8px 16px;
  background: #ffffff;
  box-shadow: 0 4px 2px -2px gray;
}
</style>
