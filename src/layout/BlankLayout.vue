<template>
    <v-app id="blank-layout">
    <v-fade-transition hide-on-leave>
        <router-view></router-view>
    </v-fade-transition>
</v-app>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
    data: function () {
        return {
        };
    },
    methods: {
    }
});
</script>