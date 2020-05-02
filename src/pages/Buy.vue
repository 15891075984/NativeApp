<!--
 * @Author: your name
 * @Date: 2020-03-25 16:39:27
 * @LastEditTime: 2020-05-02 20:51:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Buy.vue
 -->
<template>
    <div class="buy">
        <headerBar title="购买宝贝"></headerBar>
        <div class="buy-wrapper">
            <div class="title">
                <div class="title-img">
                    <img :src="goods.goods.productPics[0].productPic" alt="" style="width:100px;height:100px">
                </div>
                <div class="title-content">
                    <p class="title-content-con">
                        {{goods.goods.productContent}}
                    </p>
                    <p class="title-content-price red">
                        ￥{{goods.goods.productPrice}}
                    </p>
                </div>
            </div>
            <div class="content">
                <div class="address">
                    <div class="label">收货地址</div>
                    <div class="address-content">广东省中山市</div>
                </div>
                <div class="address">
                    <div class="label">数量</div>
                    <div class="address-content">{{goods.goodsCount}}个</div>
                </div>
                <div class="carriage address">
                    <div class="">运费</div>
                    <div class="address-content red">￥0</div>
                </div>
            </div>
            <div class="bottom">
                <div class="pay">
                    实付款: 
                    <span class="red">￥{{goods.goods.productPrice * goods.goodsCount}}</span>
                </div>
                <div class="submit" @click="handleSubmit">立即下单</div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import {mapState,mapActions,Range} from 'vuex'
import { CellSwipe,Loadmore,MessageBox  } from 'mint-ui';
import axios from '../utils/request'
export default {
    components: {
        headerBar
    },
    data () {
        return {
            orderId: null
        }
    },
    mounted () {
        if (Object.keys(this.goods.goods).length ===0 ) {
            this.$router.go(-1)
            return
        }
        this.getOrderId(this.goods.goods.id)
    },
    computed:{
        ...mapState({
            goods:'goods',
            user:'user'
        })
    },
    methods: {
        handleSubmit () {
            const params = {
                orderid: this.orderId,
                productid: this.goods.goods.id.toString(),
                uid: this.user.userInfo.uid,
            }
            axios({
                url: '/api/order',
                method: 'post',
                data: {...params},
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                if(res.code !== 0) return
                MessageBox.confirm('下单成功，去支付').then(action => {
                    axios({
                        url: '/api/order/pay',
                        method: 'post',
                        data: {...params},
                        headers: {'Content-Type': 'application/json'}
                    }).then(response => {
                        if(response.code !== 0) return
                        MessageBox.alert('付款成功').then(action => {
                            this.$router.push('me')
                        })
                    })
                });
            })
        },
        getOrderId (goodsId) {
            const params = {
                productId: goodsId
            }
            axios.get('/api/order/getId',params).then(res => {
                if (res.code !== 0 ) return
                this.orderId = res.message
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.buy{
    height: 100vh;
    font-size: 0;
    background: #f7f7f7;
    .buy-wrapper{
        padding-top: 11px;
        .title{
            display: flex;
            background: #fff;
            .title-img{
                // margin-right: 25px;
            }
            .title-content{
                padding:10px 15px;
                font-size: 14px;
            }
            .title-content-price{
                margin-top: 15px;
                font-weight: 700;
                font-size: 14px;
                color: red;
            }
        }
        .content{
            margin-top: 10px;
            font-size: 14px;
            background:#fff;
            padding-bottom:0;
            .address{
                display: flex;
                height:60px;
                line-height: 60px;
                border-bottom: .5px solid #f7f7f7;
                .address-content{
                    flex:1;
                    text-align: right;
                }
            }
        }
    }
    .red{
        color: red;
    }
    .bottom{
        position: fixed;
        height: 50px;
        line-height: 50px;
        bottom:0;
        left:0;
        right: 0;
        padding: 0 10px;
        padding-right: 0;
        font-size: 14px;
        display: flex;
        background: #fff;
        .pay{
            flex:1
        }
        .submit{
            width: 80px;
            padding: 0 auto;
            text-align: center;
            background-color: red;
            color:#fff;
        }
    }
}
</style>