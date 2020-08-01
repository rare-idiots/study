import VueCompositionApi from '@vue/composition-api';
import Vue from "vue";
Vue.use(VueCompositionApi);

import App from "./App.vue";

Vue.config.productionTip = false;


import router from "./router";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");


