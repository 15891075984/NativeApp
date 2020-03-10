/*
 * @Author: your name
 * @Date: 2020-03-07 21:23:24
 * @LastEditTime: 2020-03-10 15:10:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\store\user.js
 */
import axios from '../utils/request'
const user = {
    namespaced: true,   
    types: {},
    state: {
        isLogin: true,
        username: '334',
        selected: "闲鱼",
        userAddress:"",
        userInfo:{}
    },
    mutations: {
        setUsername (state, data) {
            state.username = data
        },
        setSelected (state, data) {
            state.selected = data
        },
        setUserInfo (state, data) {
            //解析ip地址成 真实地址
            const userAddress = returnCitySN
            if(Object.keys(userAddress).length >= 1) {
                state.userAddress = userAddress.cname
            }
            state.userInfo = data
        }
    },
    actions: {
        getUserInfo ({commit}) {
            axios.get('/api/user/info').then( data => {
                commit('setUserInfo', data)
            })
        }
    }
}
export default user