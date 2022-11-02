<template>
        <v-dialog scrollable persistent width="450px" v-model="myValue">
            <v-card>
                <v-card-title>알림</v-card-title>
                <v-card-text style="max-height: 200px">
                    <div style="white-space: pre-line">{{ this.message }}</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="ok()">확인</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'AlterComponent',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: '',
        },
        callback: {
            type: Function,
            default: function () {},
        },
    },
    data: function () {
        return {
            myValue: this.value,
        };
    },
    watch: {
        value: function (newValue) {
            this.$emit('input', newValue);
        },
    },
    methods: {
        ok: function () {
            this.myValue = false;
            //this.$emit('updateMyValue', this.myValue);
            this.callback();
        },
    },
};
</script>
