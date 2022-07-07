<template>
  <Header />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import localStorage from './mixins/localStorage';

export default {
  components: {
    RouterView,
    Header,
  },
  mixins: [localStorage],
};
</script>
