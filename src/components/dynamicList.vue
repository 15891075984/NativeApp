<!--
 * @Author: your name
 * @Date: 2020-03-22 15:14:24
 * @LastEditTime: 2020-03-22 16:04:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\dynamicList.vue
 -->
<template>
    <div class="dynamic">
        <div class="dynamic-time">
            {{dynamic.time}}
        </div>
        <div class="dynamic-content">
            <div class="dynamic-title">
                {{dynamic.title}}
            </div>
            <div class="dynamic-item"
                v-for="item in dynamic.productList"
                @click="goGoodDetail(item.id)"
                :key="item.id">
                <div class="dynamic-img">
                    <img :src="item.productPic" alt="" style="width:90px;height:90px;border-radius: 9px  0 0 9px; ">
                </div>
                <div class="dynamic-desc">
                    <div class="dynamic-price">
                        赚了￥<span>{{item.productPrice}}</span>
                    </div>
                    <div class="dynamic-desc-title">
                        <span>{{item.productName}}</span>
                    </div>
                    <div class="dynamic-from">
                        卖给来自苏州
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['dynamic'],
    methods: {
        goGoodDetail (goodsId) {
            this.$router.push({
                name: 'goods',
                params: {
                    goodsId
                }
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.dynamic{
    display: flex;
    font-size: 14px;
    color: #000;
    .dynamic-time{
        width: 20vw;
        font-size: 18px;
        box-sizing: border-box;
        padding-left: 5px;
        font-weight: 700;
    }
    .dynamic-content{
        flex: 1;
        padding: 15px;
        padding-top: 0;
        .dynamic-title{
            line-height: 30px;
        }
        .dynamic-item{
            display: flex;
            margin-bottom: 10px;
            .dynamic-img{
                width: 90px;
                height: 90px;
            }
        }
        .dynamic-desc{
            flex: 1;
            padding: 10px 10px 10px 15px;
            border-radius: 0 9px 9px 0;
            background: #eee;
            .dynamic-price{
                font-size: 16px;
                margin-bottom: 5px;
                span{
                    font-weight: 700;
                }
            }
            .dynamic-from{
                color: #bbb;
                font-size: 13px;
            }
            .dynamic-desc-title{
                font-size: 15px;
                color: #000;
            }
        }
    }
    
}
</style>