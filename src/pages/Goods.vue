<!--
 * @Author: your name
 * @Date: 2020-03-10 11:11:37
 * @LastEditTime: 2020-05-06 18:31:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Goods.vue
 -->
<template>
	<div class="wrap">
		<headerBar title="宝贝详情"></headerBar>
		<div class="goods-title">
			<div class="goods-avatar"  @click="goUserDetail">
				<img :src="goods.goods.icon" alt="" style="width:50px;height:50px;border-radius:7px" v-lazy="goods.goods.icon">
			</div>
			<div class="goods-username"  @click="goUserDetail">
				<p class="uname">{{goods.goods.userName}}</p>
				<p class="address">{{goods.goods.userAddress}}</p>
			</div>
			<!-- <div class="goods-follow">
				<mt-button type="default" @click="handleStatus" :class="{follow: status === 0}">{{status ? '关注' : '取关'}}</mt-button>
			</div> -->
		</div>
		<div class="goods-content">
			<div class="goods-price">
				￥
				<span>{{goods.goods.productPrice}}</span>
			</div>
			<div class="content-title">
				{{goods.goods.productName}} （包邮）
				<p style="line-height:25px;color:#aaa"> 发布时间 : {{goods.goods.updateTime}}</p>
			</div>
			<div class="content-con">
				<p >商品描述：</p>
				<p >
					{{goods.goods.productContent}}
				</p>
				<div class="content-img">
					<p style="color:red">本交易仅支持邮寄</p>
					<img :src="item.productPic"  
						v-for="item in goods.goods.productPics"
						v-lazy="item.productPic"
						:key="item.productPic">
				</div>
				<div class="goods-message">
					<div class="message-title">
						全部留言
					</div>
					<div class="message-item" v-for="item in leaveMessage">
						<div class="item-img">
							<img :src="item.parentComments.icon" alt="" >
						</div>
						<div class="item-name" @click="handleMessageState(item.parentComments.commentId)">
							<div class="name" >
								<div style="line-height:18px;margin-bottom:5px">{{item.parentComments.uname}}</div>
								<div style="line-height:14px;font-size:12px;color:#ccc">{{item.parentComments.createTime}}</div>
							</div>
							<div style="position:absolute;right:25px"></div>
							<div class="message">{{item.parentComments.message}}</div>
							<div class="children-message" v-if="item.childrenComments.length >= 1">
								<div v-for="ite in item.childrenComments" @click="handleMessageState(item.parentComments.commentId)">
									{{ite.uname}} : 
									{{ite.message}}
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="goods-bottom" v-if="!messageState">
			<div class="goods-item-left">
				<div class="goods-bottom-like items" @click="handleLike">
					<i :class="['iconfont','icon-dianzan',{iconActive:likeActive}]"></i>
					<span style="font-size:12px">点赞</span>
				</div>
				<div class="goods-item-message items" @click="handleMessageState(null)">
					<i :class="['iconfont','icon-liuyan']"></i>
					<span style="font-size:12px">留言</span>
				</div>
				<div class="goods-item-collect items" @click="handleCollect">
					<i :class="['iconfont','icon-shoucang-active',{iconActive:collectActive}]"></i>
					<span style="font-size:12px">收藏</span>
				</div>
			</div>
			<div class="goods-item-right" @click="goChat">
				我想要
			</div>
			<div class="goods-item-right" @click="goBuyPage" style="margin-left:15px">
				购买
			</div>
		</div>
		<div class="goods-bottom" v-if="messageState" style="padding-right:0;background:#fff">
			<input label="" 
						ref="goodsmessage"
						placeholder="请输入评价" 
						v-model="message"
						style="flex:1;margin-right:10px;margin-left:10px;height:42px;border:0.5px solid #aaa;border-radius:10px;padding-left:10px" ></input>
			<mt-button size="normal" style="color:#fff;background: chartreuse;margin-right:10px" @click="submitMessage">评价</mt-button>
			<mt-button size="normal" style="color:#fff;background: red;margin-right:10px;" @click="cancelMessage">取消</mt-button>
		</div>
		<mt-popup
			v-model="popupVisible"
			popup-transition="popup-fade"
			position="bottom">
			<div class="buy-goods" style="">
				<div class="count">
					<div class="count-label">
						<div>购买数量</div>
						<div style="color: #f40">{{goods.goodsCount}}</div>
					</div>
					<div class="count-num">
						<mt-range
							v-model="goods.goodsCount"
							:min="0"
							:max="20"
							:step="1"
							:bar-height="5">
							<div slot="start">0</div>
							<div slot="end">20</div>
						</mt-range>
					</div>
				</div>
				<div class="goods-submit" @click="goBuy">立即购买</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
