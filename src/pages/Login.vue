<!--
 * @Author: your name
 * @Date: 2020-03-08 14:09:12
 * @LastEditTime: 2020-05-12 13:53:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Login.vue
 -->
<template>
    <div class="login">
        <!-- <div class="topbar bg"></div> -->
        <headerBar title="登录"></headerBar>
        <div class="logo">
            <img src="../assets/img/闲鱼.png" style="width:100px;height:100px;margin-top:25px" alt="">
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="登录密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field ></mt-field>
        <div>
            <mt-button type="primary" style="width:96%;margin-left:2%" @click="handleSubmit">立即登录</mt-button>
            <mt-button type="primary" style="width:96%;margin-left:2%;margin-top:5px" @click="goRegister">去注册</mt-button>
        </div>
    </div>
</template>

<script>
import { Field,Button,Indicator,Toast  } from 'mint-ui';
import headerBar from '../components/headerBar'
import axios from '../utils/request'
import { mapActions } from 'vuex'
export default {
    components: {
        Field,
        Button,
        headerBar
    },
    data () {
        return {
            username:"",
            password:""
        }
    },
    methods: {
        ...mapActions({
            'getUserInfo':'user/getUserInfo'
        }),
        handleSubmit () {
            if( !this.username ) {
                Toast({
                    message: '请输入用户名',
                    duration: 2000,
                    position: 'bottom',
                });
                return
            }else if ( !this.password ){
                Toast({
                    message: '请输入密码',
                    duration: 2000,
                    position: 'bottom',
                });
                return
            }
            const params = {
                username: this.username,
                password: this.password
            }
            Indicator.open('加载中...');
            axios({
                url: '/second-hand/login',
                method: 'post',
                data: {...params},
                headers: {'Content-Type': 'application/json'}
            }).then( res => {
                Indicator.close()
                if (res.code !== 0 ) return
                if (res && res.data.length >= 1){
                    window.localStorage["token"] = JSON.stringify(res.data);
                    this.getUserInfo()
                    this.$router.push('/');
                }else {
                    window.localStorage["token"] = ''
                }
            })
        },
        //去注册页面
        goRegister () {
            this.$router.push('/register');
        }
    }
}
</script>

<style scoped>
.login{
    height: 100vh;
}
.topbar {
    text-align: center;
    font-size: 15px;
    line-height: 30px;
    padding: 5px;
    padding-top: 7px;
}
.logo{
    margin-top: 15px;
    margin-bottom: 25px;
    text-align: center;
}
</style>