<!--
 * @Author: your name
 * @Date: 2020-03-08 11:24:25
 * @LastEditTime: 2020-05-05 16:26:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Dashboard.vue
 -->
<template>
<div>
    <div class="dashboard">
		<div class="search">

		
			<mt-search
				v-model="value"
				class="search"
				style="height:100%"
				@change.native="handleSearch"
				@keyup.enter.native="goGoodsList()"
				placeholder="搜索宝贝/用户">
			</mt-search>
			<div class="search-list" v-if="value.length > 0">
				<li v-for="item in goodsList.slice(0,4)" 
				class="search-user search-goods" 
				style="padding:10px 15px 10px 15px" 
				@click="goUserDetail(item)"
				v-if="goodsList.length >= 1">
					<div class="search-user-avatar">
						<img src="../assets/img/avatar.jpg" alt="">
					</div>
					<div class="search-user-content" style="padding-left:10px;line-height:20px;flex:1">
						<div class="search-goods-name" style="line-height:30px;text-align:left">{{item.productName}}</div>
						<div class="search-goods-content" style="text-align:left"></div>
					</div>
					<div >
						<mt-button type="default"  @click="handleStatus" :class="{follow: status === 0}">{{status === 0 ? '取关' : '关注'}}</mt-button>
					</div>
				</li>
				<li v-for="item in goodsList" style="" class="search-goods" @click="goGoodsList(item.productName)">
					<div class="search-goods-name">{{item.productName}}</div>
					<div class="search-goods-content">{{item.productContent}}</div>
				</li>
			</div>
		</div>
        <myswipper :swiperData="result"></myswipper>
		<!-- <div>
			<Swiper :autoPlay='true' :showIndicator='true' interval="2500" duration="500">
				<Slide v-for="(data,index) in result" :key="index" >
					<img :src="data.picList[0].productPic" style="width:100%;height:150px" @click="handleClickImg(data)">
				</Slide>
			</Swiper>
		</div> -->
		
		<ul	style="overflow:auto;height:66vh;padding-top:5px;padding-bottom:20px;background:#eee"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="50">
			<goodsCard :news="goodsHomeList" style="padding-bottom:18px"></goodsCard>
		</ul>

    </div>
    <tabBar></tabBar>
</div>
</template>

<script>
import tabBar from '../components/tabBar'
import { mapState,mapMutations,mapActions } from 'vuex';
import { Search,Cell, Navbar, TabItem, InfiniteScroll,Indicator } from 'mint-ui';
import { Swiper, Slide } from 'vue-swiper-component';
import myswipper from '../components/swipper'
import goodsCard from '../components/goodsCard'
import axios from '../utils/request'
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    components: {
        tabBar,
        Search,
        Cell,
        myswipper,
		TabItem,
		Swiper,
		Slide,
        Navbar,
		goodsCard,
		Swipe,
		SwipeItem
    },
    data () {
        return {
            value:'',
			selected:'1',
			loading: false,
			loadingNears: false,
			status:1,
			page: 1,
            result:[{
				picList:[]
			},{
				picList:[]
			},{
				picList:[]
			},{
				picList:[]
			}],
			goodsList: [],
			userList:[],
			goodsHomeList:[{
				picList:[]
			}]
        }
	},
	computed:{
        ...mapState({
            'goods':'goods'
        })
	},
	watch: {
		value () {
			axios.get('/api/search',{
				params:{
					keyword: this.value
				}
			}).then(res=>{
				if (res.code !==0) return
				this.userList = res.data.users
				this.goodsList = res.data.product.slice(0, 6)
			})
		}
	},
    methods: {
        ...mapActions({
			'submitPublish':'goods/submitPublish',
			'getGoodsList':'goods/getGoodsList'
        }),
        ...mapMutations({
            
		}),
		loadMore() {
			//TODO 下拉无限加载
			// this.loading = true;
			// Indicator.open({
			// 	text: '加载中...',
			// 	spinnerType: 'fading-circle'
			// });
			// setTimeout(() => {
			// 	// let last = this.goodsList[this.goodsList.length - 1];
			// 	for (let i = 1; i <= 10; i++) {
			// 		console.log(444)
			// 	this.goodsList.push();
			// 	}
			// 	this.page ++ 
			// 	console.log(this.page)
			// 	this.loading = false;
			// 	Indicator.close()
			// }, 1000);
		},
		goGoodsList (value) {
			console.log(11111,value)
			this.$router.push({
				name: 'goodsList',
				params: {
					search: value
				}
			})
		},
		goUserDetail (value) {
			this.$router.push({
				name: 'UserDetail',
				params: {
					userId: value.userId
				}
			})
		},
		handleSearch () {
			axios.get('/api/search',{
				params:{
					keyword: this.value
				}
			}).then(res=>{
				console.log(888,res)
			})
		},
		handleStatus () {
			this.status = this.status ? 0 : 1
		},
		getHome () {
			axios.get('/home').then(res=>{
				if(res.code !== 0) return
				res.data.product.records.forEach(item => {
					if(!item.picList.length) {
						item.picList[0] = {}
						item.picList[0]['productPic'] = ''
					}
				})
				this.result = res.data.product.records.splice(0,4)
				this.goodsHomeList = res.data.product.records
			})
		}
	},
	mounted () {
		// this.getGoodsList()
		// axios.get('/api/search',{
		// 	params:{
		// 			keyword: ''
		// 		}
		// })
		this.getHome()
	}
}
</script>

<style scoped>
.search{
	position: relative;
}
.search >>> .mint-searchbar{
    background: #ffda44;
}
.search .mint-search{
    height:100%
}
.search >>> .mint-searchbar-inner{
    border-radius: 20px;
}

.search-list{
	position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    height: 93vh;
    background: #eee;
    z-index: 99999;
}
.search-goods{
	height:50px;
	display:flex;
	/* align-items: center; */
	padding: 0 40px 0 25px;
	font-size:14px;
	background: #fff;
	line-height: 50px;
}
.search-goods-name{
	line-height: 50px;
	margin-right: 15px;
}
.search-goods-content{
	flex:1;
	text-align: right;
	color:#bbb;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.follow{
	background: #ffda44;
	border-radius: 5px;
}
</style>
