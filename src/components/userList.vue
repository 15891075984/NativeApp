
<template>
    <div class="user">
        <img :src="userValue.icon" alt="" v-lazy="userValue.icon" @click="goUserDetail">
        <div class="username" @click="goUserDetail">
            <p class="name">{{userValue.uname}}</p>
            <p class="desc">{{userValue.userResume || '这个人很懒，什么都没留下'}}</p>
        </div>
        <div class="follow">
            <mt-button type="default" @click="handleStatus" :class="{follow: status === 0}">{{status ? '关注' : '取关'}}</mt-button>
        </div>
        <!-- <div class="sex">{{userValue.userSex ? '男': '女'}}</div> -->
    </div>
</template>

<script>
import axios from '../utils/request'
export default {
    props:['userValue'],
    data() {
        return {
            status: 0
        }
    },
    mounted () {
        this.status = this.userValue.status
    },
    methods: {
        handleStatus () {
            this.status = this.status ? 0 : 1
            this.$emit('updateStatus', this.userValue.uid, this.status)
            //TODO 切换关注状态
            // axios.get('/api/Graph',{
            //     params:{
            //         uid: this.status
            //     }
            // })
        },

        //用户详情
        goUserDetail () {
            this.$router.push({
                name: 'UserDetail',
                params: {
                    userId: this.userValue.uid
                }
            })
        }
    },
    watch: {
        status (news) {
            console.log(news)
        }
    }
}
</script>

<style scoped>
.user{
    padding: 0 5px;
    display: flex;
    align-items: center;
    margin-top: 15px;
}
.user img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
.user .username{
    margin-left: 15px;
    font-size: 16px;
    flex:1
}
.user .username .name{
    font-size: 18px;
    color: #ffda44;
    margin-bottom: 5px;
}
.user .username .desc{
    color: #aaa;
    font-size: 14px;
}
.user .sex{

}
.user .follow{
    /* margin-right: 10px; */
}
.follow{
    background: #ffda44;
    border-radius: 5px;
}
</style>