import {mapState,mapActions,Range} from 'vuex'
import headerBar from '../components/headerBar'
import axios from '../utils/request'
import { Field,Indicator,Popup } from 'mint-ui';
export default {
	data () {
		return {
			show: true,
			status:0,
			likeActive: false,
			collectActive: false,
			message:'',
			messageState: false,
			sendMessage: false,
			popupVisible: false,
			rangeValue:1,
			goodsId:''
        }
    },
    components: {
		headerBar,
		Indicator
	},
	computed:{
		...mapState({
			goods:'goods',
			user:'user',
		}),
		leaveMessage () {
			console.log(this.goods.leaveMessage)
			return this.goods.leaveMessage
		}
	},
	mounted () {
		this.goodsId = this.$route.params.goodsId
		this.getGoodsDetail()
		//this.goodsId = 892
		this.getLeaveMessage({id: this.goodsId})
	},
	methods: {
		...mapActions({
			getGoods:'goods/getGoods',
			getLeaveMessage: 'goods/getLeaveMessage'
		}),
		getGoodsDetail () {
			this.getGoods({goodsId:this.goodsId})
		},
		handleMessageState(value) {
			this.commitId = value
			this.messageState = true
			this.$nextTick(()=>{
				this.$refs['goodsmessage'].focus()
			})
		},
		handleMessageBlur (e) {
			if (this.sendMessage) {
				this.messageState = false
			}
		},
		//发送评论
		submitMessage() {
			if( !this.message ) return
			const data = {
				productId:this.goods.goods.id,
				message: this.message,
				commentPid: 0
			}
			let url = '/api/productComment/addProductComment'
			if ( this.commitId !== 0) {
				data.commentPid = this.commitId,
				url = '/api/productComment/addProductComment'
			}
			axios({
				url,
				method: 'post',
				data,
				header:{
					headers: {'Content-Type': 'application/json'}
				}
			}).then(res => {
				this.messageState = false
				this.message = ''
				this.$nextTick(()=>{
					this.messageState = false
				})
				this.getLeaveMessage({id: this.goodsId})
				if(res.code !==0 ) return
			})
		},
		//去用户详情
		goUserDetail () {
			this.$router.push({
				name: 'UserDetail',
				params: {
					userId: this.goods.goods.userId
				}
			})
		},
		//点赞
		handleLike() {
			// axios
			// /second-hand/api/userPraise/praiseStatus
			let data = {
				productId: this.goods.goods.id,
				status: 1
			}
			if (this.likeActive) {
				//取消点赞
				data.status = 1
			}else {
				//点赞
				data.status = 0
			}
			axios({
				url:'/api/userPraise/priseStatus',
				method:'POST',
				data,
				header:{
					'Content-Type':'application/json'
				}
			}).then(res=>{
				this.likeActive = !this.likeActive
			})
		},
		//收藏
		handleCollect () {
			let data = {
				productId: this.goods.goods.id,
				status: 1
			}
			console.log(222,this.collectActive)
			if (this.collectActive) {
				//取消点赞
			}else {
				//点赞
				data.status = 0
				
			}
			axios({
				url:'/api/userCollect/collectStatus',
				method:'POST',
				data,
				header:{
					'Content-Type':'application/json'
				}
			}).then(res=>{
				this.collectActive = !this.collectActive
			})
		},
		//留言
		handleMessage () {
			
		},
		//我想要，去聊天
		goChat () {
			this.$router.push({
				name:'Chat',
				params: {
					uid: this.goods.goods.userId,
					to: this.user.userInfo.uid
				}
			})
		},
		//去购买
		goBuyPage() {
			console.log(this.goods.leaveMessage)
			this.popupVisible = true
		},
		//去购买
		goBuy() {
			this.$router.push({
				name:'Buy',
			})
		},
		//取消评价
		cancelMessage () {
			this.messageState = false
		},

		//关注
        handleStatus () {
			this.status = this.status ? 0 : 1
			console.log(this.goods.goods)
            const data = {
                uid:this.user.userInfo.uid,
                followid: this.goods.goods.userId,
                status: this.status
            }
            axios({
                url:'/api/Graph',
                method:'POST',
                data,
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                
            })
            //this.$emit('updateStatus', this.userValue.uid, this.status)
            //TODO 切换关注状态
            // axios.get('/api/Graph',{
            //     params:{
            //         uid: this.status
            //     }
            // })
        },
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
		padding-bottom: 80px;
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
				position: relative;
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
		height:50px;
		// line-height: 40px;
		display: flex;
		background:#eee;
		left: 0;
		right: 0;
		padding-right:15px;
		align-items: center;
		.goods-item-left{
			flex:1;
			display: flex;
			align-items: center;
			.items{
				margin:0 8px;
				display: flex;
				margin-right: 15px;
				flex-direction: column;
				align-items: center;
				color:#aaa;
				.iconActive{
					color:#ffda44;
				}
				span{
					margin-top:4px;
				}
			}
		}
		.goods-item-right{
			padding:6px 15px;
			background:crimson;
			border-radius: 15px;
			color:#fff;
			line-height: 20px;
			font-weight: 500;
		}
	}
	.buy-goods{
		height:20vh;
		width:100vw;
		padding-top: 5vh;

		.count{
			display: flex;
			align-items: center;
			padding: 0 15px;
			.count-label{
				margin-right: 30px;
				text-align: center;
			}
			.count-num{
				flex: 1	
			}
		}
		.goods-submit{
			width: 85%;
			background:#f40;
			padding:10px 10px;
			text-align: center;
			margin: 0 auto;
			margin-top: 40px;
			color: #fff;
			font-weight: 500;
			border-radius: 8px;
		}
	}
}
.follow{
	background: #ffda44;
	border-radius: 5px;
}
.children-message{
	margin-top: 5px;
	border-top: .5px solid #eee;
	padding-top: 7px;
	padding-left: 10px;
	
}
</style>