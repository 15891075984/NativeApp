<!--
 * @Author: your name
 * @Date: 2020-04-21 18:16:44
 * @LastEditTime: 2020-05-04 12:29:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\GoodsList.vue
 -->
<template>
    <div class="goodslist-wrapper">
        <mt-search
            v-model="search"
            class="search"
            style="height:100%"
            @change.native="handleSearch"
            @keyup.enter.native="handleSearch()"
            placeholder="搜索宝贝/用户">
		</mt-search>
        <ul >
            <goodsListRow :goods="goodsList"  style="min-height:90vh"></goodsListRow>
            <!-- <div v-else></div> -->
        </ul>
    </div>
</template>

<script>
import axios from '../utils/request'
import goodsListRow from '../components/goodsListRow'
export default {
    data () {
        return {
            search: '',
            userList: [],
            goodsList: []
        }
    },
    components: {
        goodsListRow,
    },
    mounted () {
        this.search = this.$route.params.search
        this.handleSearch()
    },
    methods: {
        handleSearch () {
			axios.get('/api/search',{
				params:{
					keyword: this.search
				}
			}).then(res=>{
                this.goodsList = res.data.product
                this.userList = res.data.users
			})
		},
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