/*
 * @Author: your name
 * @Date: 2020-02-19 15:06:38
 * @LastEditTime: 2020-05-06 18:26:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \App\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/Index'
// import Category from '@/pages/Category'
// import Search from '@/pages/Search'
// import Buy from '@/pages/Buy'
// import NotFound from '@/pages/notFound'
// import Fishpond from '@pages/Fishpond'

Vue.use(Router)

export default new Router({
  routes: [{
        path: '/',
        name:'index',
        redirect:'/dashboard'
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/pages/Dashboard')
    },{
        path:'/404',
        name:'404',
        component: () => import('@/pages/NotFound')
    },{
        path:'/fishpond',
        name:'fishpond',
        component: () => import('@/pages/Fishpond')
    },{
        path:'/publish',
        name:'publish',
        component: () => import('@/pages/Publish')
    },{
        path:'/message',
        name:'message',
        component: () => import('@/pages/Message')
    },{
        path:'/me',
        name:'me',
        component: () => import('@/pages/Me')
    },{
        path:'/login',
        name:'login',
        component: () => import('@/pages/Login')
    },{
        path:'/register',
        name:'register',
        component: () => import('@/pages/Register')
    },{
        path:'/kinds',
        name:'kinds',
        component: () => import('@/pages/Kinds')
    },{
        path:'/myPublish',
        name:'myPublish',
        component: () => import('@/pages/myPublish')
    },{
        path:'/goods/:goodsId',
        name:'goods',
        component: () => import('@/pages/Goods')
    },{
        path:'/goodsList/:search',
        name:'goodsList',
        component: () => import('@/pages/GoodsList')
    },{
        path:'/follow/:followId',
        name:'follow',
        component: () => import('@/pages/Follow')
    },{
        path:'/fans/:fansId',
        name:'fans',
        component: () => import('@/pages/Fans')
    },{
        path:'/userDetail/:userId',
        name:'UserDetail',
        component: () => import('@/pages/UserDetail')
    },{
        path:'/myBuy',
        name:'myBuy',
        component: () => import('@/pages/myBuy')
    },{
        path:'/myCollect',
        name:'myCollect',
        component: () => import('@/pages/myCollect')
    },{
        path:'/mySell',
        name:'mySell',
        component: () => import('@/pages/mySell')
    },{
        path:'/myLike',
        name:'myLike',
        component: () => import('@/pages/myLike')
    },{
        path:'/Chat/:uid/:to',
        name:'Chat',
        meta: { requiresAuth: true },
        component: () => import('@/pages/Chat')
    },{
        path:'/myDown',
        name:'myDown',
        component: () => import('@/pages/myDown')
    },{
        path:'/Buy',
        name:'Buy',
        component: () => import('@/pages/Buy')
    },{
        path:'/FeedBack',
        name:'FeedBack',
        component: () => import('@/pages/FeedBack')
    },{
        path:'*',
        redirect:'/404'
    }
    ]
})
