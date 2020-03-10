<!--
 * @Author: your name
 * @Date: 2020-03-08 12:20:00
 * @LastEditTime: 2020-03-10 16:35:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\notFound.vue
 -->
<template>
  <div style="height:100vh;overflow:auto">

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                  topPullText='下拉加载...'
                  topLoadingText='下拉加载...'
                  :bottom-all-loaded="allLoaded" 
                  ref="loadmore" topDistance="100">
    <ul>
      <li v-for="item in list" style="height:40px">{{ item }}</li>
    </ul>
  </mt-loadmore>
    <tabBar></tabBar>
  </div>
  
</template>

<script>
import tabBar from '../components/tabBar'
import { Loadmore,Indicator } from 'mint-ui';
export default {
  components: {
      tabBar
  },
  data () {
    return {
      allLoaded:true,
      list:[1,2,3,4,5,6,,56,54,6,45,6,54,6,54,7,6,867,8,67,8,1,2,3,4,5,6,,56,54,6,45,6,54,6,54,7,6,867,8,67,8]
    }
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      Indicator.open('正在加载数据中...')
      setTimeout(()=>{
        Indicator.close()
      },2000)
      
    },
    loadBottom() {
      alert('bottom')
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
      
    }
  }
}
</script>

<style>

</style>