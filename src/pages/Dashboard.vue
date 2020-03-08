<!--
 * @Author: your name
 * @Date: 2020-03-08 11:24:25
 * @LastEditTime: 2020-03-08 16:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Dashboard.vue
 -->
<template>
<div>
    <div class="dashboard">
        <mt-search
            v-model="value"
            class="search"
            style="height:100%"
            @keyup.enter.native="handleSearch"
            placeholder="搜索宝贝/鱼塘/用户">
        </mt-search>
        <myswipper :swiperData="result"></myswipper>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">新鲜的</mt-tab-item>
            <mt-tab-item id="2">附近</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" style="overflow:auto;height:60vh">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 20" :title="'内容 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
        
    </div>
    <tabBar></tabBar>
</div>
</template>

<script>
import tabBar from '../components/tabBar'
import { Search,Cell, Navbar, TabItem  } from 'mint-ui';
import { Swiper, Slide } from 'vue-swiper-component';
import myswipper from '../components/swipper'
export default {
    components: {
        tabBar,
        Search,
        Cell,
        myswipper,
        Swiper,
        Slide,
        TabItem,
        Navbar
    },
    data () {
        return {
            value:'',
            selected:'新鲜的',
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
]
        }
    },
    methods: {
        handleClick () {
        },
        handleSearch () {
            alert(this.value)
        }
    }
}
</script>

<style scoped>
.search >>> .mint-searchbar{
    background: #ffda44;
}
.search .mint-search{
    height:100%
}
.search >>> .mint-searchbar-inner{
    border-radius: 20px;
}
</style>
