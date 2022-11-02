<template>
    <v-app id="app">
        <v-fade-transition hide-on-leave>
            <router-view></router-view>
        </v-fade-transition>
        <AlterComponent
            :message="this.$store.state.alert.message"
            :callback="this.$store.state.alert.callback"
            v-model="this.$store.state.alert.value"
        ></AlterComponent>
        <ConfirmComponent
            :message="this.$store.state.confirm.message"
            :oktext="this.$store.state.confirm.oktext"
            :canceltext="this.$store.state.confirm.canceltext"
            :callback="this.$store.state.confirm.callback"
            v-model="this.$store.state.confirm.value"
        ></ConfirmComponent>
        <v-overlay :z-index="this.$store.state.loading.zIndex" :value="this.$store.state.loading.overlay">
            <v-progress-circular indeterminate size="128"></v-progress-circular>
        </v-overlay>
    </v-app>
</template>

<script>
import store from '@/config/store';
import router from '@/config/router';
import VueRouter from 'vue-router';
import AlterComponent from '@/components/AlterComponent.vue';
import ConfirmComponent from '@/components/ConfirmComponent.vue';
export default {
    name: 'App',
    store,
    router,
    components: {
        AlterComponent,
        ConfirmComponent,
    },

    VueRouter,

    data: () => ({
        //
    }),
};
</script>
