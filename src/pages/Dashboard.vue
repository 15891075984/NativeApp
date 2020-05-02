<!--
 * @Author: your name
 * @Date: 2020-03-08 11:24:25
 * @LastEditTime: 2020-05-02 10:57:18
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
				placeholder="搜索宝贝/鱼塘/用户">
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
export default {
    components: {
        tabBar,
        Search,
        Cell,
        myswipper,
        Swiper,
        Slide,
        TabItem,
        Navbar,
        goodsCard
    },
    data () {
        return {
            value:'',
			selected:'1',
			loading: false,
			loadingNears: false,
			status:1,
			page: 1,
            result : [{
				id: 123,
				url: 'https://img.alicdn.com/simba/img/TB1VUUjzhv1gK0jSZFFSuv0sXXa.jpg'
				},
				{
					id: 123,
					url: 'https://img.alicdn.com/simba/img/TB1eY4DEeT2gK0jSZFvSutnFXXa.jpg'
				},
				{
					id: 123,
					url: 'https://img.alicdn.com/simba/img/TB1hjkunY3nBKNjSZFMSuuUSFXa.jpg'
				},{
					id: 123,
					url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587478574022&di=dccf031d1447c85265189498f71b0a83&imgtype=0&src=http%3A%2F%2Fwww.51psj.com.cn%2Fuploadfile%2F2019%2F1024%2F20191024081740807.jpg'
			}],
			goodsList: [],
			userList:[],
			goodsHomeList:[{
				id:1,
				name:'鸿心尔克潮流鞋子',
				time:'2020-02-02',
				price: 129,
				desc: '鸿心尔克夏季新鞋子',
				add: 12,
				kind: '服饰/鞋包',
				img: 'https://img.alicdn.com/tps/i4/TB1.YBbD2b2gK0jSZK9SuuEgFXa.jpg_240x240q90.jpg'
			},{
				id:1,
				name:'秋季外套',
				time:'2020-02-02',
				price: 1299,
				desc: '今秋外套穿什么，复古民族风毛衣外套一件搞定 ',
				add: 12,
				kind: '服饰/鞋包',
				img: 'https://img.alicdn.com/tfscom/i2/11140421/TB2B9UoX5P85uJjSZFKXXcw7FXa_!!11140421.jpg_180x180xzq90.jpg_.webp'
			},{
				id:3,
				name:'头毛衫',
				time:'2020-02-02',
				price: 399,
				desc: '秋冬新风尚时尚气质款马海毛套头毛衫 ',
				add: 12,
				kind: '服饰/鞋包',
				img: 'https://img.alicdn.com/tfscom/i1/2103587316/TB2bi0Ub_SPY1JjSZPcXXXIwpXa_!!2103587316.jpg_180x180xzq90.jpg_.webp'
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
				if(res.data && Object.keys(res.data).length !==0 ) {
					this.userList = res.data.users
					this.goodsList = res.data.product.slice(0, 6)
				}
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
			this.$router.push({
				name: 'goodsList',
				params: {
					search: this.value
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
			axios.get('/api/home').then(res=>{
				console.log(888,res)
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
