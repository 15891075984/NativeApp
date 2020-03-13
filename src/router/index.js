/*
 * @Author: your name
 * @Date: 2020-02-19 15:06:38
 * @LastEditTime: 2020-03-13 20:54:08
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
        name: '闲鱼',
        component: () => import('@/pages/Dashboard')
    },{
        path:'/404',
        name:'404',
        component: () => import('@/pages/NotFound')
    },{
        path:'/fishpond',
        name:'鱼塘',
        component: () => import('@/pages/Fishpond')
    },{
        path:'/publish',
        name:'发布',
        component: () => import('@/pages/Publish')
    },{
        path:'/message',
        name:'消息',
        component: () => import('@/pages/Message')
    },{
        path:'/me',
        name:'我的',
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
    },
    // ,{
    //   path:'/category',
    //   name:'Category',
    //   component: () => import('@/pages/Category')
    // },{
    //   path: '/search',
    //   name:'search',
    //   component: () => import('@/pages/Search')
    // },{
    //   path: '/buy/:id',
    //   name:'buy',
    //   component: () => import('@/pages/Buy')
    // },{
    //   path:'/404',
    //   name:'404',
    //   component: () => import('@/pages/notFound')
    // },{
    //   path:'/fishpond',
    //   name:'fishpond',
    //   component: () => import('@/pages/Fishpond')
    // },{
    //   path:'/publish',
    //   name:'publish',
    //   component: () => import('@/pages/Publish')
    // },{
    //   path:'/message',
    //   name:'message',
    //   component: () => import('@/pages/Message')
    // },{
    //   path:'/me',
    //   name:'me',
    //   component: () => import('@/pages/Me')
    // },{
    //   path:'/login',
    //   name:'login',
    //   component: () => import('@/pages/Login')
    // },
    // {
    //   path:'*',
    //   redirect:'/404'
    // }
  ]
})
