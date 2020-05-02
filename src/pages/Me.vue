<template>
  <div>

    <div class="wrapper" style="height:93vh;overflow:auto;padding-bottom:120px">
		<div class="top">
			<div class="loginhead">
				<div class="flex border">
					<div class="flexprimary">
						<div class="name">{{user.userInfo.uname || ''}}</div>
						<div class="somedesc">虽然没挣到钱，但在闲鱼开心就好</div>
					</div>
					<div class="useravatar" >
						<img :src="user.userInfo.icon" alt="" class="avatar"  @click="sheetVisible = true">
						<input hidden name="file" id="fileUpload"
              					@change ="tirggerFile($event)" type="file"  capture="camera">
					</div>
				</div>
				<div class="flex">
					<div class="numbox" @click="goFollow">
						<span class="num">{{user.userInfo.followNum}}</span>
						<span class="numname">关注数</span>
					</div>
					<div class="numbox" @click="goFans">
						<span class="num" >{{user.userInfo.fansNum}}</span>
						<span class="numname">粉丝数</span>
					</div>
					<div class="numbox" @click="handleAccountSheetVisible">
						<span class="num">{{accountNum}}</span>
						<span class="numname">余额</span>
					</div>
				</div>
			</div>
			<div class="open flex">
					<div class="flexprimary">
						<p class="openvip">来到闲鱼号！</p>
						<p class="tipinfo">快来整理一下你的闲置物品吧</p>
					</div>
					<button class="on" @click="goHome">去看看</button>
			</div>
		</div>
		<div class="list">
			<ul class="itemlist">
				<li class="item item1" @click="goMyPublish">我发布的<span class="number">{{user.userInfo.publishNum}}</span></li>
				<li class="item item3" @click="goMyBuy">我买到的<span class="number">{{user.userInfo.buyNum}}</span></li>
				<li class="item item2" @click="goMySell">我卖出的<span class="number">{{user.userInfo.sellNum}}</span></li>
				<li class="item item3" @click="goMyDown">我下架的<span class="number">{{user.userInfo.downNum}}</span></li>
				<li class="item item4" @click="goMyLike">我赞过的<span class="number">{{user.userInfo.starNum}}</span></li>
				<li class="item item5" @click="goMyCollect">我收藏的<span class="number">{{user.userInfo.collectNum}}</span></li>
			</ul>
		</div>
		<div class="list" v-if="login">
			<ul class="itemlist">
				<!-- <li class="item item8">我的公益</li> -->
				<!-- <li class="item item9">闲鱼Family</li> -->
				<li class="item item10 " @click="goFeedBack">帮助与反馈</li>
			</ul>
		</div>
		<div class="list">
			<ul class="itemlist">
				<li class="item item7" @click="handleGoSetting">我的主页</li>
			</ul>
		</div>
		<div class="buttonwrap">
			<button class="logout" v-if="login" @click="logout">退出登录</button>
		</div>
		<div class="block"></div>
		<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible">
		</mt-actionsheet>
		<mt-actionsheet
			:actions="accountSheet"
			v-model="accountSheetVisible">
		</mt-actionsheet>
	</div>
     <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '../components/tabBar'
