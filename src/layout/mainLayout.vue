<template>
    <v-app id="main-layout">
        <v-navigation-drawer app v-model="drawer">
            <v-list-item to="/">
                <v-list-item-content>
                    <v-list-item-title class="title">ITO System</v-list-item-title>
                    <v-list-item-subtitle class="title">인력관리시스템</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list nav expand dense>
                <v-list-item-group color="primary">
                    <template v-for="treeMenu1 in store.state.app.treeMenuList">
                        <template v-if="treeMenu1.show === 'T'">
                            <template v-if="treeMenu1.depth === 2">
                                <template v-if="treeMenu1.childrenCount > 0">
                            
                                    <v-list-group :group="treeMenu1.path" active-class="v-list-item--active" :key="treeMenu1.path">
                                        <template v-slot:activator>
                                            <v-list-item-icon>
                                                <v-icon>{{ treeMenu1.icon }}</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ treeMenu1.name }}</v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                        <template v-for="treeMenu2 in store.state.app.treeMenuList">
                                            <template v-if="treeMenu2.show === 'T' && treeMenu1.id === treeMenu2.parentId">
                                                <template v-if="treeMenu2.childrenCount > 1">
                                                    <v-list-group :group="treeMenu2.path" sub-group :key="treeMenu2.path">
                                                        <template v-slot:prependIcon>
                                                            <v-icon> </v-icon>
                                                        </template>
                                                        <template v-slot:activator>
                                                            <v-list-item-icon :style="!treeMenu2.icon ? 'display: none;' : ''">
                                                                <v-icon>{{ treeMenu2.icon }}</v-icon>
                                                            </v-list-item-icon>
                                                            <v-list-item-content>
                                                                <v-list-item-title>{{ treeMenu2.name }}</v-list-item-title>
                                                            </v-list-item-content>
                                                        </template>
                                                        <template v-slot:appendIcon>
                                                            <v-icon> mdi-chevron-down </v-icon>
                                                        </template>
                                                        <template v-for="treeMenu3 in store.state.app.treeMenuList">
                                                            <template v-if="treeMenu3.show === 'T' && treeMenu2.id === treeMenu3.parentId">
                                                                <v-list-item :to="treeMenu3.path" :key="treeMenu3.path">
                                                                    <v-list-item-icon>
                                                                        <v-icon>{{ treeMenu3.icon }}</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                        <v-list-item-title>{{ treeMenu3.name }}</v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                            </template>
                                                        </template>
                                                    </v-list-group>
                                                </template>
                                                <template v-else>
                                                    <v-list-item :to="treeMenu2.path" :key="treeMenu2.path">
                                                        <v-list-item-icon>
                                                            <v-icon>{{ treeMenu2.icon }}</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title>{{ treeMenu2.name }}</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </template>
                                        </template>
                                    </v-list-group>
                                </template>
                                <template v-else>
                                    <v-list-item :to="treeMenu1.path" :key="treeMenu1.name">
                                        <v-list-item-icon>
                                            <v-icon>{{ treeMenu1.icon }}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ treeMenu1.name }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </template>
                        </template>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app dense>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-btn depressed>{{ name }}</v-btn>
            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link :to="'/password-change'">
                        <v-list-item-icon>
                            <v-icon>mdi-key</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>비밀번호 변경</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logout()">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>로그아웃</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-main>
            <v-subheader>
                {{ store.state.app.showMenuPathName }}
            </v-subheader>
            <v-fade-transition hide-on-leave>
                <router-view></router-view>
            </v-fade-transition>
        </v-main>
        <v-footer app absolute paddless inset>
            <v-row no-gutters>
                <v-col class="text-center">
                    <span class="text-overline">Copyright {{ new Date().getFullYear() }} © ITO System. All rights reserved.</span>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>
<script>
import store from '@/config/store';
import ito from 'ito';
import _ from 'vue-lodash';
import Vue from 'vue';
export default Vue.extend({
        data: function () {
            return {
                drawer: undefined,
            };
        },
        computed: {
            name: function () {
                var name, user, person;
                name = '';
                user = _.cloneDeep(store.state.app.user);
                person = _.cloneDeep(store.state.app.person);
                if (user && person) {
                    name = person ? person.name : user.username;
                    name += ' 님';
                }
                return name;
            },
        },
        methods: {
            logout: async function () {
                var token;
                token = ito.auth.getToken();
                await ito.auth.logout(token);
                this.$router.replace('/sign-in');
            },
        },
    });
</script>
