<!--
 * @Author: your name
 * @Date: 2020-03-10 10:15:22
 * @LastEditTime: 2020-05-06 11:32:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\PublishList.vue
 -->
<template>
    <div>
            <div class="item-header" @click="goGoodDetail">
                <div class="header-img">
                    <img :src="goods.userHeaderPicture" alt="" v-lazy="goods.userHeaderPicture">
                    <span>{{goods.sellerName}}</span>
                </div>
                <div class="price">￥{{goods.productPrice}}</div>
            </div>
            <div class="item-content" @click="goGoodDetail">
                <div class="content-img">
                    <img :src="goods.productPic" alt="" v-lazy="goods.productPic">
                </div>
                <p class="desc">{{goods.productName}}</p>
                <div class="item-bottom">
                    <div class="kinds">
                        类别:{{goods.productTag}}
                    </div>
                    <div class="update-time">
                        发布时间:{{goods.productCreateTime}}
                     </div>
                </div>
            </div>
            <div class="item-delete" style="right:60px" v-if="user.handle === 'down'">
                <mt-button  plain type="primary" size="small" @click="upMyPublish" class="delete-btn">上架</mt-button>
            </div>
            <div class="item-delete">
                <mt-button v-if="user.handle === 'deleteBuy' || user.handle === 'deleteSell' || user.handle === 'deletePublish'" plain type="danger" size="small" @click="deleteMyPublish(user.handle)" class="delete-btn">删除</mt-button>
                <mt-button v-else plain type="primary" size="small" @click="downMyPublish" class="delete-btn">下架</mt-button>
            </div>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { Button } from 'mint-ui';
import axios from '../utils/request'
import { mapState,mapMutations,mapActions } from 'vuex';
export default {
    components: {
        headerBar,
        Button
    },
    props:['goods'],
    data () {
        return {}
    },
    mounted () {
        console.log(this.user.handle)
    },
    computed:{
        ...mapState({
            user:'user'
        })
    },
    methods: {
        ...mapActions({
            'submitPublish':'goods/submitPublish',
        }),
        ...mapMutations({
            'setPublishImg':'goods/setPublishImg',
        }),
        deleteMyPublish(validate) {
            console.log(validate)
            if (validate === 'deleteBuy') {
                axios.delete(`/api/userBuy/${this.goods.id}`)
            }
            if (validate === 'deleteSell') {
                axios.delete(`/api/userSale/${this.goods.id}`)
            }
            // axios.delete(`/api/product/delete/${this.goods.id}`)
        },
        downMyPublish () {
            axios.get(`/api/product/changeStatus/${this.goods.id}`).then( res => {
                if (res.code !== 0) return
                this.$router.go(-1)
            })
        },
        upMyPublish () {

        },
        goGoodDetail () {
            this.$router.push({
                name:'goods',
                params:{
                    goodsId:this.goods.id
                }
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.publish-list{
     height: 100vh;
    overflow: auto;
    padding-top: 12px;
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