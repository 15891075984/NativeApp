<!--
 * @Author: your name
 * @Date: 2020-03-08 11:24:25
 * @LastEditTime: 2020-03-16 22:45:12
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
				@keyup.enter.native="handleSearch"
				placeholder="搜索宝贝/鱼塘/用户">
			</mt-search>
			<div class="search-list" v-if="value.length > 0">
				<li v-for="item in 50">
					{{item}}
				</li>
			</div>
		</div>
        <myswipper :swiperData="result"></myswipper>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">新鲜的</mt-tab-item>
            <mt-tab-item id="2">附近</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" style="overflow:auto;height:60vh">
            <mt-tab-container-item id="1">
				<ul	v-if="selected == '1'"
					v-infinite-scroll="loadMore"
					infinite-scroll-disabled="loading"
					infinite-scroll-distance="50">
					<goodsCard :news="goodsList"></goodsCard>
				</ul>
                
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
				<ul	v-if="selected == '2'"
					v-infinite-scroll="loadMoreNears"
					infinite-scroll-disabled="loadingNears"
					infinite-scroll-distance="50">
					<goodsCard :news="nearsList"></goodsCard>
				</ul>
            </mt-tab-container-item>
        </mt-tab-container>
        
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
            result : [
                {
                    id:2,
                    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477189&di=53c877d6ca7b24501d23661c44b5c248&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201110%2F26%2F20111026224810_i3XJ3.jpg',
                    desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
                    price: 99,
                    addr:'中山',
                    time:'2020-2-20'
                },
                {
                    id:3,
                    url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477188&di=ac87a07916aa78287363e1c8edae0628&imgtype=0&src=http%3A%2F%2Fm.tuniucdn.com%2Ffb2%2Ft1%2FG1%2FM00%2FDC%2F55%2FCii9EFdEEdyIKnfwAAJG8L5TsBcAAGJtQPKkRYAAkcI758_w500_h280_c1_t0.jpg',
                    desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
                    price: 99,
                    addr:'中山',
                    time:'2020-2-20'
                },
                {
                    id:4,
                    url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477188&di=8a83ff416a5985ccfe08ac6f30282cb5&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0330%2Fbeef5fd2bea34858998d45248e18d2a2.jpg',
                    desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
                    price: 99,
                    addr:'中山',
                    time:'2020-2-20'
                }
            ],
            goodsList: [
				{
					'id': '1',
					'avatar': '../assets/img/avatar.jpg',
					'name': 'jxh_0709',
					'time': '12分钟前来过',
					'price': '￥125.10',
					'img': '../assets/img/avatar.jpg',
					'desc': '小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
					'add': '来自郑州',
					'kind': '鱼塘|网红衣服鱼塘',
					'star': '点赞',
					'num': '15',
					'freight': '0'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				},
				{
					'id': '2',
					'avatar': '../assets/img/avatar.jpg',
					'name': '糖果xt90',
					'time': '1小时前来过',
					'price': '￥80',
					'img': '../assets/img/avatar.jpg',
					'desc': '买一送一：欧洲力淑女包，感兴趣的给我留言哟',
					'add': '来自北京',
					'kind': '鱼塘|给闲置的衣服寻找有缘',
					'freight': '10'
				}
            ],
            nearsList: [
				{
					'avatar': './static/3.png',
					'name': '流浪在天际',
					'time': '7小时前来过',
					'price': '￥100',
					'img': './static/03.png',
					'desc': '席梦思床垫1.8米x2米 95新，换了乳胶，上门自提',
					'add': '来自南昌',
					'kind': '鱼塘|塘山镇',
					'star': '点赞',
					'num': '2'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				},
				{
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				}
			],
        }
	},
	computed:{
        ...mapState({
            'goods':'goods'
        })
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
			setTimeout(() => {
				// let last = this.goodsList[this.goodsList.length - 1];
				for (let i = 1; i <= 10; i++) {
					console.log(444)
				this.goodsList.push({
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				});
				}
				this.page ++ 
				console.log(this.page)
				this.loading = false;
				Indicator.close()
			}, 1000);
		},
		loadMoreNears() {
			//TODO 下拉无限加载
			this.loadingNears = true;
			Indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			setTimeout(() => {
				for (let i = 1; i <= 10; i++) {
					console.log(444)
				this.nearsList.push({
					'avatar': './static/4.png',
					'name': '万莉佳',
					'time': '8小时前来过',
					'price': '￥80',
					'img': './static/04.png',
					'desc': '绑带细跟真皮凉鞋，清鞋柜，300多买来的，穿过两次，9.5新，34码，鞋跟10厘米左右，鞋子多，便宜处理',
					'add': '来自南昌',
					'kind': '鱼塘|众鑫城上城'
				});
				}
				this.page ++ 
				console.log(this.page)
				this.loadingNears = false;
				Indicator.close()
			}, 1000);
		},
	},
	mounted () {
		console.log(123)
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
