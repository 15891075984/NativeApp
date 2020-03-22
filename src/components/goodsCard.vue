<!--
 * @Author: your name
 * @Date: 2020-03-10 12:31:54
 * @LastEditTime: 2020-03-22 12:23:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\goodsCard.vue
 -->
<template>
  <div class="goods-card">
      <div class="mt-cell" v-for="data in news" key="data.id" @click="goGoodsDetail(data)">
    	<div class="head" style="display:flex">
            <div class="head-img">
                <img src="../assets/img/avatar.jpg" class="avatar" alt="">
            </div>
    		<div class="info">
    			<p class="title">{{data.name}}</p>
    			<p class="time">{{data.time}}</p>
    		</div>
    		<span class="price">{{data.price}}</span>
    	</div>
    	<div class="imgbox">
    		<img src="../assets/img/avatar.jpg" class="show" alt="">
    	</div>
    	<div class="detail">
    		<p class="desc">{{data.desc}}</p>
    	</div>
    	<div class="bottom">
    		<div class="addr">{{data.add}}</div>
    		<div class="kind">{{data.kind}}</div>
    		<div class="star" v-if="data.star !== '' ">{{data.star}}{{data.num}}</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
    props:['news'],
    data () {
        return {
            
        }
    },
    mounted () {
        console.log(this.news)
	},
	methods: {
		goGoodsDetail (item) {
			const goodsId = item.id
			this.$router.push({
				name:'goods',
				params: {
					goodsId
				}
			})
		}
	}
}
</script>

<style scoped>
.mt-cell{
	
	margin-bottom: .8rem;
    padding: 10px;
}
.container {
	margin-top: 1.2rem;
}
.container-item {
	width: 100%;
	padding-left: 1rem;
	padding-right: 1rem;
	box-sizing:border-box;
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
}
.container-item .head{
	display: flex;
	align-items: center;
}
.head .avatar{
    display: flex;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
}
.head .info{
	flex:1;
	margin-left: .8rem;
}
.head .title {
	font-size: 1.4rem;
	color: #000;
	margin-bottom: .2rem;
}
.head .time{
	font-size: 1.2rem;
	color: #999;
	padding-left: 1.4rem;
	background: url('../assets/img/arrow.png') no-repeat;
	background-size: 14px 14px;
	background-position: 0 87%;
}
.head .price{
	margin-right: .4rem;
	color: red;
	font-size: 1.4rem;
	font-weight: 700;
}
.imgbox {
	margin-top: .4rem;
	width: 22rem;
	height: 20rem;
}
.imgbox .show{
	width: 100%;
	height: 100%;
}
.detail{
	margin-top: .6rem;
	width: 100%;
	color: #000;
	font-weight: 500;
	font-size: 1.4rem;
	padding-bottom: .6rem;
	border-bottom: 1px solid #f3f3f3;
}
.bottom {
	margin-top: .8rem;
	color: #7dc5eb;
	display: -webkit-flex;
	display: flex;
	font-weight: 500;
	font-size: 1.2rem;
	margin-bottom: .8rem;

}
.bottom .kind{
	margin-left: 1rem;
	flex: 1;
}
.bottom .star{
	color: #888;
}
</style>