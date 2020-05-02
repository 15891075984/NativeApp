<!--
 * @Author: your name
 * @Date: 2020-03-08 12:20:00
 * @LastEditTime: 2020-05-02 09:27:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\notFound.vue
 -->
<template>
  <div >
     <headerBar title="我的消息"></headerBar>
    <mt-loadmore :top-method="loadTop"
                  topPullText='下拉加载...'
                  topLoadingText='释放刷新...'
                  ref="loadmore" :topDistance="100">
    <div>
    <ul style="margin-top: 80px; height:88vh;overflow:auto;margin-bottom:70px" >
      <li class="message-item" v-for="item in list" @click="goChatting(item.uid)">
        <div>
          <img :src="item.icon" alt=""  class="avatar">
        </div>
        <div style="display: flex;flex: 1; border-bottom: 0.5px solid #eee;padding-bottom:5px">
          <div class="left" style="flex: 1;padding:3px 0 5px 10px">
            <div class="username" style="font-weight:700;margin-bottom:8px">{{item.name}}</div>
            <div class="message" style="color:#aaa;margin-bottom:5px">
              你有一条新消息
            </div>
            <div class="time"  style="color:#aaa;font-size:12px">
              {{item.timeDf}}前
            </div>
          </div>
          <div class="right">
            <img :src="item.img" alt="" style="width: 70px;height: 70px;">
          </div>
        </div>
      </li>
    </ul>
    <div slot="top" class="mint-loadmore-top ">
      <div v-show="allLoaded !== 'loading'">
        加载最新...
        <div style="height:40px;" class="an">
          <img src="../assets/img/加载4.png" alt="" style="height:100%">
        </div>
      </div>
    </div>
  </div>
  </mt-loadmore>
    <tabBar></tabBar>
  </div>
  
</template>

<script>
import tabBar from '../components/tabBar'
import headerBar from '../components/headerBar'
import { Loadmore,Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import axios from '../utils/request'
export default {
  components: {
      tabBar,
      headerBar
  },
  data () {
    return {
      allLoaded:true,
      list:[]
    }
  },
  computed: {
    ...mapState({
      user:'user'
    })
  },
  mounted () {
    
    this.getUnread()
    this.getMessageList()
  },

  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      Indicator.open('正在加载数据中...')
      setTimeout(()=>{
        this.list.splice(0,0,'334')
        Indicator.close()
      },2000)
    },

    goChatting (value) {
      this.$router.push({
        name:'Chat',
        params: {
          uid: value
        }
      })
    },

    getMessageList () {
      console.log(999,this.user.userInfo)
      axios.get(`/api/message/notification/${this.user.userInfo.uid}`).then(res=>{
        this.list = res.data
      })
    },
    getUnread () {
      axios.get(`/api/message/chat/unread`).then(res=>{
        // this.list = res.data
      })
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

<style lang="scss" scoped>
.message-item{
  display: flex;
  font-size: 14px;
  color: #000;
  padding: 7px 15px;
  margin-bottom: 10px;
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 7px;
    .content{
      display: flex;
      flex: 1;
      .left{
        flex: 1;
      }
      .right{
        img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
.message-item:last-child{
  padding-bottom: 40px!important;
}
</style>