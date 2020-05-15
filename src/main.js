/*
 * @Author: your name
 * @Date: 2020-03-08 11:14:35
 * @LastEditTime: 2020-05-13 17:04:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
//import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
//import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './styles/weui.scss';
import './styles/fish.scss';
//import { Toast, Lazyload, Actionsheet  } from 'mint-ui';
import Mint from'mint-ui'
import 'mint-ui/lib/style.css'
import vUploader from 'v-uploader';
//轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
//import './components/common/directives';
import 'babel-polyfill';
import store from './store/index'
Vue.config.productionTip = false;
Vue.use(VueI18n);
// Vue.use(ElementUI, {
//     size: 'small'
// });
Vue.use(Mint)
// Vue.use(Lazyload)
Vue.use(VueAwesomeSwiper)
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const routerName = to.name
    router.app.$options.store.commit('user/setSelected',routerName)
    const token = localStorage['token']
    const path = to.path
    const limitRoute = ['/publish','/message','/me']
    if( path === '/register') {
        next()
        return
    }
    if ( !token && limitRoute.indexOf( path ) >= 0 ) {
        //需要return 不然会走next()
        //TODO
        next('/login');
        Toast('未查询到用户登录，请登录')
        return
    }
    next()
});



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
