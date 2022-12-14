import Vue from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2)

Vue.config.productionTip = false;

export const EventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app');


