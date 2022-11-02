import store from '@/config/store';
import ito from 'ito';
import _ from 'lodash';
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
/* beforeEach */
router.beforeEach(async function (to, from, next) {
    var token, treeMenuList, treeMenu, regex, authenticated, mainTitle, subTitle, title, titlePath, i;
    mainTitle = 'ITO';
    regex = to.matched.length > 0 ? to.matched[to.matched.length - 1].regex : null;

    token = ito.auth.getToken();
    if (await ito.auth.authenticated(token)) {
        if (!store.state.app.token) {
            ito.auth.authorize(token);
        }
        treeMenuList = store.state.app.treeMenuList;
        authenticated = false;

        for (i = 0; i < treeMenuList.length; i++) {
            treeMenu = treeMenuList[i];
            if (regex && regex.test(treeMenu.path)) {
                authenticated = true;
                break;
            }
        }
        titlePath = [];
        for (i = 0; i < treeMenuList.length; i++) {
            treeMenu = treeMenuList[i];
            if (new RegExp(treeMenu.path + '.*', 'g').test(to.path)) {
                titlePath.push(treeMenu.name);
            }
        }
        store.state.app.showMenuPathName = titlePath.join(' > ');
        titlePath = titlePath.reverse();
        title = titlePath.join(' < ');

        if (authenticated) {
            document.title = title;
            next();
        } else {
            next('/');
        }
    } else {
        subTitle = '로그인';
        titlePath = [subTitle, mainTitle];
        title = titlePath.join(' < ');
        document.title = title;
        ito.auth.unauthorize();
        if (to.path === '/sign-in' || to.path === '/sign-up') {
            next();
        } else {
            if (_.isEmpty(to.query)) {
                next('/sign-in');
            } else {
                next('/sign-in?from=' + to.fullPath);
            }
        }
    }
});

export default router;
