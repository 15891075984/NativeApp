<!--
 * @Author: your name
 * @Date: 2020-03-10 10:15:22
 * @LastEditTime: 2020-03-23 11:14:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\PublishList.vue
 -->
<template>
    <div class="publish-list">
        <headerBar title="我收藏的"></headerBar>
        <div class="publish-item" v-for="(item) in myPublishData" :key="item.id">
            <myCardList :goods="item"></myCardList>
        </div>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { Button } from 'mint-ui';
import { mapState,mapMutations,mapActions } from 'vuex';
import axios from '../utils/request'
import myCardList from '../components/my-cardList'
export default {
    components: {
        headerBar,
        Button,
        myCardList
    },
    data () {
        return {
            myPublishData:[
                {
                    url:"../assets/img/avatar.png",
                    id:1,
                    name:'好吃的',
                    price: 22,
                    desc:'这真的是好吃的，你信吗',
                    kinds:'商品粮油',
                    updateTime:'2020-03-10 10:14'
                },
                {
                    url:"../assets/img/avatar.jpg",
                    name:'你打野',
                    id:2,
                    price: 999,
                    desc:'真的是打野',
                    kinds:'蓝BUff',
                    updateTime:'2020-03-10 10:14'
                },
                {
                    url:"../assets/img/avatar.png",
                    id:11,
                    name:'好吃的',
                    price: 22,
                    desc:'这真的是好吃的，你信吗',
                    kinds:'商品粮油',
                    updateTime:'2020-03-10 10:14'
                },
                {
                    url:"../assets/img/avatar.jpg",
                    name:'你打野',
                    id:22,
                    price: 999,
                    desc:'真的是打野',
                    kinds:'蓝BUff',
                    updateTime:'2020-03-10 10:14'
                },
                {
                    url:"../assets/img/avatar.png",
                    id:111,
                    name:'好吃的',
                    price: 22,
                    desc:'这真的是好吃的，你信吗',
                    kinds:'商品粮油',
                    updateTime:'2020-03-10 10:14'
                },
                {
                    url:"../assets/img/avatar.jpg",
                    name:'你打野',
                    id:222,
                    price: 999,
                    desc:'真的是打野',
                    kinds:'蓝BUff',
                    updateTime:'2020-03-10 10:14'
                }
            ]
        }
    },
    mounted () {
        //TODO 用户去拉取发布列表
        axios.get('/api/userBuy')
    },
    computed:{
        ...mapState({
            'goods':'goods'
        })
    },
    methods: {
        ...mapActions({
            'submitPublish':'goods/submitPublish'
        }),
        ...mapMutations({
            'setPublishImg':'goods/setPublishImg'
        })
    }
}
</script>

<style scoped lang='scss'>
.publish-list{
     height: 100vh;
    overflow: auto;
    padding-top: 13px;
}
    .publish-item{
        margin-top: 15px;
        background: #fff;
        padding: 10px;
        position: relative;
        font-size: 14px;
        margin-bottom: 50px;
       
        .item-header{
            height:40px;
            position: relative;
            padding-bottom: 5px;
            border-bottom: .5px solid #eee;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: top;
            }
            span{
                line-height: 40px;
                margin-left: 10px;
                font-weight: 500;
            }
            .price{
                position: absolute;
                right:10px;
                top: 0;
                line-height: 30px;
                color: #f40;
            }
        }
        .item-content{
            position: relative;
            padding-bottom: 5px;
            border-bottom: .5px solid #eee;
            padding-top:5px;
            .content-img{
                width: 100px;
                height: 100px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .desc{
                color: #000;
                font-weight: 600;
                margin-top: 10px;
                height: 20px;
                line-height: 20px;
            }
            .item-bottom{
                position: relative;
                font-size: 12px;
                .kinds{
                    line-height: 30px;
                    color: #17abe3;
                    line-height: 30px;
                }
                .update-time{
                    color: #17abe3;
                    position: absolute;
                    top: 0;
                    right: 0;
                    line-height: 30px;
                }
            }
            
        }
        .item-delete{
            position: relative;
            .delete-btn{
                position: absolute;
                right: 0;
                top:5px;
            }
        }
    }
</style>