import axios from '../utils/request'
import { Field,Button, Cell,Indicator, MessageBox, Actionsheet, Toast } from 'mint-ui';
import { mapState, mapMutations} from 'vuex';
export default {
	components: {
		tabBar,
		Actionsheet,
	},
	data () {
		return {
			login: true,
			accountNum: 99.98,
			sheetVisible: false,
			actions: [{
		        name: '拍照',
		        method : this.photo
				},{
				name: '从相册中选择',
		        method : this.img
			}],
			accountVisible: false,
			accountSheetVisible: false,
			accountDeposit: false,
			accountSheet: [{
		        name: '充值',
		        method : this.setSheetVisible
				},{
				name: '提现',
		        method : this.setDeposit
			}],
		}
	},
	computed:{
		...mapState({
			'user':'user'
		})
	},
	mounted () {
		console.log(this.user)
	},
	methods: {
		...mapMutations({
			setUserInfoAvatar:'user/setUserInfoAvatar',
			setHandle:'user/setHandle',
		}),
		photo () {
			this.loadImg("image/jpg;capture=camera")
		},
		img () {
			this.loadImg('image/jpeg,image/jpg,image/png')
		},
		recharge () {
			this.accountSheetVisible = true
		},
		setSheetVisible () {
			// this.sheetVisible = false
			MessageBox.prompt('请输入充值金额').then(({ value, action }) => {
				const params = {
					amount: value
				}
				axios({
					url: '/api/account/credit',
					method: 'post',
					data: {...params},
					headers: {'Content-Type': 'application/json'}
				}).then(res => {
					if (res.code !== 0) return
				})
			});
		},
		setDeposit () {
			// this.accountDeposit = true
			MessageBox.prompt('请输入提现金额').then(({ value, action }) => {
				const params = {
					amount: value
				}
				axios({
					url: '/api/account/debit',
					method: 'post',
					data: {...params},
					headers: {'Content-Type': 'application/json'}
				}).then(res => {
					if (res.code !== 0) return
				})
			});
		},
		handleAccountSheetVisible () {
			this.accountSheetVisible = true
		},
		loadImg (params) {
			let vm = this;
			let add = document.querySelector('input[type=file]')
			add.setAttribute('accept', params)
			add.click()
			return false;
		},
	goMyPublish() {
		this.setHandle('publish')
		this.$router.push('/myPublish')
	},
	goHome() {
		this.$router.push('/')
	},
	goMyCollect() {
		this.setHandle('delete')
		this.$router.push('/myCollect')
	},
	goMySell() {
		this.setHandle('delete')
		this.$router.push('/mySell')
	},
	goMyBuy() {
		this.setHandle('delete')
		this.$router.push('/myBuy')
	},

	goMyDown () {
		this.setHandle('delete')
		this.$router.push('/myDown')
	},
	goMyLike() {
		this.setHandle('delete')
		this.$router.push('/myLike')
	},
	logout () {
		this.$router.push('/login')
		localStorage.setItem('token','')
	},
	//去关注页面
	goFollow () {
		this.$router.push({
			name: 'follow',
			params: {
				followId:this.user.userInfo.id
			}
		})
	},
	// 去粉丝页
	goFans () {
		this.$router.push({
			name: 'fans',
			params: {
				fansId:this.user.userInfo.id
			}
		})
	},

	//自动上传文件
    tirggerFile (event) {
        let self = this;
        let file = event.target.files[0]
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
        	headers: {'Content-Type': 'multipart/form-data'}
        }
        Indicator.open('上传图片中...');
        // 添加请求头
        axios.post('/fileSystem/upLoadImage', param, config)
		.then(response => {
			Indicator.close()
			if(response.code !== 0) {
				this.setUserInfoAvatar(this.user.previousAvatar)
				return
			}
			this.setUserInfoAvatar(response.data)
				MessageBox({
					title: '保存头像',
					message: '确定保存新头像?',
					showCancelButton: true
				}).then(action => {
					if(action === 'confirm') {
						//发送更换头像请求
						axios({
							url: '/api/user/workspace/icon',
							method: 'put',
							data: {icon: response.data[0]},
                			headers: {'Content-Type': 'application/json'}
						}).then( r => {
							if (r.code !== 0) {
								this.setUserInfoAvatar(this.user.previousAvatar)
								return
							}
							Toast({
								message: '头像更换成功',
								duration: 1500
							});
						})
					}else if (action === 'cancel'){
						this.setUserInfoAvatar(this.user.previousAvatar)
					}
				})
		})
	},
	
	goFeedBack () {
		this.$router.push({
			name:'FeedBack'
		})
	},
	handleGoSetting () {
		this.$router.push({
			name:'UserDetail',
			params: {
				userId: this.user.userInfo.uid
			}
		})
	}
  }
}
</script>
<style  scoped>
* {
	margin: 0;
	padding: 0;
}
ul,li {
	list-style: none;
}
.wrapper {
	width: 100%;
	min-height: 48rem;
	background-color: #f3f3f3;
}
.buttonwrap {
	width: 100%;
}
.logout {
	display: block;
	width: 95%;
	font-size: 1.3rem;
	margin: 1rem auto;
	height: 4rem;
	outline: none;
	border: none;
	background-color: red;
	color: white;
}
.top{
	width: 100%;
}
.head {
	position: relative;
	width: 100%;
	height: 10rem;
	background-color: #fff;
}
.loginhead {
	width: 100%;
	height: 15rem;
	background-color: #fff;
	padding: 0 1.2rem;
	box-sizing: border-box;
}
.open {
	width: 100%;
	height: 6rem;
	margin-bottom: 1rem;
	margin-top: 1rem;
	padding: 0 1.2rem;
	box-sizing: border-box;
	background-color: #ffda44;
}
.openvip {
	font-size: 1.6rem;
	font-weight: 600;
	margin-bottom: .4rem;
}
.tipinfo {
	font-size: 1.2rem;
}
.on{
	border: none;
	width: 7rem;
	height: 2.8rem;
	box-sizing: border-box;
	border: 1px solid #333;
	outline: none;

	background-color: transparent;
}
.flex {
	display: -webkit-flex;
	display: flex;
	align-items: center;
	flex-direction: row;
}
.border {
	border-bottom: 1px solid #f8f8d8;
	height: 10rem;
}
/* .border:after {
	content: '';
	display: inline-block;
	height: .8rem;
	width: .8rem;
	border-width: 2px 2px 0 0;
	border-color:#999;
	border-style: solid;
	transform: rotate(45deg);
	position: absolute;
	right: 1rem;
} */
.flexprimary {
	flex:1;
}
.flexprimary .name{
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: .4rem;
} 
.flexprimary .somedesc{
	font-size: 1.2rem;
	color: #888;
}
.useravatar {
	width: 5rem;
	height: 5rem;
	background-color: #f9f9f9;
	border-radius: 50%;
	margin-right: 1.5rem;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	justify-content: center;
}
.useravatar img{
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
.numbox {
	flex: 1;
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 50px;
}
.num {
	color: #000;
	font-weight: 600;
	font-size: 1.3rem;
	margin-bottom: .2rem;
}
.numname {
	color: #888;
	font-size: 1.3rem;
}
.block {
	height: 55px;	
}
.head .animate {
	position: absolute;
	bottom: 0;
	right: 3rem;
	width: 15.6rem;
	height: 100%;
	/* background:#fff url('./assets/img/发送.png') no-repeat; */
	background-position: 100% 100%;
}
.head .welcome {
	margin-left: 1.2rem;
	margin-top: 2rem;
	font-size: 2rem;
	font-weight: 600;
}
.head .login {
	margin-top: 1rem;
	margin-left: 1.2rem;
	width: 8rem;
	height: 3.6rem;
	background-color: #ffda44;
	outline: none;
	border: none;
}
.list {
	margin-top: 1rem;
	width: 100%;	
	height: auto;
	background-color: #fff;
	font-size: 1.4rem;	
}
.item {
	padding: 1.2rem 3.5rem;
	border: 1px solid #f8f8f8;
	box-sizing: border-box;
	position: relative;
	background-repeat: no-repeat;
	background-size: 2rem 2rem;
	background-position: 1rem 1rem;
}
.number {
	position: absolute;
	right: 3rem;
	color: #888;
}
.item:last-child {
	border-bottom: none;
}
.item:after {
	content: '';
	display: inline-block;
	height: .8rem;
	width: .8rem;
	border-width: 2px 2px 0 0;
	border-color:#999;
	border-style: solid;
	transform: rotate(45deg);
	position: absolute;
	right: 1rem;
	top: 1.5rem;
}
.item1{
  background-image: url('../assets/img/发送.png')
}
.item2{
  background-image: url('../assets/img/发送.png');
}
.item3{
  background-image: url('../assets/img/我收到的.png');
}
.item4{
  background-image: url('../assets/img/收到评价.png');
}
.item5{
  background-image: url('../assets/img/拍卖.png');
}
.item6{
  background-image: url('../assets/img/撒鱼币.png');
}
.item7{
  background-image: url('../assets/img/设置.png');
}
.item8{
  background-image: url('../assets/img/爱心_.png');
}
.item9{
  background-image: url('../assets/img/闲鱼.png');
}
.item10{
  background-image: url('../assets/img/帮助.png');
}
.iconss{
	width: 100%;
	height: 100%;
}
.icon-success{
	background-image: url('../assets/img/对号.png');
}
.goFeedBack{

}
</style>