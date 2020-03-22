/*
 * @Author: your name
 * @Date: 2020-03-08 11:12:15
 * @LastEditTime: 2020-03-23 00:47:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\vue.config.js
 */
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const path = require('path')
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     disableHostCheck: true
    // },
    devServer: {
        disableHostCheck: true,
        sockHost: 'http://localhost:8080',
        proxy: {
            '/':{
                target:'http://47.93.117.14:8080/second-hand/',
                changeOrigin:true
            }
        }
    },


    configureWebpack: (config) => {
        config.plugins.push(new SkeletonWebpackPlugin({
          webpackConfig: {
            entry: {
              app: path.join(__dirname, './src/skeleton/entry-skeleton.js'),//这里为上面的entry-skeleton.js
            }
          },
          minimize: true,
          quiet: true,
          router: {
            mode: 'hash',
            routes: [
              {
                path: '/dashboard', //和router.js中的路径一样就行
                skeletonId: 'skeleton1' //之前的id
              }
            ]
          }
        }))
      }
}