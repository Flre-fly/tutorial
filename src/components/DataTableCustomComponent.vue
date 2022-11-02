<template>
    <v-data-table
    v-model="data"
    :show-select="showSelect"
    :item-key="itemKey"
    :headers="headers"
    :items="items"
    :server-items-length="totalRows"
    @update:options="options = $event;"
    :loading="loading"
    :disable-sort="disabled"
    mobile-breakpoint="0"
    hide-default-footer
>
    <template v-slot:top="props">
    <v-row class="my-1">
        <v-col class="d-flex justify-start align-center">
            <div style="width: 200px;">
                <h3 class="text-left">{{count}}</h3>
            </div>
            <v-btn v-if="!downloadHide" depressed color="primary" class="ml-auto" @click="download">Excel Download</v-btn>
            <div style="width: 130px;" :class="downloadHide ? 'ml-auto' : 'ml-3'">
              <v-select
                  dense
                  outlined
                  hide-details="auto"
                  :value="props.options.itemsPerPage"
                  :items="paginationList"
                  @change="props.options.itemsPerPage = $event;"
                 >
              </v-select>
           </div>
        </v-col>
    </v-row>
    </template>
    <template v-if="items.length !== 0" v-slot:body="props">
            <tbody>
                <tr v-for="item in props.items" :key="item[itemKey]">
                    <td v-if="showSelect">
                        <v-checkbox
                            v-model="data"
                            :value="item"
                            multiple
                            style="margin:0px;padding:0px"
                            hide-details
                        />
                    </td>
                    <td :class="'text-'+header.align + ' ' + header.cellClass" v-for="header in headers" @click="clickRow(item)" :key="header">
                        <template v-if="header.type === 'icon'">
                            <v-icon
                                class="mr-2"
                                @click.native.stop="clickIcon(item, header.value)"
                            >{{cell[header.type][header.value].title}}</v-icon>
                        </template>
                        <template v-else-if="header.type === 'autocomplete'">
                            <v-autocomplete
                                dense
                                outlined
                                hide-details
                                :items="cell[header.type][header.value].items"
                                @click.native.stop
                                @change="changeAutocomplete($event, header.value, item);"
                            ></v-autocomplete>
                        </template>
                        <template v-else-if="header.type === 'button'">
                            <v-btn
                                hide-details
                                @click.native.stop="clickButton(item, header.value)"
                            >{{cell[header.type][header.value].title}}</v-btn>
                        </template>
                        <template v-else-if="header.type === 'textField'">
                            <v-text-field
                                hide-details
                                @click.native.stop
                                @input="inputTextField($event, item, header.value)"
                                dense
                                outlined
                                :suffix="cell[header.type][header.value].suffix"
                            ></v-text-field>
                        </template>

                        <template v-else-if="header.cellClass != null && header.cellClass.indexOf('truncate') !== -1">
                            <template v-if="header.value.toUpperCase().indexOf('TARGET') !== -1">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-on="on" v-bind="attrs">{{item[header.value]}}</span>
                                    </template>
                                    <template v-if="item[header.value]">
                                        <span v-for="text in item[header.value].split(',')" :key="text">{{text}}<br/></span>
                                    </template>
                                </v-tooltip>
                            </template>
                            <template v-else>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-on="on" v-bind="attrs">{{item[header.value]}}</span>
                                    </template>
                                    {{item[header.value]}}
                                </v-tooltip>
                            </template>
                        </template>
                        <template v-else>
                            {{item[header.value]}}
                        </template>
                    </td>
                </tr>
            </tbody>
    </template>
    <template v-else v-slot:body>
        <tbody>
            <tr>
                <td v-if="loading" :colspan="headers.length + (showSelect ? 1 : 0)" class="text-center">
                    <h4 style="opacity: 0.4;">데이터 가져오는 중...</h4>
                </td>
                <td v-else :colspan="headers.length + (showSelect ? 1 : 0)" class="text-center">
                    <div class="py-3">
                        <v-icon size="200" style="opacity: 0.12;">
                            mdi-database-remove-outline
                        </v-icon>
                        <br>
                        <h4 style="opacity: 0.4;">데이터가 없습니다.</h4>
                    </div>
                </td>
            </tr>
        </tbody>
    </template>
    <template v-slot:footer = "{props}" >
        <v-row dense>
            <v-col cols="12" class="pa-0">
                <div class="text-center my-2" >
                    <v-pagination
                        class="d-inline-block"
                        :length="Math.ceil(totalRows / props.options.itemsPerPage)"
                        :total-visible="10"
                        v-model="props.options.page"
                        :disabled="disabled"
                    ></v-pagination>
                </div>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex justify-end align-center">
                <v-btn
                    v-if="!importHide"
                    color="primary"
                    @click="excelImport"
                >업로드</v-btn>
                <v-btn
                    v-if="!addHide"
                    class="ml-3"
                    @click="add"
                >추가</v-btn>
                <v-btn
                    v-if="!removeHide"
                    class="ml-3"
                    @click="remove"
                >삭제</v-btn>
            </v-col>
        </v-row>
    </template>
 </v-data-table>
