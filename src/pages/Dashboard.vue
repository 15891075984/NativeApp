<!--
 * @Author: your name
 * @Date: 2020-03-08 11:24:25
 * @LastEditTime: 2020-03-25 23:39:38
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
				@keyup.enter.native="handleSearch"
				placeholder="搜索宝贝/鱼塘/用户">
			</mt-search>
			<div class="search-list" v-if="value.length > 0">
				<li v-for="item in product">
					{{item}}
				</li>
			</div>
		</div>
        <myswipper :swiperData="result"></myswipper>

		<ul	style="overflow:auto;height:66vh;padding-top:5px;padding-bottom:20px;background:#eee"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="50">
			<goodsCard :news="goodsList"></goodsCard>
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
			page: 1,
            result : [],
            goodsList: [],
			product: [1,2]
        }
	},
	computed:{
        ...mapState({
            'goods':'goods'
        })
	},
	watch: {
		value () {
			// alert(123)
			console.log()
			this.page ++
			axios.get('/api/search',{
				params:{
					keyword: this.value
				}
			}).then(res=>{
				this.product.push(this.value)
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
			this.loading = true;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
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

		handleSearch () {
			axios.get('/api/search',{
				params:{
					keyword: this.value
				}
			}).then(res=>{
				console.log(888,res)
			})
		}
	},
	mounted () {
		this.getGoodsList()
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
</style>
