import Vue from 'vue';
import VueRouter from 'vue-router';
import SignInMainPage from '../sign-in/SignInMainPage.vue';
import BlankLayout from '@/layout/BlankLayout.vue'
import SignUpMainPage from '@/sign-up/SignUpMainPage.vue'

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Blank',
            component: BlankLayout,
            path: '/blank',
            children: [
                {
                    name: 'Sign In',
                    path: '/sign-in',
                    component: SignInMainPage,
                },
                {
                    name: 'Sign Up',
                    path: '/sign-up',
                    component: SignUpMainPage,
                },
            ],
        },
    ],
});

export default router;