</template>
<script>

export default {
    "props": {
        "headers": {
            "type": Object,
            "default": {
                "page": 1,
                "itemsPerPage": 10,
                "pageStart": 0,
                "pageStop": 10,
                "pageCount": 1,
                "itemsLength": 10
            }
        },
        "items": {
            "type": Array,
            "default": []
        },
        "itemClass": {
            "type": String,
            "default": ""
        },
        "totalRows": {
            "type": Number,
            "default": 0
        },
        "loading": {
            "type": Boolean,
            "default": false
        },
        "importHide": {
            "type": Boolean,
            "default": false
        },
        "addHide": {
            "type": Boolean,
            "default": false
        },
        "removeHide": {
            "type": Boolean,
            "default": false
        },
        "showSelect": {
            "type": Boolean,
            "default": false
        },
        "itemKey": {
            "type": String,
            "default": "id"
        },
        "countTitle": {
            "type": Object,
            "default": {
                "front": "전체",
                "end": "건"
            }
        },
        "cell": {
            "type": Object,
            "default": {}
        },
        "downloadHide": {
            "type": Boolean,
            "default": false
        },
        "search": {
            "type": Boolean,
            "default": false
        }
    },
    "data": function () {
        return {
            "paginationList": [
                { "text": "5개 보기", "value": 5 },
                { "text": "10개 보기", "value": 10 },
                { "text": "15개 보기", "value": 15 },
                { "text": "20개 보기", "value": 20 },
                { "text": "25개 보기", "value": 25 },
                { "text": "30개 보기", "value": 30 },
            ],
            "data": [],
            "options": {
                "page": 1,
                "itemsPerPage": 10,
                "sortBy": [],
                "sortDesc": [],
                "groupBy": [],
                "groupDesc": [],
                "multiSort": true,
                "mustSort": false
            }
        };
    },
    "watch": {
        "options": {
            "handler": function (n) {
                this.$emit("reload", n);
            },
            "deep": true
        },
        "loading": {
            "handler": function () {
                this.data = [];
            },
            "deep": true
        },
        "search": {
            "handler": function (n) {
                if (n) {
                    if (this.options.page !== 1) {
                        this.options.page = 1;
                    } else {
                        this.$emit("reload", this.options);
                    }
                }
            }
        }
    },
    "computed": {
        "disabled": function () {
            return this.loading || this.totalRows === 0 ? true : false;
        },
        "count": function () {
            var finalCount = null, temp;
            var alterCount = this.totalRows;
            while (alterCount > 1000) {
                temp = alterCount % 1000;
                alterCount = Math.floor(alterCount / 1000);
                finalCount = "," + String(temp);
            }
            if (finalCount != null) finalCount = String(alterCount) + finalCount;
            else finalCount = this.totalRows;
            return this.countTitle.front + " " + finalCount + this.countTitle.end;
        }
    },
    "methods": {
        "clickRow": function (e) {
            this.$emit("click:row", e);
        },
        "excelImport": function () {
            this.$emit("import");
        },
        "remove": function () {
            this.$emit("remove", this.data);
        },
        "add": function () {
            this.$emit("add");
        },
        "clickIcon": function (item, header) {
            const clicked = { item, header };
            this.$emit("click:icon", clicked);
        },
        "changeAutocomplete": function (id, header, item) {
            const selected = { id, header, item };
            this.$emit("change:autocomplete", selected);
        },
        "clickButton": function (item, header) {
            const clicked = { item, header };
            this.$emit("click:button", clicked);
        },
        "inputTextField": function (value, item, header) {
            const clicked = { value, item, header };
            this.$emit("input:textField", clicked);
        },
        "download": function () {
            this.$emit("download")
        }
    },
};
</script>
