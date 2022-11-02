<template>
    <div>
        <v-row dense>
            <v-col cols="12">
                <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
                    <v-card-text>
                        <v-row>
                            <v-col cols="auto" class="d-flex justify-center align-center">
                                <span>경력</span>
                            </v-col>
                            <v-col>
                                <data-table-custom-component
                                    :show-select="true"
                                    item-key="id"
                                    :headers="career.dataTable.headers"
                                    :items="career.dataTable.items"
                                    :totalRows="career.dataTable.totalRows"
                                    :page="career.dataTable.options.page"
                                    :itemsPerPage="career.dataTable.options.itemsPerPage"
                                    :sortBy="career.dataTable.options.sortBy"
                                    :sortDesc="career.dataTable.options.sortDesc"
                                    :groupBy="career.dataTable.options.groupBy"
                                    :groupDesc="career.dataTable.options.groupDesc"
                                    :multiSort="career.dataTable.options.multiSort"
                                    :mustSort="career.dataTable.options.mustSort"
                                    :loading="career.dataTable.loading"
                                    @click:row="modifyCareer"
                                    @remove="
                                        (e) => {
                                            console.log('asdasd');
                                        }
                                    "
                                    @add="openCareerDialog"
                                ></data-table-custom-component>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-text-field autocomplete="off" dense outlined clearable label="급여" hide-details="auto" v-model="data.career.pay"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
                    <v-card-text>
                        <v-row>
                            <v-col cols="auto" class="d-flex justify-center align-center">
                                <span>업무가능여부</span>
                            </v-col>
                            <v-col class="py-0 d-flex justify-center align-center">
                                <v-radio-group
                                    :rules="[rules.required]"
                                    style="margin: 5px 0 !important"
                                    v-model="data.career.inputStatus"
                                    row
                                    hide-details
                                >
                                    <v-radio label="가능" value="T"></v-radio>
                                    <v-radio label="불가능" value="F"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <DatePickerComponent
                    dense
                    outlined
                    hide-details
                    label="투입가능일"
                    append-icon="mdi-calendar"
                    v-model="data.career.workableDay"
                ></DatePickerComponent>
            </v-col>
        </v-row>
        <CareerDialogComponent :dialog.sync="dialog" @save="saveCareer"></CareerDialogComponent>
    </div>
</template>
<script>
import ito from 'ito';
import _ from 'lodash';
import DatePickerComponent from '@/components/PickerDatePickerComponent.vue';
import DataTableCustomComponent from '@/components/DataTableCustomComponent.vue';
import CareerDialogComponent from '@/dialog/career/CareerDialogComponent.vue';
export default {
    components: {
        DatePickerComponent,
        CareerDialogComponent,
        DataTableCustomComponent,
    },
    data: function () {
        return {
            dialog: {
                visible: false,
                title: '경력 등록',
                data: {},
            },
            data: {
                career: {},
            },
            career: {
                dataTable: {
                    headers: [
                        { text: '프로젝트명', value: 'name' },
                        { text: '시작 기간', value: 'startPeriod' },
                        { text: '종료 기간', value: 'endPeriod' },
                        { text: '직급', value: 'position' },
                        { text: '담당업무', value: 'task' },
                        { text: '월급여', value: 'pay' },
                    ],
                    items: [],
                    options: {
                        page: 1,
                        itemsPerPage: 10,
                        sortBy: [],
                        sortDesc: [],
                        groupBy: [],
                        groupDesc: [],
                        multiSort: true,
                        mustSort: false,
                    },
                    loading: false,
                    totalRows: 0,
                },
            },
            rules: {
                required: (value) => !!value || '필수',
            },
        };
    },
    watch: {
        'data.career': {
            handler: function (n) {
                this.$emit('update:career', n);
            },
            deep: true,
        },
    },
    methods: {
        init: async function () {},
        initialize: async function () {
            let self = this;

            self.career.form.item.name = null;
            self.career.form.item.startPeriod = null;
            self.career.form.item.endPeriod = null;
            self.career.form.item.position = null;
            self.career.form.item.task = null;
            self.career.form.item.pay = null;
        },
        setCareer: async function (queryId) {
            let self = this;

            self.dialog = true;

            return new Promise(function (resolve) {
                Promise.resolve()
                    .then(function () {
                        return ito.api.common.career.getCareer(queryId);
                    })
                    .then(function (response) {
                        self.career.form.item = response.data;
                    })
                    .then(function () {
                        resolve();
                    });
            });
        },
        deleteCareerList: async function () {
            let self = this,
                deleteList = [];

            self.career.selected.forEach((e) => {
                deleteList.push(e.personCareerId);
            });

            if (self.career.selected.length == 0) await ito.alert('삭제한 경력이 없습니다.');
            else if (await ito.confirm('삭제하시겠습니까?')) {
                await ito.api.common.career.removeCareerList(deleteList);
                await ito.alert('삭제되었습니다.');

                self.career.dataTable.options.page = 1;
                self.loadCareerList();
            }
        },
        deleteCareer: async function (queryId) {
            if (await ito.confirm('삭제하시겠습니까?')) {
                ito.api.common.career.removeCareer(queryId);
                await ito.alert('삭제되었습니다.');

                this.career.dataTable.options.page = 1;
                this.loadCareerList();
            }
        },
        saveCareer: async function (data) {
            let self = this,
                id,
                items;
            items = self.career.dataTable.items;
            if (data.id === undefined) {
                id = items.length > 0 ? self.career.dataTable.items[items.length - 1].id : 0;
                data.id = id + 1;
                self.career.dataTable.items.push(_.cloneDeep(data));
                self.career.dataTable.totalRows = self.career.dataTable.totalRows + 1;
            } else {
                Object.assign(
                    self.career.dataTable.items.find((e) => e.id === data.id),
                    _.cloneDeep(data)
                );
            }
        },
        openCareerDialog: function () {
            this.dialog.data = {};
            this.dialog.visible = true;
        },
        modifyCareer: function (data) {
            this.dialog.title = '경력 수정';
            this.dialog.data = data;
            this.dialog.visible = true;
        },
    },
    mounted: function () {},
};
</script>
