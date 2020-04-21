<!--
 * @Author: your name
 * @Date: 2020-03-22 11:00:04
 * @LastEditTime: 2020-04-21 18:57:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\UserDetail.vue
 -->
<template>
    <div class="user-detail-wrapper">
        <div class="header">
            <div class="back">
                <div style="display:inline-block;width:50px;" @click="goBack">
                    <img src="../assets/img/返回.png"   alt="" style="width:20px;margin-top:5px">
                </div>
            </div>
            <div class="header-title">
                <div class="">
                    <img :src="userInfo.icon" v-lazy="userInfo.icon" alt="" style="border: 2px solid #fff;border-radius: 5px;width:50px;height:50px">
                </div>
                <div class="username">
                    <p class="name">{{userInfo.uname}}</p>
                    <p class="apptest">已认证</p>
                </div>
                <div class="" style="margin-top:11px;">
                    <mt-button type="default" @click="handleStatus" :class="{follow: status === 0}">{{status ? '关注' : '取关'}}</mt-button>
                </div>
            </div>
            <div class="header-desc ">
                1小时前来过闲鱼
                90后金牛座女生
            </div>
            <div class="header-num header-desc">
                <div class="num-item">{{userInfo.starNum}}超赞</div>
                <div class="num-item">{{userInfo.followNum}}关注</div>
                <div class="num-item">{{userInfo.fansNum}}粉丝</div>
            </div>
            <div class="content-nav">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">她的{{count.mineNum}}</mt-tab-item>
                    <mt-tab-item id="3">评价857</mt-tab-item>
                    <mt-tab-item id="4">动态{{count.allNum}}</mt-tab-item>
                </mt-navbar>
            </div>
        </div>
        <div >
            <mt-tab-container v-model="selected" class="content">
                <mt-tab-container-item id="1">
                    <goodsListRow :goods="goodsList"></goodsListRow>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <evaluateList v-for="item in 2"></evaluateList>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <dynamicList v-for="item in dynamicList" :dynamic="item"></dynamicList>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
import axios from '../utils/request'
import goodsCard from '../components/goodsCard'
import goodsListRow from '../components/goodsListRow'
import evaluateList from '../components/evaluateList'
import dynamicList from '../components/dynamicList'
import { mapState } from 'vuex';
export default {
    components: {
        goodsCard,
        goodsListRow,
        evaluateList,
        dynamicList
    },
    data () {
        return {
            userId: '',
            status: 0,
            selected: '1',
            goodsList: [],
            dynamicList: [],
            userInfo:{},
            count: {
                allNum: 0,
                mineNum: 0,
            }
        }
    },
    mounted () {
        this.userId = this.$route.params.userId
        this.getUserDetail()
        this.getDynamic()
    },
    computed:{
        ...mapState({
            user:'user'
        })
    },
    methods: {
        //获取用户详情
        getUserDetail () {
            axios({
                methods: 'get',
                url: `/api/homePage/mine/${this.userId}`
            }).then( res =>{
                if (res.code !== 0 ) return 
                this.goodsList = res.data.productInfoVos
                this.count.mineNum = res.data.mineNum
            })
            axios.get(`/api/homePage/userInfo/${this.userId}`).then(res=>{
                if(res.code !== 0) return
                if(res.data && Object.keys(res.data).length !== 0) {
                    this.userInfo = res.data
                }
            })
        },
        //关注
        handleStatus () {
            this.status = this.status ? 0 : 1
            const data = {
                uid:this.user.userInfo.uid,
                followid: this.userInfo.uid,
                status: this.status
            }
            console.log(data)
            axios({
                url:'/api/Graph',
                method:'POST',
                data,
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                
            })
            //this.$emit('updateStatus', this.userValue.uid, this.status)
            //TODO 切换关注状态
            // axios.get('/api/Graph',{
            //     params:{
            //         uid: this.status
            //     }
            // })
        },
        // 动态数据
        getDynamic () {
            axios({
                methods: 'get',
                url: `/api/homePage/dynamic/${this.userId}`
            }).then( res =>{
                if (res.code !== 0 ) return
                this.dynamicList = res.data.dynamic
                this.count.allNum = res.data.allNum
            })
        },

        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang='scss'>
.user-detail-wrapper{
    background: #fff;
    // height: 100vh;
    color: #fff;
    overflow: auto;
    .header{
        background: #aaa;
        padding-top: 10px;
        padding-bottom: 0;
        .back{
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
        }
        .header-title{
            padding: 10px 10px;
            font-size: 0;
            display: flex;
            .avatar{
                border: 2px solid #fff;
                border-radius: 5px;
            }
            .username{
                padding: 10px 10px 0 20px;
                font-size: 16px;
                flex: 1;
                line-height: 25px;
                .name{
                    font-weight: 700px;
                }
                .apptest{
                    font-size: 12px;
                }
            }
            .follow{
                background: #ffda44;
                border-radius: 5px;
            }
        }
        .header-desc{
            padding: 0 10px;
            margin-top: 5px;
            font-size: 14px;
            line-height: 20px;
        }
        .header-num{
            display: flex;
            margin-top: 15px;
            margin-bottom: 10px;
            flex-direction: row;
            .num-item{
                margin-right: 30px;
                font-weight: 500;
            }
        }
        .content-nav{
            color: #000;
        }
    }
    .content{
        font-size: 14px;
        color: #000;
        padding: 0;
        padding-bottom: 30px;
        height: 72vh;
        overflow: auto;
        margin-top: 3px;
    }
}
</style>