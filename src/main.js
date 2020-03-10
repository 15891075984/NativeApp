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
import { Toast } from 'mint-ui';
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
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
// const uploaderConfig = {
//     // file uploader service url
//     uploadFileUrl: 'http://xxx/upload/publicFileUpload',
//     // file delete service url
//     deleteFileUrl: 'http://xxx/upload/deleteUploadFile',
//     // set the way to show upload message(upload fail message)
//     showMessage: (vue, message) => {
//       //using v-dialogs to show message
//         vue.$dlg.alert(message, {messageType: 'error'});
//         }
//     };
//   // install plugin with options
//   Vue.use(vUploader, uploaderConfig);
const i18n = new VueI18n({
    locale: 'zh'
});
localStorage.setItem('token','334')
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const routerName = to.name
    router.app.$options.store.commit('user/setSelected',routerName)
    const token = localStorage['token']
    console.log('token', !token)
    if (!token && to.path !== '/login') {
        //需要return 不然会走next()
        next('/login');
        Toast('未查询到用户登录，请登录')
        return
    }
    // else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // }
    next()
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
