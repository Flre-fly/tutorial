<template>
    <v-app id="app">
        <button>으아아ㅏㄱ</button>
        <button>{{ $store.getters['app / GET_TOKEN'] }}</button>
        <button>머임?</button>
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
