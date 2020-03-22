<!--
 * @Author: your name
 * @Date: 2020-03-22 14:25:27
 * @LastEditTime: 2020-03-22 14:57:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\evaluateList.vue
 -->
<template>
    <div class="evaluate-wrapper">
        <div class="evaluate-item">
            <div class="img">
                <img class="img"  src="../assets/img/avatar.jpg" alt="" >
            </div>
            <div class="evaluate-content">
                <div class="name">来自福州市大点的买家</div>
                <div class="desc">苹果很大，这个品种以前吃了很多</div>
                <div class="time">2020-03-22 12:48:08</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
}
</script>

<style lang="scss" scoped>
.evaluate-wrapper{
    background: #fff;
    .evaluate-item{
        padding: 10px 15px 10px 15px;
        display: flex;
        .img{
            width: 30px;
            height: 30px;
        }
        .evaluate-content{
            flex: 1;
            margin-left: 15px;
            line-height: 25px;
            padding-bottom: 10px;
            border-bottom: 0.5px solid #ccc;
            .name{
                font-size: 14px;
                color: #aaa;
            }
            .desc{
                font-size: 15px;
                color: #000;
            }
            .time{
                margin-top: 1px;
                color: #bbb;
                font-size: 12px
            }
        }

    }
    
}
</style>
