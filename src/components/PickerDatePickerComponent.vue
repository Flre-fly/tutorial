<template>
    <v-dialog
    ref="datePickerDialog"
    persistent
    width="300px"
    :return-value.sync="myValue"
    v-model="dialog"
>
    <template v-slot:activator="{ on }">
        <v-text-field
            :append-icon="appendIcon"
            :append-outer-icon="appendOuterIcon"
            :background-color="backgroundColor"
            :clearable="clearable"
            :dense="dense"
            :disabled="disabled"
            :height="height"
            :hide-details="hideDetails"
            :label="label"
            :outlined="outlined"
            :prepend-icon="prependIcon"
            :prepend-inner-icon="prependInnerIcon"
            :readonly="readonly"
            :rules="rules"
            v-on="on"
            @click:append="dialog = true;"
            @click:append-outer="dialog = true;"
            @click:prepend="dialog = true;"
            @click:prepend-inner="dialog = true;"
            @click:clear="myValue = ''; save()"
            v-model="myValue"
        ></v-text-field>
    </template>
    <v-date-picker
        ref="datePicker"
        :locale="locale"
        :type="type"
        :day-format="dayFormat"
        v-model="myValue"
    >
        <v-spacer></v-spacer>
        <v-btn
            class="primary"
            @click="save();"
        >확인</v-btn>
        <v-btn
            class="secondary"
            @click="dialog = false;"
        >취소</v-btn>
    </v-date-picker>
</v-dialog>
</template>
<script>
import moment from 'moment';
export default {
    "props": {
        "appendIcon": {
            "type": String,
            "default": undefined
        },
        "appendOuterIcon": {
            "type": String,
            "default": undefined
        },
        "backgroundColor": {
            "type": String,
            "default": undefined
        },
        "clearable": {
            "type": Boolean,
            "default": false
        },
        "dayFormat": {
            "type": Function,
            "default": function (value) {
                return moment(value, "YYYY-MM-DD").format("D");
            }
        },
        "dense": {
            "type": Boolean,
            "default": false
        },
        "disabled": {
            "type": Boolean,
            "default": false
        },
        "height": {
            "type": [Number, String],
            "default": undefined
        },
        "hideDetails": {
            "type": Boolean,
            "default": false
        },
        "label": {
            "type": String,
            "default": ""
        },
        "locale": {
            "type": String,
            "default": "ko-kr"
        },
        "outlined": {
            "type": Boolean,
            "default": false
        },
        "prependIcon": {
            "type": String,
            "default": undefined
        },
        "prependInnerIcon": {
            "type": String,
            "default": undefined
        },
        "readonly": {
            "type": Boolean,
            "default": true
        },
        "rules": {
            "type": Array,
            "default": []
        },
        "type": {
            "type": String,
            "default": "date"
        },
        value: {
            "type": String,
            "default": ""
        },
        "max": {
            "type": String,
            "default": moment().format("YYYY-MM-DD")
        },
        "min": {
            "type": String,
            "default": ""
        },
    },
    "data": function () {
        return {
            myValue: this.value,
            "dialog": false
        };
    },
    "watch": {
        "value": {
            "handler": function (newValue) {
                this.$emit("input", newValue);
            }
        },
        "dialog": {
            "handler": function (newValue) {
                newValue && this.$nextTick(function () {
                    this.$refs.datePicker.tableDate = this.value
                        ? this.value.substring(0, 7)
                        : moment().format('YYYY-MM');
                    this.$refs.datePicker.activePicker = this.type === "date" ? "DATE" : "MONTH";
                });
            }
        },
    },
    "methods": {
        "save": function () {
            this.$refs.datePickerDialog.save(this.value);
            this.$emit("input", this.value);
        }
    }
};
</script>