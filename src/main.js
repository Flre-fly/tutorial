import { store } from '@/config/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import vuex from 'vuex';
import App from './App.vue';
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false;
Vue.use(vuex);
new Vue({
    vuetify,
    VueRouter,
    store: store,
    render: (h) => h(App),
}).$mount('#app');
