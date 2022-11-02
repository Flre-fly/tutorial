<template>
    <v-dialog scrollable v-model="myDialog.visible" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ dialog.title }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="10" md="8">
                            <v-text-field v-model="data.career.name" label="프로젝트명"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="7" md="5">
                            <date-picker-component
                                dense
                                label="시작일"
                                append-icon="mdi-calendar"
                                hide-details="auto"
                                v-model="data.career.startPeriod"
                            ></date-picker-component>
                        </v-col>
                        <v-col cols="2" md="auto" class="d-flex align-center">~</v-col>
                        <v-col cols="12" sm="7" md="5">
                            <date-picker-component
                                dense
                                label="종료일"
                                append-icon="mdi-calendar"
                                hide-details="auto"
                                v-model="data.career.endPeriod"
                            ></date-picker-component>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="data.career.position" label="직급"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="data.career.task" label="담당업무"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="data.career.pay" label="월급여" suffix="만원"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary" class="ml-auto" @click="saveCareer">저장</v-btn>
                <v-btn text color="error" class="ml-1" @click="initialize">초기화</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import _ from 'lodash';
export default {
    props: {
        dialog: {
            type: Object,
            default() {
                return {
                    visible: false,
                    title: '경력 등록',
                    data: {},
                };
            },
        },
    },
    data: function () {
        return {
            data: {
                career: {
                    personCareerId: null,
                    name: null,
                    startPeriod: null,
                    endPeriod: null,
                    position: null,
                    task: null,
                    pay: null,
                },
            },
        };
    },
    watch: {
        'dialog.visible': {
            handler: function (n) {
                if (n) {
                    this.data.career = _.cloneDeep(this.dialog.data);
                } else {
                    Object.assign(this.$data, this.$options.data.apply(this));
                }
            },
        },
    },
    methods: {
        async initialize() {
            let self = this;
            self.data.career.name = null;
            self.data.career.startPeriod = null;
            self.data.career.endPeriod = null;
            self.data.career.position = null;
            self.data.career.task = null;
            self.data.career.pay = null;
        },
        saveCareer: function () {
            this.$emit('save', this.data.career);

            this.$emit('update:dialog', {
                ...this.dialog,
                visible: false,
            });
        },
    },
};
</script>
