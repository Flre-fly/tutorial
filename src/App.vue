<template>
    <v-app id="app">
        <v-fade-transition hide-on-leave>
            <router-view></router-view>
        </v-fade-transition>
        <alert-component
            :message="this.$store.state.alert.message"
            :callback="this.$store.state.alert.callback"
            v-model="this.$store.state.alert.value"
        ></alert-component>
        <confirm-component
            :message="this.$store.state.confirm.message"
            :oktext="this.$store.state.confirm.oktext"
            :canceltext="this.$store.state.confirm.canceltext"
            :callback="this.$store.state.confirm.callback"
            v-model="this.$store.state.confirm.value"
        ></confirm-component>
           <v-overlay
          :z-index="this.$store.state.loading.zIndex"
          :value="this.$store.state.loading.overlay"
        >
              <v-progress-circular
                indeterminate
                size="128"
              ></v-progress-circular>
        </v-overlay>
    </v-app>
</template>

<script>
import store from '@/config/store';
export default {
    name: 'App',
    store,

    data: () => ({
        //
    }),
};
</script>
