<!--
 * @Author: your name
 * @Date: 2020-03-08 18:02:00
 * @LastEditTime: 2020-03-08 18:37:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\Kinds.vue
 -->
<template>
    <div class="kinds">
        <headerBar title="类目"></headerBar>
        <ul class="item-wrapper">
            <li v-for="(item,index) in kinds" 
                :key="index" 
                class="item"
                @click="selectdKind(item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
import headerBar from '../components/headerBar'
import { CellSwipe } from 'mint-ui';
import { mapState,mapMutations } from 'vuex';
export default {
    components: {
        CellSwipe,
        headerBar
    },
    data () {
        return {
            kinds:[
                "技能服务",
                "其他闲置",
                "农用物资",
                "生鲜水果",
                "童鞋",
                "园艺植物",
                "五金工具",
                "电子零件",
                "动漫/周边",
                "宠物/用品",
                "网络设备",
                "服饰配件",
                "珠宝首饰",
                "古董首饰",
                "箱包",
                "钟表眼镜",
                "女士鞋靴",
            ]   }
    },
    computed:{
        ...mapState({
            'goods':'goods'
        })
    },
    methods: {
        ...mapMutations({
            'setProductTag': 'goods/setProductTag'
        }),
        selectdKind (data) {
            this.setProductTag( data )
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.kinds{
    background: #f8f8f8;
}
.item-wrapper{
    height: 100vh;
    overflow: auto;
}
.item{
    height: 45px;
    line-height: 45px;
    color: #333;
    font-size: 14px;
    padding-left:14px;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1
}
</style>