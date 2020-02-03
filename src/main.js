// Vendors
import Vue from 'vue'
import VueRouter from "vue-router";

// Components
import App from '@/App.vue'
// Router
import routes from '@/router';

Vue.config.productionTip = false;
Vue.use(VueRouter);
const router = new VueRouter({routes});
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
