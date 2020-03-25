<!--
 * @Author: your name
 * @Date: 2020-03-08 12:20:00
 * @LastEditTime: 2020-03-25 16:36:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\notFound.vue
 -->
<template>
    <div style="height:100vh;overflow:auto;padding:10px 0;background:#eee" ref="chat">
        <headerBar title="与坚弟弟聊天"></headerBar>
        
        <div class="chat-wrapper" ref="chat-wrap">
            <mt-loadmore    :top-method="loadTop"
                            topPullText=""
                            topDropText=""
                            topLoadingText=""
                            :topDistance="50"  ref="loadmore">
                <ul style="padding-bottom: 160px;padding-top:50px;" ref="chat-ul">
                    <li class="chat-item" v-for="(item,index) in list" :key="index">
                        <div class="item-you" v-if="index % 2 == 0">
                            <img src="../assets/img/avatar.jpg" alt="" style="width:30px;height:30px;border-radius:5px">
                            <p class="item-message">{{item}}</p>
                        </div>
                        <div class="item-me" v-else>
                            <p class="item-message">{{item}}</p>
                            <img src="../assets/img/avatar.jpg" alt="" style="width:30px;height:30px;border-radius:5px">
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
            <!-- <ul style="padding-bottom: 100px; " ref="chat-ul">
                <li class="chat-item" v-for="(item,index) in list" :key="index">
                    <div class="item-you" v-if="index % 2 == 0">
                        <img src="../assets/img/avatar.jpg" alt="" style="width:30px;height:30px;border-radius:5px">
                        <p class="item-message">{{item}}</p>
                    </div>
                    <div class="item-me" v-else>
                        <p class="item-message">{{item}}</p>
                        <img src="../assets/img/avatar.jpg" alt="" style="width:30px;height:30px;border-radius:5px">
                    </div>
                </li>
            </ul> -->
        </div>
        <div class="chat-input">
            <div class="textarea-wrapper">
                <!--pre 文本通常会保留空格和换行符。-->
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
            value:'',
            list:[]
        }
    },
    mounted () {
        // const from = this.$route.params.meta.from
        // if (from === 'goods'){
        //     console.log('goods')
        // }
    },
    methods: {
        submit () {
            if( !this.value ) return
            
            this.list.push(this.value)
            this.value = ''
            const height = this.$refs['chat-ul'].offsetHeight
            this.$nextTick(()=>{
                //用户每次收发到消息，可以获取ul高度。。scroll跳转到最底部
                this.$refs['chat'].scrollTop = (0 , height)
            })
        },
        //加载之前聊天记录
        loadTop () {
            this.count ++
            const data = `${this.count}我真的对她又爱又恨..

                        之前觉得这个红好村哦 素颜涂得

                        但是皮肤养白了点涂就更显白了emm竟然还有一点点喜欢？？ 我一般都薄涂一遍再从中间叠加 这样还挺好看的

                        厚涂绝美哈 薄涂就一般 哑光颜色好看但是干的也快 害

                        今天闲出屁来999叠涂雕牌唇蜜01 太好看了我去`
            const tempArr = []
            for(let i =0;i<=1;i++) {
                tempArr.push(data)
            }
            console.log(tempArr.concat(tempArr))
            this.list = tempArr.concat(this.list)
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
