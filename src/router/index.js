import { createRouter, createWebHistory } from 'vue-router';
import ShopView from '../views/ShopView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import('../views/ShoppingCartView.vue'),
      meta: { transition: 'slide-right' },
    },
  ],
});

export default router;
