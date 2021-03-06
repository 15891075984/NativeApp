/*
 * @Author: your name
 * @Date: 2020-03-08 11:14:35
 * @LastEditTime: 2020-05-13 17:18:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\utils\request.js
 */

import axios from 'axios'
import { Toast } from 'mint-ui';
import router from '../router/index'
let httpCode = [      //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
    [400,'请求参数错误'],
    [401,'权限不足, 请重新登录'],
    [403,'服务器拒绝本次访问'],
    [404, '请求资源未找到'],
    [500, '内部服务器错误'],
    [501, '服务器不支持该请求中使用的方法'],
    [502, '网关错误'],
    [504, '网关超时'],
]
let httpCodeMap = new Map(httpCode);


axios.defaults.timeout = 10000;
axios.interceptors.request.use(config=>{
    if ( config.url === '/second-hand/login') {
        return config
    }
    if (localStorage.token) { //判断token是否存在
        //config.setHeaders
        config.headers.token = JSON.parse(localStorage.token);  //将token设置成请求头
    }
    return config
})
axios.interceptors.response.use(config=>{
    //对请求status进行拦截，提示用户
    //对后端接口code码进行拦截code 0 success 1 failed
    const code = config.data.code
    if (code !== 0) {
        //全局提示信息
        Toast({
            message: config.data.message,
            duration: 2000
        })
    }
    return config.data
},function(err){
    const status = err.response.status
    const message = err.response.data.message
    //const message = httpCodeMap.get(status)
    // 如果token过期，让去登录页
    if (status.toString() === '401') {
        localStorage.setItem('token','')
        // window.location.href = '/login'
        router.push({
            path:'/login'
        })
    }
    if (status.toString() === '400') {
        // window.location.href = '/login'
        return 
    }
    if ( message ) {
        Toast({
            message,
            duration: 2000
        })
    }
    return
})
export default axios