<template>
    <v-main scrollable persistent width="450px" v-model="myValue">
        <v-card>
            <v-card-title>확인</v-card-title>
            <v-card-text style="max-height: 200px">
                <div style="white-space: pre-line">{{ message }}</div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="ok()">{{ oktext }}</v-btn>
                <v-btn color="secondary" @click="cancel()">{{ canceltext }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-main>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: '',
        },
        oktext: {
            type: String,
            default: '확인',
        },
        canceltext: {
            type: String,
            default: '취소',
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
            this.callback(true);
        },
        cancel: function () {
            this.myValue = false;
            this.callback(false);
        },
    },
    mounted: async function () {},
};
</script>
