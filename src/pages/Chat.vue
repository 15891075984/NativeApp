<!--
 * @Author: your name
 * @Date: 2020-03-08 12:20:00
 * @LastEditTime: 2020-04-22 22:57:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\notFound.vue
 -->
<template>
    <div style="height:100vh;overflow:auto;padding:10px 0;background:#eee" ref="chat">
        <headerBar title="与弟弟聊天"></headerBar>
        
        <div class="chat-wrapper" ref="chat-wrap">
            <mt-loadmore    :top-method="loadTop"
                            topPullText=""
                            topDropText=""
                            topLoadingText=""
                            :topDistance="50"  ref="loadmore">
                <ul style="padding-bottom: 160px;padding-top:50px;" ref="chat-ul">
                    <li class="chat-item" v-for="(item,index) in list" :key="index">
                        <div class="item-you" v-if="handleFromOrTo(item)">
                            <img src="../assets/img/avatar.jpg" alt="" style="width:30px;height:30px;border-radius:5px">
                            <p class="item-message">{{item.message}}</p>
                        </div>
                        <div class="item-me" v-else>
                            <p class="item-message">{{item.message}}</p>
                            <img src="../assets/img/avatar.jpg" alt="" style="width:30px;height:30px;border-radius:5px">
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
        <div class="chat-input">
            <div class="textarea-wrapper">
                <pre class="content">{{value}}</pre>
                <textarea
                    v-model="value"
                    placeholder=""
                ></textarea>
            </div>
            <span class="chat-submit" @click="submit">发送</span>
        </div>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { CellSwipe,Loadmore   } from 'mint-ui';
import axios from '../utils/request'

