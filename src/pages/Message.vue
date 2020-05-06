<!--
 * @Author: your name
 * @Date: 2020-03-08 12:20:00
 * @LastEditTime: 2020-05-06 22:04:23
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
      <li v-for="it in sysNotice" style="display:flex;padding: 7px 15px;margin-bottom:5px;color:#F9CE00;font-size:18px;line-height:20px" @click="goSysNotice(it)">
        <div style="margin-right:20px">系统通知 : </div>
        <div style="flex:1">{{it.title}}</div>
      </li>
      <li v-for="ite in noticeList" style="display:flex;padding: 7px 15px;margin-bottom:5px" @click="goGoods(ite)">
        <div>
          <img :src="ite.icon" alt="" class="avatar" style="width:50px;height:50px">
        </div>
        <div style="flex:1;margin-left:15px;padding-top:10px;color:#f40">
          <div style="margin-bottom:6px">{{ite.name}}</div>
          <p>发布了一条新的商品，快去看看吧</p>
        </div>
        <div class="right">
          <img :src="ite.icon" alt="" style="width: 70px;height: 70px;">
        </div>
      </li>
      <li class="message-item" v-for="item in userList" @click="goChatting(item.toUid, item.uid, item.name)" >
        <div>
          <img :src="item.icon" alt=""  class="avatar">
        </div>
        <div style="display: flex;flex: 1; border-bottom: 0.5px solid #eee;padding-bottom:5px">
          <div class="left" style="flex: 1;padding:3px 0 5px 10px">
            <!-- <div class="username" style="font-weight:700;margin-bottom:8px"></div> -->
            <div class="message" style="color:#aaa;margin-bottom:5px">
              你有一条新消息
              <!-- <div style="color:#525252">{{item[0].message}}</div> -->
            </div>
            <div class="time"  style="color:#aaa;font-size:12px;margin-top: 15px">
              时间：{{item.updateTime}}
            </div>
          </div>
          <div class="right">
            <img :src="meAvator" alt="" style="width: 70px;height: 70px;">
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
import { Loadmore, Indicator, Popup } from 'mint-ui';
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
      list:{},
      userList: [],
      avatar: '',
      noticeList: [],
      sysNotice: []
    }
  },
  computed: {
    ...mapState({
      user:'user'
    }),
    meAvator () {
        return localStorage.meAvator
    }
  },
  mounted () {
    //this.getUnread()
    if(!this.user.userInfo.uid){
      setTimeout(()=>{
        this.getNotification()
        this.getChatList()
        this.getSystemNotice()
      },300)
    }else{
      this.getNotification()
      this.getChatList()
      this.getSystemNotice()
    }
  },

  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      // Indicator.open('正在加载数据中...')
      // setTimeout(()=>{
      //   this.list.splice(0,0,'334')
      //   Indicator.close()
      // },2000)
      this.getNotification()
      this.getChatList()
      this.getSystemNotice()
    },
    goSysNotice (value) {

      localStorage.sysDetail = JSON.stringify(value)
      this.$router.push({
        name:'SysDetail',
        params: {
          id: value.noticeId
        }
      })
    },
    getChatList () {
      axios.get(`/api/message/chat/chatList`).then(res=>{
        this.userList = res.data
      })
    },

    goGoods (value) {
      this.$router.push({
				name:'goods',
				params: {
					goodsId: value.productId
				}
			})
    },
    getSystemNotice () {
      axios.get('/api/notice/query').then(res=> {
        this.sysNotice = res.data.splice(0,1)
      })
    },
    goChatting (value, toUid, username) {
      const tmpArr = this.userList.filter(item => {
        if(item.toUid == value) {
          return true
        }
      })
      if (tmpArr.length > 0) {
          localStorage.chatAvator = tmpArr[0].icon
        }else {
          localStorage.chatAvator = ''
      }
      localStorage.chatName = username
      this.$router.push({
        name:'Chat',
        params: {
          uid: value,
          to: toUid
        }
      })
    },
    calcAvatarPath (fromUid) {
      const tmpArr = this.userList.filter(item => {
        if(item.toUid == fromUid) {
          return true
        }
      })
      if (tmpArr.length > 0) {
        return  tmpArr[0].icon
      }else {
        return ''
      }
    },
    getUnread () {
      axios.get(`/api/message/chat/unread`).then(res=>{
        this.list = res.data
      })
    },
    getNotification () {
      axios.get(`/api/message/notification/${this.user.userInfo.uid}`).then(res=>{
        this.noticeList = res.data
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