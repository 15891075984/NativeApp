
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    mounted () {
        const hashUrl = window.location.hash
        if ( hashUrl.indexOf('/login') || hashUrl.indexOf('/register')) {
            return 
        }
        this.getUserInfo()
    },
    methods: {
        ...mapActions({
            'getUserInfo':'user/getUserInfo'
        }),
    }
}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>