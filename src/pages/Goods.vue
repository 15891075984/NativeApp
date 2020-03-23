<!--
 * @Author: your name
 * @Date: 2020-03-10 11:11:37
 * @LastEditTime: 2020-03-23 15:21:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Goods.vue
 -->
<template>
	<div class="wrap">
		<headerBar title="宝贝详情"></headerBar>
		<div class="goods-title" @click="goUserDetail">
			<div class="goods-avatar">
				<img src="./../assets/img/avatar.jpg" alt="" style="width:50px;height:50px;border-radius:7px">
			</div>
			<div class="goods-username">
				<p class="uname">{{goods.userName}}</p>
				<p class="address">{{goods.userAddress}}</p>
			</div>
			<div class="goods-follow">
				<mt-button type="default" @click="handleStatus" :class="{follow: status === 0}">{{status ? '关注' : '取关'}}</mt-button>
			</div>
		</div>
		<div class="goods-content">
			<div class="goods-price">
				￥
				<span>{{goods.productPrice}}</span>
			</div>
			<div class="content-title">
				{{goods.productName}} 包邮
				<p style="line-height:25px;color:#aaa">{{goods.updateTime}}</p>
			</div>
			<div class="content-con">
				<p>商品描述：</p>
				<p>
					{{goods.productContent}}
				</p>
				<div class="content-img">
					<p>本交易仅支持邮寄</p>
					<img :src="item.productPic"  v-for="item in goods.productPics" :key="item.productPic">
				</div>
			</div>
		</div>
		<div class="goods-message">
			<div class="message-title">
				全部留言
			</div>
			<div class="message-item" v-for="item in goods.leaveMessages">
				<div class="item-img">
					<img src="../assets/img/avatar.jpg" alt="" >
				</div>
				<div class="item-name">
					<p class="name">{{item.uname}}</p>
					<div class="message">{{item.message}}</div>
				</div>
			</div>
		</div>
		<div class="goods-bottom">
			334
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import headerBar from '../components/headerBar'
import axios from '../utils/request'
import { Field } from 'mint-ui';
export default {
	data () {
		return {
			show: true,
			status:true,
			goods: 
                {
                    id:2,
                    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477189&di=53c877d6ca7b24501d23661c44b5c248&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201110%2F26%2F20111026224810_i3XJ3.jpg',
                    desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
                    price: 99,
                    addr:'中山',
                    time:'2020-2-20'
                },
        }
    },
    components: {
        headerBar
    },
	mounted () {
        //TODO 拿到商品id，传给后端，然后拿取到数据
		const goodsId = this.$route.params.goodsId
		axios.get(`/api/product/search/${goodsId}`).then(res => {
			if( res.code !== 0) return
			console.log(res.data)
			this.goods = res.data
		})
	},
	methods: {
		handleStatus() {
			
		},
		//去用户详情
		goUserDetail () {
			this.$router.push({
				name: 'UserDetail',
				params: {
					userId: this.goods.userId
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.wrap{
	padding: 25px 15px;
	color: #000;
	height: 96vh;
	overflow: auto;
	padding-bottom:25px;
	font-size: 14px;
	.goods-title{
		display: flex;
		padding-bottom: 10px;
		border-bottom: 0.5px solid #eee;
		.goods-username{
			padding: 2px 10px;
			flex:1;
			.uname{
				font-size:14px;
				font-weight: 600;
			}
			.address{
				margin-top: 8px;
				color: #aaa;
				font-size: 12px;
			}
		}
		.goods-follow{
			margin-top: 2px;
			border-radius: 20px;
		}
	}
	.goods-content{
		padding: 17px 0px;
		.goods-price{
			color: red;
			margin-bottom: 7px;
			span{
				font-size: 18px;
				font-weight: 700;
			}
		}
		.content-title{
			font-size: 16px;
			margin-bottom: 20px
		}
		.content-con{
			font-size: 16px;
			line-height: 26px;
			.content-img{
				margin-top: 20px;
				img{
					width: 100%;
					border-radius: 15px;
				}
			}
		}
	}
	.goods-message{
		.message-title{
			font-size: 16px;
			font-weight: 600;
			padding: 10px;
			padding-left: 0;
			border-bottom:0.5px solid #eee;
		}
		.message-item{
			padding: 13px 10px 15px 10px;
			padding-left: 0;
			display: flex;
			align-items: top;
			border-bottom: 0.5px solid #eee;
			.item-img{
				img{
					width: 50px;
					border-radius: 5px;
					vertical-align: center;
				}
			}
			.item-name{
				padding-left: 10px;
				font-size: 16px;
				.name{
					line-height: 50px;
					font-weight: 600;
					font-size: 16px;
				}
				.message{
					line-height: 30px;
				}
			}
		}
	}
	.goods-bottom{
		position:fixed;
		bottom:0;
		height:40px;
		line-height: 40px;
	}
}
</style>