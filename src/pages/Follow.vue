<!--
 * @Author: your name
 * @Date: 2020-03-13 22:33:30
 * @LastEditTime: 2020-03-13 22:54:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Follow.vue
 -->

<template>
    <div style="height:100vh;overflow:auto;background:#eee">
        <headerBar title="我的关注"></headerBar>
        <div class="follow-wrapper">
            
        </div>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { Loadmore,Indicator } from 'mint-ui';
import axios from '../utils/request'
export default {
    components: {
        headerBar
    },
    data () {
        return {
            allLoaded:true,
            foollowList:[1,2,3,4,5,6,,56,54,6,45,6,54,6,54,7,6,867,8,67,8,1,2,3,4,5,6,,56,54,6,45,6,54,6,54,7,6,867,8,67,8]
        }
    },
    mounted () {
        const followId = this.$route.params.followId
        axios.get(`/api/Graph/${followId}/followList`)
    },
    methods: {
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
            Indicator.open('正在加载数据中...')
            setTimeout(()=>{
                this.list.splice(0,0,'334')
                Indicator.close()
            },2000)
        }
    }
}
</script>

<style scoped>
@-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
.an{
    -webkit-transform: rotate(360deg);
    animation: rotation 2s linear infinite;
    -moz-animation: rotation 2s linear infinite;
    -webkit-animation: rotation 2s linear infinite;
    -o-animation: rotation 2s linear infinite;
}
</style>