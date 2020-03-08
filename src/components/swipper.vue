<!--
 * @Author: your name
 * @Date: 2020-03-08 12:54:06
 * @LastEditTime: 2020-03-08 13:31:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\swipper.vue
 -->


<template>
    <div>
        <Swiper :autoPlay='true' :showIndicator='true' interval="2500" duration="500">
            <Slide v-for="(item,index) in swiperData" :key="index">
                <img :src="item.url" style="width:100%;height:150px" @click="handleClickImg(item)">
            </Slide>
        </Swiper>
    </div>
</template>

<script>
import { Swiper, Slide } from 'vue-swiper-component';
export default {
    props:['swiperData'],
    name:'myswipper',
    components:{
        Swiper,
        Slide
    },
    data() {
      return {
      }
  },
  methods: {
      handleClickImg (item) {
          console.log(item)
      }
  }
}
</script>
<style>
</style>
