<template>
    <v-dialog
    scrollable
    v-model="dialog.visible"
    max-width="600px"
>
    <v-card>
        <v-card-title>
            <span class="headline">{{ dialog.title }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="vacation.department"
                            label="부서"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            readonly
                            v-model="vacation.name"
                            label="성명"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="vacation.emergencyNum"
                            label="비상연락망"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="7" md="5">
                        <v-select
                            dense
                            :items="select.type.items"
                            label="구분"
                            v-model="vacation.type"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="7" md="5">
                        <v-text-field
                            dense
                            v-model="vacation.takingUser"
                            label="인수인계자"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="7" md="5">
                        <date-picker-component
                            dense
                            label="시작일"
                            append-icon="mdi-calendar"
                            hide-details="auto"
                            v-model="vacation.sterm"
                        ></date-picker-component>
                    </v-col>
                    <v-col cols="2" md="auto" class="d-flex align-center">~</v-col>
                    <v-col cols="12" sm="7" md="5">
                        <date-picker-component
                            dense
                            label="종료일"
                            append-icon="mdi-calendar"
                            hide-details="auto"
                            v-model="vacation.eterm"
                        ></date-picker-component>
                    </v-col>
                    <v-col cols="12" sm="10" md="8">
                        <v-textarea
                            dense
                            outlined
                            v-model="vacation.detail"
                            label="세부사항"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn
                text
                color="primary"
                class="ml-auto"
                @click="saveVacation"
            >저장</v-btn>
            <v-btn
                text
                color="error"
                class="ml-1"
                @click="initialize"
            >초기화</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>
<script>
import Vue from 'vue';
import ito from 'ito';
import store from '@/config/store'
import _ from 'vue-lodash';
Vue.component('vacation-dialog-component', async function (resolve) {
    resolve({
        "props": {
            "dialog": {
                "type": Object,
                "default": {
                    "visible": false,
                    "title": "휴가 신청서",
                    "data": {}
                }
            }
        },
        "data": function() {
            return {
                "vacation": {
                    "name": null,
                    "emergencyNum": null,
                    "department": null,
                    "takingUser": null,
                    "sterm": null,
                    "eterm": null,
                    "detail": null,
                    "type": null
                },
                "select": {
                    "type": {
                        "items": [
                            {"text": "월차", "value": "M"},
                            {"text": "연차", "value": "N"},
                            {"text": "반차", "value": "O"},
                            {"text": "병가", "value": "S"},
                            {"text": "기타", "value": "E"},
                        ]
                    }
                }
            };
        },
        "watch": {
            "dialog.visible": {
                "handler": async function(n) {
                    let self = this, userId = store.state.app.user.id;

                    if(n) {
                        let user = (await ito.api.common.user.getUser(userId)).data;

                        self.vacation = _.cloneDeep(self.dialog.data);
                        self.vacation.name = user.username;
                        self.vacation.type = "M";
                    } else {
                        Object.assign(self.$data, self.$options.data.apply(self));
                    }
                }
            }
        },
        "methods": {
            "initialize": async function() {
                let self = this;
                self.vacation.name = null;
                self.vacation.emergencyNum = null;
                self.vacation.department = null;
                self.vacation.takingUser = null;
                self.vacation.sterm = null;
                self.vacation.eterm = null;
                self.vacation.detail = null;
                self.vacation.type = null;
            },
            "saveVacation": function() {
                this.$emit("save", this.vacation);
                this.dialog.visible = false;
            }
        },
    });
});</script>
