<!--
 * @Author: your name
 * @Date: 2020-03-13 20:53:54
 * @LastEditTime: 2020-03-13 22:05:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Register.vue
 -->
<template>
    <div class="login">
        <!-- <div class="topbar bg"></div> -->
        <headerBar title="注册"></headerBar>
        <div class="logo">
            <img src="../assets/img/闲鱼.png" style="width:100px;height:100px;margin-top:25px" alt="">
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="请输入确认密码" type="password" v-model="repeatPassword"></mt-field>
        <mt-field ></mt-field>
        <div>
            <mt-button type="primary" style="width:96%;margin-left:2%" @click="handleReister"> 注 册</mt-button>
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
            username:"123456",
            password:"123456",
            repeatPassword:"123456",
            email:"123456@qq.com"
        }
    },
    methods: {
        ...mapActions({
            'getUserInfo':'user/getUserInfo'
        }),
        handleReister () {

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
            }else if ( !this.email ){
                Toast({
                    message: '请输入邮箱',
                    duration: 2000,
                    position: 'bottom',
                });
                return
            }else if ( this.password !== this.repeatPassword){
                Toast({
                    message: '两次输入密码不同',
                    duration: 2000,
                    position: 'bottom',
                });
                return
            }


            const params = {
                username: this.username,
                password: this.password,
                email: this.email
            }
            if ( this.password.length <= 5 ){
                Toast({
                    message: '密码最小六位，请重试',
                    duration: 2000,
                    position: 'bottom',
                });
                return
            }
            Indicator.open('注册中...');
            axios({
                url: '/register',
                method: 'post',
                data: {...params},
                headers: {'Content-Type': 'application/json'}
            }).then( res => {
                console.log(4444, res)
                Indicator.close()
                this.$router.push('/login');
                console.log(123)
                window.localStorage["token"] = ''
            })
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