<!--
 * @Author: your name
 * @Date: 2020-03-08 14:59:10
 * @LastEditTime: 2020-03-08 18:09:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\headerBar.vue
 -->
<template>
    <div class="headerBar">
        <mt-header fixed :title="title">
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
}
</style>