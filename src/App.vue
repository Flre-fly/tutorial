<template>
    <button>{{ this.$store.state.token }}</button>
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
