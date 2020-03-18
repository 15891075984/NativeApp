<!--
 * @Author: your name
 * @Date: 2020-03-08 14:59:10
 * @LastEditTime: 2020-03-18 22:00:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\headerBar.vue
 -->
<template>
    <div class="headerBar">
        <mt-header fixed :title="title" class="headerbar-wrapper">
            <mt-button icon="back" slot="left" @click="goBack"></mt-button>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
    </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
    props:['title'],
    components: {
        Header
    },
    methods: {
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.headerBar{
    margin-bottom: 39px;
    box-sizing: border-box;
}
/* .headerbar-wrapper{
    height: 70px;
    padding-top: 30px;
} */
</style>