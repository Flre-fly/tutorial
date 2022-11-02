<template>
    <v-main>
        <v-container class="fill-height">
            <v-row>
                <v-col align="center">
                    <v-card max-width="400">
                        <v-card-title>인력관리시스템 로그인</v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    autocomplete="on"
                                    label="아이디"
                                    type="text"
                                    v-model="data.username"
                                    @keydown.enter="login()"
                                ></v-text-field>
                                <v-text-field
                                    autocomplete="on"
                                    label="비밀번호"
                                    type="password"
                                    v-model="data.password"
                                    @keydown.enter="login()"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="secondary" to="/sign-up">회원 가입</v-btn>
                            <v-btn color="primary" :loading="btn.signIn.loading" @click="login()">로그인</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
import Vue from 'vue';
import ito from 'ito';
export default Vue.extend({
        data: function () {
            return {
                data: {
                    username: null,
                    password: null,
                },
                btn: {
                    signIn: {
                        loading: false,
                    },
                },
            };
        },
        methods: {
            /* 로그인 */
            login: async function () {
                this.btn.signIn.loading = true;
                if (!this.data.username) {
                    alert('아이디를 입력해주세요.');
                } else if (!this.data.password) {
                    alert('비밀번호를 입력해주세요.');
                } else {
                    try {
                        let from = this.$route.query.from,
                            role = '&role=' + this.$route.query.role,
                            path = from + role;

                        await ito.auth.login(this.data.username, this.data.password);
                        if (from !== undefined && from !== null && from !== '') {
                            this.$router.replace(path);
                        } else {
                            this.$router.replace('/');
                        }
                    } catch (e) {
                        alert(e.response.data.message);
                    }
                }
                this.btn.signIn.loading = false;
            },
        },
    });
</script>
