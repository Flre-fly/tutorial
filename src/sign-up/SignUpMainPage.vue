<template>
    <v-main>
        <v-container class="fill-height">
            <v-row>
                <v-col align="center">
                    <v-card max-width="800">
                        <v-card-title>인력관리시스템 회원가입</v-card-title>
                        <v-card-text>
                            <v-stepper v-model="stepper.complete">
                                <v-stepper-header>
                                    <v-stepper-step
                                        v-for="(category, i) in stepper.category"
                                        :key="`${category}-step`"
                                        :complete="stepper.complete > i + 1"
                                        :step="i + 1"
                                        >{{ category }}
                                    <v-divider v-if="i !== stepper.category.length - 1"></v-divider>      
                                        </v-stepper-step>
                                  
                                </v-stepper-header>
                                <v-stepper-items>
                                    <v-stepper-content :key="`${stepper.category[0]}-content`" :step="1">
                                        {{ 1 }}
                                        <v-row dense>
                                            <v-col cols="12" class="text-right">
                                                <v-btn color="primary" @click="nextStep(1)">다음</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-content>
                                    <v-stepper-content :key="`${stepper.category[1]}-content`" :step="2">
                                        <v-row dense>
                                            <v-col>
                                                <signUpMainJoinFragment
                                                    ref="userForm"
                                                    @update:person="
                                                        (e) => {
                                                            data.person = e;
                                                        }
                                                    "
                                                    @update:user="
                                                        (e) => {
                                                            data.user = e;
                                                        }
                                                    "
                                                ></signUpMainJoinFragment>
                                            </v-col>
                                            <v-col cols="12" class="text-right">
                                                <v-btn color="primary" @click="nextStep(2)">다음</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-content>
                                    <v-stepper-content :key="`${stepper.category[2]}-content`" :step="3">
                                        <v-row dense>
                                            <v-col>
                                                <template v-if="data.person.jobType">
                                                    <signUpMainTechnicFragment
                                                        :jobName="this.code.job.items.find((e) => e.id === data.person.jobType).name"
                                                        @update:language="
                                                            (e) => {
                                                                data.language = e;
                                                            }
                                                        "
                                                        @update:sector="
                                                            (e) => {
                                                                data.sector = e;
                                                            }
                                                        "
                                                        @update:role="
                                                            (e) => {
                                                                data.role = e;
                                                            }
                                                        "
                                                        @update:skill="
                                                            (e) => {
                                                                data.skill = e;
                                                            }
                                                        "
                                                    ></signUpMainTechnicFragment>
                                                </template>
                                            </v-col>
                                            <v-col cols="12" class="text-right">
                                                <v-btn color="primary" @click="nextStep(3)">다음</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-content>
                                    <v-stepper-content :key="`${stepper.category[3]}-content`" :step="4">
                                        <v-row dense>
                                            <v-col>
                                                <SignUpMainCareerFragment
                                                    @update:career="
                                                        (e) => {
                                                            data.career = e;
                                                        }
                                                    "
                                                ></SignUpMainCareerFragment>
                                            </v-col>
                                            <v-col cols="12" class="text-right">
                                                <v-btn color="primary" @click="nextStep(4)">다음</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-content>
                                    <v-stepper-content :key="`${stepper.category[4]}-content`" :step="5">
                                        {{ 5 }}
                                        <v-row dense>
                                            <v-col cols="12" class="text-right">
                                                <v-btn color="primary" @click="nextStep(5)">다음</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-content>
                                </v-stepper-items>
                            </v-stepper>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
import ito from 'ito';
import Vue from 'vue';
import _ from 'lodash';
import SignUpMainCareerFragment from './fragment/career/SignUpMainCareerFragment.vue';
import signUpMainTechnicFragment from './fragment/technic/SignUpMainTechnicFragment.vue'
import signUpMainJoinFragment from './fragment/join/signUpMainJoinFragment.vue';
export default Vue.extend({
    data: function () {
    return {
            stepper: {
                category: ['약관', '개인정보', '보유기술', '경력', '완료'],
                complete: 1,
            },
            data: {
                person: {},
                user: {},
                skill: [],
                role: [],
                sector: [],
                language: [],
                career: {},
            },
            code: {
                job: {
                    items: [],
                },
            },
            form: ['termsForm', 'userForm', 'skillForm', 'careerForm', 'successForm'],
        };
  } ,
     components: {
        SignUpMainCareerFragment,
        signUpMainTechnicFragment,
        signUpMainJoinFragment,
    },
    watch: {},
    methods: {
        init: async function () {
            await this.getJobTypeList();
        },
        getJobTypeList: async function () {
            this.code.job.items = (await ito.auth.code('jobs')).data.items;
            console.log(this.code.job.items);
        },
        existUsername: async function (username) {
            return (await ito.auth.idExists({ username: username })).data > 0 ? true : false;
        },
        showPassword: function () {
            if (this.text.icon == 'mdi-eye-off-outline') {
                this.text.icon = 'mdi-eye-outline';
                this.text.type = 'text';
            } else {
                this.text.icon = 'mdi-eye-off-outline';
                this.text.type = 'password';
            }
        },
        nextStep: async function (index) {
            let validate;
            if (index === this.stepper.category.length) {
                this.stepper.complete = 1;
            } else {
                switch (index) {
                    case 1:
                        this.stepper.complete = index + 1;
                        break;
                    case 2:
                        console.log(this.$refs[this.form[index - 1]]);
                        validate = this.$refs[this.form[index - 1]].$refs[this.form[index - 1]].validate();
                        if (!validate) {
                            await ito.alert('유효한 값을 작성해주세요.');
                        } else if (await this.existUsername(this.data.user.username)) {
                            await ito.alert('동일한 아이디가 존재합니다.');
                        } else {
                            this.stepper.complete = index + 1;
                        }
                        break;
                    case 3:
                        this.stepper.complete = index + 1;
                        break;
                    case 4:
                        this.saveAccount();
                        break;
                    case 5:
                        break;
                    default:
                        break;
                }
            }
        },
        saveAccount: async function (index) {
            let self = this,
                person,
                user,
                skill,
                language,
                role,
                sector,
                career;
            person = _.cloneDeep(self.data.person);
            user = _.cloneDeep(self.data.user);
            skill = _.cloneDeep(self.data.skill);
            role = _.cloneDeep(self.data.role);
            language = _.cloneDeep(self.data.language);
            sector = _.cloneDeep(self.data.sector);
            career = _.cloneDeep(self.data.career);

            if (await ito.confirm('저장하시겠습니까?')) {
                person['role'] = role.join(',');
                for (let c in career) {
                    if (Array.isArray(career[c])) {
                        person[c] = career[c].join(',');
                    } else {
                        person[c] = career[c];
                    }
                }
                await ito.auth.signUp({
                    personDto: person,
                    userDto: user,
                    personSectorDtoList: sector
                        .join(',')
                        .split(',')
                        .map((e) => ({ sector: e })),
                    personSkillDtoList: skill
                        .join(',')
                        .split(',')
                        .map((e) => ({ skill: e })),
                    personLanguageDtoList: language
                        .join(',')
                        .split(',')
                        .map((e) => ({ language: e })),
                });
                this.stepper.complete = index + 1; //왜 선언이 안되어있지
                await ito.alert('완료');
            }
        },
    },
    mounted: async function () {
        this.init();
    },
});
</script>
