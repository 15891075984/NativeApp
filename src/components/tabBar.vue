<!--
 * @Author: your name
 * @Date: 2020-03-08 12:22:53
 * @LastEditTime: 2020-03-26 00:01:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\components\tabBar.vue
 -->
<template>
<div>
    <div>
    </div>
    <mt-tabbar v-model="user.selected" >
        <mt-tab-item id="dashboard" >
            <div @click="handleSelected('闲鱼')">
                <div class="iconfont icon-jia bar-icon"></div>
                <span class="bar-icon-title">闲鱼</span>
            </div>
        </mt-tab-item>
        <!-- <mt-tab-item id="fishpond"  @click="handleSelected('鱼塘')">
            <div @click="handleSelected('鱼塘')">
                <div class="iconfont icon-wodeyutang-copy bar-icon"></div>
                <span class="bar-icon-title">
                    鱼塘
                </span>
            </div>
        </mt-tab-item> -->
        <mt-tab-item id="publish"  @click="handleSelected('发布')">
            <div @click="handleSelected('发布')">
                <div class="iconfont  bar-icon">十</div>
                <span class="bar-icon-title">
                    发布
                </span>
            </div>
        </mt-tab-item>
        <mt-tab-item id="message"  @click="handleSelected('消息')">
            <div @click="handleSelected('消息')">
                <div class="iconfont icon-icon03 bar-icon"></div>
                <span class="bar-icon-title">
                    消息
                </span>
            </div>
        </mt-tab-item>
        <mt-tab-item id="me"  @click="handleSelected('我的')">
            <div @click="handleSelected('我的')">
                <div class="iconfont icon-lianxiaolianmanyi- bar-icon"></div>
                <span class="bar-icon-title">
                    我的
                </span>
            </div>
        </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
import { mapState } from 'vuex';
export default {
    components: {
        Tabbar,
        TabItem
    },
    data () {
        return {
            selected: ""
        }
    },
    computed: {
        ...mapState({
            user:'user'
        }),
        // selected () {
        //     return this.user.selected
        // }
    },
    methods: {
        handleClick () {
        },
        handleSelected (props) {
            console.log(props)
            const hashMap = new Map([
                ['闲鱼','/dashboard'],
                ['发布','/publish'],
                ['消息','/message'],
                ['我的','/me']
            ])
            this.$router.push(hashMap.get(props))
        }
    },
    watch: {
        
    }
}
</script>

<style scoped>
.bar-icon{
    font-size: 20px;
    line-height: 20px;
    height: 20px;
    margin-bottom: 5px;
}
</style>