export default {
    components: {
        headerBar,
        CellSwipe,
        Loadmore
    },
    data () {
        return {
            allLoaded:true,
            count: 0,
            value:'socket',
            list:[],
            uid:''
        }
    },
    mounted () {
        this.uid = this.$route.params.uid
        // this.socket=io('ws://47.93.117.14:8080/second-hand/chat/'+ this.uid)
        // this.socket.on('open', function(){
        //     console.log(8888)
        // });
        // this.socket.on('event', function(data){});
        this.ws = new WebSocket('ws://47.93.117.14:8080/second-hand/chat/'+ this.uid);
        var _that = this
        this.ws.onopen = function() {
            // Web Socket 已连接上，使用 send() 方法发送数据
//               var data = {"userId":"36","message":"你好,4号,我是张小坚"}
//                   // Web Socket 已连接上，使用 send() 方法发送数据
//                   this.ws.send(JSON.stringify(data));
         const height = _that.$refs['chat-ul'].offsetHeight
            console.log(height)
            _that.$nextTick(()=>{
                //用户每次收发到消息，可以获取ul高度。。scroll跳转到最底部
                _that.$refs['chat'].scrollTop = (0 , 99999)
            })
        };
        
        this.ws.onmessage = function (evt) {
            if (evt.data === '发送成功' || evt.data === '出现错误 ：连接已经存在') {return}
            var received_msg = JSON.parse(evt.data);
            var message = received_msg.message
            console.log(message)
            let datass = JSON.stringify(_that.list)
            _that.list = JSON.parse(datass)
            _that.list.push({
                fromUid: 'grejw',
                message
            })
            const height = _that.$refs['chat-ul'].offsetHeight
            console.log(height)
            _that.$nextTick(()=>{
                //用户每次收发到消息，可以获取ul高度。。scroll跳转到最底部
                _that.$refs['chat'].scrollTop = (0 , height)
            })
        };
        this.loadTop()
        // ws.onclose = function() {
        //     // 关闭 websocket
        //     console.log("连接已关闭...");
        // };
        //主动去触发后端的事件，发送参数text
        // socket.emit('message',{text:'socket'})
        // //给后端定义的事件，等待后端触发
        // socket.on('receMsg',function(data){
        //     console.log(data)
        // })
        // const from = this.$route.params.meta.from
        // if (from === 'goods'){
        //     console.log('goods')
        // }
        setTimeout(()=>{
            const height = _that.$refs['chat-ul'].offsetHeight
            this.$refs['chat'].scrollTop = (0 , height)
        },300)
    },
    methods: {
        handleFromOrTo (item) {
            return !(item.fromUid == this.uid)
        },
        submit () {
            if( !this.value ) return
            var data = {userId:36,message:this.value}
            this.ws.send(JSON.stringify(data));
            console.log("发送数据", data);
            
            this.list.push({
                fromUid: this.uid,
                message: this.value
            })
            this.value = ''
            const height = this.$refs['chat-ul'].offsetHeight
            this.$nextTick(()=>{
                //用户每次收发到消息，可以获取ul高度。。scroll跳转到最底部
                this.$refs['chat'].scrollTop = (0 , height)
            })
        },
        //加载之前聊天记录
        loadTop () {
            axios.get(`/api/message/chat/history`)
            .then( res => {
                //let data = JSON.parse(res.data)
                let keys = Object.keys(res.data)
                this.list = res.data[keys[0]]
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
.chat-wrapper{
    padding-bottom: 18px;
    height: 84vh;
}
.chat-item{
    padding: 7px;
    .item-you{
        display: flex;
        .item-message{
            margin-left: 10px;
            // min-width: 70%;
            max-width: 70%;
            padding: 10px 10px;
            background: #fff;
            font-size: 14px;
            line-height: 20px;
            border-radius: 7px;
            position: relative;
        }
        .item-message::before{
            display: block;
            width: 0;
            height: 0;
            content:'';
            border-width: 5px;
            border-style: solid;
            border-top-color: #eee;
            border-bottom-color: #eee;
            border-left-color: #eee;
            border-right-color: #fff;
            position: absolute;
            left: -10px;
            top: 13px;
        }
    }
    .item-me{
        display: flex;
        justify-content: flex-end;
        .item-message{
            margin-right: 10px;
            // min-width: 70%;
            max-width: 70%;
            padding: 10px 10px;
            background: #fff;
            font-size: 14px;
            line-height: 20px;
            border-radius: 7px;
            position: relative;
        }
        .item-message::before{
            display: block;
            width: 0;
            height: 0;
            content:'';
            border-width: 5px;
            border-style: solid;
            border-top-color: #eee;
            border-bottom-color: #eee;
            border-right-color: #eee;
            border-left-color: #fff;
            position: absolute;
            right: -10px;
            top: 13px;
        }
    }
}
.chat-input{
    font-size: 14px;
    position: fixed;
    bottom: 0;
    min-height:40px;
    width: 100% ;
    background: #eee;
    padding: 6px 5px;
    display: flex;
    border-top: 0.5px solid #bbb;
    
    // padding-left:10px;
    // textarea{
    //     margin-top: 2px;
    //     // min-height: 36px;
    //     flex: 1;
    //     border-radius: 7px;
    //     border: 0;
    //     padding: 0 5px;
    // }
    .chat-submit{
        width: 50px;
        text-align: center;
        line-height: 30px;
        height:30px;
        padding: 2px 5px;
        margin-top: 3px;
        background: chartreuse;
        color: #fff;
        margin-left: 15px;
        margin-right:10px;
        border-radius: 5px;
        position: absolute;
        bottom: 9px;
        right: 5px;
        
    }
}
.textarea-wrapper{
    position: relative;
    min-height : 20px;
    margin-right: 78px;
    margin-bottom: 3px;
    flex:1;
    textarea{
        margin-top: 2px;
        flex: 1;
        border-radius: 10px;
        border-color:#fff;
        padding: 0 5px;
    }
}
.content{
    display :block;
    visibility: hidden;
    font-size: 14px;
    width: 72vw;
    color: #333333;
    line-height: 1.3;
    word-wrap:break-word;
    font-family: SourceHanSansCN-Regular;
    padding :0;
}
.textarea-wrapper textarea{
    overflow:hidden;
    resize:none;
    min-width: 97%;
    max-width: 97%;
    height: 100%;
    font-family: SourceHanSansCN-Regular;
    border: 0;
    font-size: 14px;
    color: #333333;
    line-height: 1.3;
    padding : 0px 5px;
    position: absolute;
    left :0;
    top: 0;
}
</style>
