import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store';
// import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueLoading from 'vue-loading-overlay';

//Global components
import ShopButton from './components/shared/ShopButton.vue';
import ShopCard from './components/shared/ShopCard.vue';

//Global styles
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/scss/styles.scss';

const app = createApp(App);
app.component('ShopButton', ShopButton).component('ShopCard', ShopCard);

app.use(router);
app.use(store);
app.use(VueLoading);
// app.use(VueGoogleMaps, {
//   load: {
//     key: import.meta.env.VITE_MAP_KEY,
//     libraries: 'places',
//   },
// });

app.mount('#app');
