import Vue from 'vue';
import VueRouter from 'vue-router';
import SignInMainPage from '../components/MyTest.vue';
var router;
Vue.use(VueRouter);
router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Sign In',
            path: '/sign-in',
            component: SignInMainPage,
        },
    ],
});

export default router;
