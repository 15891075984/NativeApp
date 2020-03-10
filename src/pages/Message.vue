<!--
 * @Author: your name
 * @Date: 2020-03-08 12:20:00
 * @LastEditTime: 2020-03-10 18:26:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\pages\notFound.vue
 -->
<template>
  <div style="height:93vh;overflow:auto;background:#eee">

    <mt-loadmore :top-method="loadTop"
                  topPullText='下拉加载...'
                  topLoadingText='释放刷新...'
                  :bottom-all-loaded="allLoaded" 
                  ref="loadmore" topDistance="150">
    <ul style="margin-top: 80px">
      <li v-for="item in list" style="height:40px">{{ item }}</li>
    </ul>
    <div slot="top" class="mint-loadmore-top ">
      <div v-show="allLoaded !== 'loading'">
        加载最新...
        <div style="height:40px;" class="an">
          <img src="../assets/img/加载4.png" alt="" style="height:100%">
        </div>
      </div>
    </div>
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
        this.list.splice(0,0,'334')
        Indicator.close()
      },2000)
    }
  }
}
</script>

<style scoped>
@-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
.an{
    -webkit-transform: rotate(360deg);
    animation: rotation 2s linear infinite;
    -moz-animation: rotation 2s linear infinite;
    -webkit-animation: rotation 2s linear infinite;
    -o-animation: rotation 2s linear infinite;
}
</style>