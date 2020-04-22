<!--
 * @Author: your name
 * @Date: 2020-03-13 22:33:30
 * @LastEditTime: 2020-04-22 12:44:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Follow.vue
 -->

<template>
    <div style="height:100vh;overflow:auto;background:#eee">
        <headerBar title="反馈问题"></headerBar>
        <div class="feedback-wrapper">
            <div class="feedback-title bg" style="margin-top:20px;">
                <p style="padding-left:8px">请描述你所遇到的问题</p>
                <div class="btn-wrapper">
                    <!-- <mt-button size="small" v-for="item in descBtnList" :key="item" style="margin-bottom:10px">{{item}}</mt-button> -->
                    <mt-checklist
                        title="请选择问题进行反馈"
                        v-model="value"
                        :options="descBtnList">
                    </mt-checklist>
                </div>
                <mt-field label="更多反馈" v-if="showMore" placeholder="请填写反馈问题" type="textarea" rows="4" v-modal="introduction"></mt-field>
            </div>
        </div>
        <div class="feedback-content" style="margin-top:10px">
                <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
                <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
                <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        </div>
        <div class="feedback-content" style="margin-top:30px">
                <mt-button size="large" type="primary" @click="handleSubmit">提交反馈</mt-button>
        </div>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { Loadmore,Indicator,MessageBox  } from 'mint-ui';
import axios from '../utils/request'
export default {
    components: {
        headerBar,
    },
    data () {
        return {
            value:[],
            showMore:false,
            username:'',
            email:'',
            introduction:'',
            phone:'',
            moreValue:'',
            descBtnList:['页面信息有误','App不稳定','支付遇到问题','吐槽App功能','账户相关问题','其他']
        }
    },
    methods: {
        handleSubmit () {
            let date = new Date().getFullYear() + '-' +new Date().getMonth() + '-' +new Date().getDate()+ '用户反馈'
            const data = {
                title: date,
                content: this.value.join(',')+','+this.introduction,
                username: this.username,
                email: this.email,
                mobile: this.phone
            }
            axios({
                url: '/api/feedback/add',
                method: 'post',
                header:{
					'Content-Type':'application/json'
                },
                data
            }).then(res=>{
                MessageBox({
                title:'提示',
                message:'反馈成功，我们工作人员会24小时内联系您',
            }).then( confirm =>{
                this.$router.push({
                    name:'me'
                })
            })
            })
        }
    },
    watch: {
        value (val) {
            const tempArr = val.filter( item=> item ==='其他' )
            if (tempArr.length !== 0 ) {
                this.showMore = true
            }else {
                this.showMore = false
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.feedback-wrapper{
    padding: 1px 5px 20px 5px;
    margin-top: 10px;
    background: #fff;
    font-size: 14px;
    
}
.feedback-title{
    // height:30vh;
}
.bg{
    background:#fff;
}
.btn-wrapper{
    display: flex;
    // justify-content: space-around;
    // flex-wrap: wrap;
}
</style>