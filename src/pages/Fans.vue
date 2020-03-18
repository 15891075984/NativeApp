<!--
 * @Author: your name
 * @Date: 2020-03-13 22:33:30
 * @LastEditTime: 2020-03-19 00:41:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Follow.vue
 -->

<template>
    <div style="height:100vh;overflow:auto;background:#eee">
        <headerBar title="我的粉丝"></headerBar>
        <div class="no-data" v-if="fansList.length == 0">
            <img src="../assets/img/yutang.png" alt="" >
            <p>
                一个粉丝都没有，你真菜 ! ! !
            </p>
        </div>
        <div class="fans-wrapper">
            <userlist v-for="item in fansList" :key="item.uid" :userValue="item"></userlist>
        </div>
        
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { Loadmore,Indicator } from 'mint-ui';
import userlist from '../components/userList'
import axios from '../utils/request'
export default {
    components: {
        headerBar,
        userlist
    },
    data () {
        return {
            allLoaded:true,
            fansList:[]
        }
    },
    mounted () {
        const fansId = this.$route.params.fansId
        axios.get(`/api/Graph/${fansId}/userList`).then(res=>{
            if(!res){
                this.fansList = [] ;
                return
            }
            this.fansList = res
        })
    },
    methods: {
    }
}
</script>

<style scoped>
.fans-wrapper{
    padding: 1px 5px 80px 5px
}
.no-data{
    height:100vh;
    text-align: center;
    line-height: 100%;
    font-size: 20px;
    max-width: 80%;
    margin:0 auto;
}
</style>