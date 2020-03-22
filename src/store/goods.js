/*
 * @Author: your name
 * @Date: 2020-03-08 11:14:35
 * @LastEditTime: 2020-03-23 00:18:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\store\goods.js
 */
import axios from '../utils/request'
import { Indicator } from 'mint-ui';
const goods = {
    namespaced: true,
    types: {},
    state: {
        goodsList: [],
        //发布商品
        upload: {
            productName:'',
            productPrice:'',
            productContent:'',
            productTag:'',
            productStatus:0,
            productPic:[]
        }
        //
    },
    mutations: {
        setProductTag (state, data) {
            state.upload.productTag = data
            console.log(data)
        },
        setPublishImg (state, data) {
            state.upload.productPic.push(data)
        },
        delelteProductImg (state, index) {
            state.upload.productPic.splice(index, 1)
        }
    },
    actions: {
        // 发布商品
        submitPublish ({ state , rootState}, router) {
            let params = {...state.upload}
            params.userAddress = rootState.user.userAddress
            params.userName = rootState.user.username
            params.userId = rootState.user.userInfo.uid
            params.productPic = params.productPic.flat(Infinity)
            // params = Object.assign(params, rootState.user.userInfo )
            Indicator.open('发布商品中...')
            axios({
                url: '/api/product/issue',
                method: 'post',
                data: {...params},
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                Indicator.close()
                if (res.code !== 0) {return}
                router.push({
                    path:'/me'
                })
            }).catch(err=>{
                Indicator.close()
            })
        },


        //获取商品列表
        getGoodsList (state, params) {
            axios.get('/api/product/search/33').then(res => {
                //console.log(res)
            })
        }
    },


    
}
export default goods