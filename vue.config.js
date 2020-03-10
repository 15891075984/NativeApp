/*
 * @Author: your name
 * @Date: 2020-03-08 11:12:15
 * @LastEditTime: 2020-03-10 12:25:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\vue.config.js
 */
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     disableHostCheck: true
    // },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/':{
                target:'http://47.93.117.14:8080/second-hand/',
                changeOrigin:true
            }
        }
    }
}