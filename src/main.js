import Vue from 'vue';
import vuex from 'vuex';
import App from './App.vue';
import {store} from '@/config/store'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false;
Vue.use(vuex);
new Vue({
  vuetify,
  store: store,
    render: (h) => h(App),
}).$mount('#app');
