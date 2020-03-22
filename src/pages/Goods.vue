<template>
	<div class="wrap">
		<headerBar title="宝贝详情"></headerBar>
		<div class="goods">
			<div class="good_top">
				<div class="good_top-avatar" style="display:flex">
					<img src="../assets/img/avatar.jpg" alt="" class="avatar">
					<div class="user-info" style="font-size:14px">
						{{goods.userName}}
						<div>{{goods.userAddress}}</div>
					</div>
				</div>
				<div class="good_top-info">
					<div class="username">{{goods.name}}</div>
					<div class="ta">{{goods.time}}{{goods.add}}</div>
				</div>
				<div class="good_top-price">
					<div class="price">￥{{goods.price}}</div>
				</div>
			</div>
			<div class="good_desc">
				<p class="desc">{{goods.desc}}</p>
			</div>
			<div class="good_img">
				<img src="../assets/img/avatar.jpg" alt="">
				<img src="../assets/img/avatar.jpg" alt="">
				<img src="../assets/img/avatar.jpg" alt="">
				<img src="../assets/img/avatar.jpg" alt="">
			</div>
		</div>
		<div class="messagebox">
			<p class="msg">留言</p>
			<div class="conment">
				<img src="../assets/img/yu.png" alt="" class="bg">
				<p class="nomsg">还没有人留言，还不快来抢沙发</p>
			</div>
			<!-- <div class="conment" v-else>
				<p class="hasmsg">{{message}}</p>
			</div> -->
		</div>
		<div class="block"></div>
		<div class="fixedbottom">
			<div class="message" @click="msg">
				<img src="../assets/img/留言.png" alt="">
				<input type="text" hidden class="hidden">
			    <span class="leabmsg">留言</span>
			</div>
			<div class="givestar" @click="star">
				<img src="../assets/img/赞.png" alt="" v-if="show">
				<img src="../assets/img/赞1.png" alt="" v-else>
				<span class="star">点赞</span>
			</div>
			<div class="buy" @click="buy">我想要</div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import headerBar from '../components/headerBar'
import axios from '../utils/request'
export default {
	data () {
		return {
            show: true,
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
			this.goods = res.data
		})
	},
	methods: {
		msg () {

		},
		star () {
			this.show = !this.show
			// console.log(this.show)
			// this.$store.dispatch('setShow', this.show)
			// if(this.show) {
			// 	this.$store.dispatch('cutLikenum')

			// }else {
			// 	this.$store.dispatch('setLikenum')
			// }
	
		},
		buy () {
			// if(this.isLogin){
			// 	this.$router.push({path:'/chat'})
			// }else {
			// 	this.$router.push({path: '/login'})
			// }
			
		}
	}
}
</script>
<style lang="css" scoped>
.wrap {
	width: 100%;
	height: 100%;
	background-color: #f7f7f7;
	overflow: auto;
}
.head {
	width: 100%;
	height: 4.4rem;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	background-color: #f7f7f7;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.back img{
	width: 3rem;
	height: 3rem;
}
.title {
	flex: 1;
	text-align: center;
	font-size: 1.6rem;
	font-weight: 700;
}
.block{
	height: 4.4rem;
}
.goods {
	width: 100%;
	min-height: 100%;
	padding: 1.5rem 1.2rem;
	box-sizing: border-box;
	background-color: #fff;
}
.good_top {
	width: 100%;
	height: 6rem;
	display: -webkit-flex;
	display: flex;
	align-items: center;
}
.good_top-avatar {
	width: 5rem;
	height: 5rem;
}
.good_top-avatar .avatar {
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
}
.good_top-info {
	margin-left: 1rem;
	flex: 1;
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
}
.good_top-info .username {
	color: #000;
	font-size: 1.4rem;
	font-weight: 600;
	margin-bottom: .3rem;
}
.good_top-info .ta {
	color: #777;
	font-size: 1.3rem;
}
.good_top-price .price{
	font-size: 1.3rem;
	color: #f40;
}
.good_desc {
	width: 100%;
}
.desc {
	font-size: 1.4rem;
	line-height: 1.6;
}
.good_img {
	width: 100%;
	margin-top: 1.2rem;
}
.good_img img {
	width: 100%;
}
.messagebox {
	margin-top: 1rem;
	background-color: #fff;
	padding: 1rem 1.2rem;
}
.messagebox .msg {
	font-size: 1.4rem;
	color: #000;
	font-weight: 600;
	height: 4rem;
	line-height: 4rem;
	border-bottom: 1px solid #f8f8f8;
	/*margin-left: .2rem;*/
}
.msg:before {
	content: "";
	display: inline-block;
	width: .4rem;
	height: 1.1rem;
	background-color: #ffda44;
	margin-right: .4rem;
	vertical-align: baseline;
}
.conment {
	width: 100%;
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.5rem 0;
}
.conment .nomsg {
	margin-top: .6rem;
	font-size: 1.4rem;
	color: #888;
}
.fixedbottom {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 4.4rem;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	background-color: #f8f8f8;
	z-index: 100;
	box-sizing: border-box;
}
.message,.givestar,.buy{
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
	
}
.message {
	flex: 1;
	align-items: center;
}
.message img, .givestar img{
	width: 2.4rem;
	height: 2.4rem;
}
.givestar {
	flex: 2;
}
.buy {
	flex: 1;
	background-color: #d81e06;
	height: 4.4rem;
	line-height: 4.4rem;
	text-align: center;
	color: #fff;
	font-size: 1.4rem;
}
</style>