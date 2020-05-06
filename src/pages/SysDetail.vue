<!--
 * @Author: your name
 * @Date: 2020-05-06 21:28:25
 * @LastEditTime: 2020-05-06 21:47:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\SysDetail.vue
 -->
<template>
    <div>
        <headerBar title="系统公告"></headerBar>
        <div style="padding: 40px 15px">
            <div class="sys-title">
                {{detail.title}}
                <div style="font-size:14px;line-height:20px;color:#999">{{detail.createTime}}</div>
            </div>
            <div v-html="detail.content"></div>
        </div>
    </div>
    
</template>

<script>
import headerBar from '../components/headerBar'
export default {
    data () {
        return {
            detail: {}
        }
    },
    components: {
        headerBar
    },
    mounted () {
        this.detail = JSON.parse(localStorage.sysDetail)
        console.log(this.detail)
    }
}
</script>

<style scoped>
.sys-title{
    text-align: center;
    font-size: 22px;
    margin-bottom: 15px;
    font-weight: 500;
}
</style>