/*
 * @Author: your name
 * @Date: 2020-03-07 21:23:24
 * @LastEditTime: 2020-03-10 13:46:33
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
            state.userInfo = data
            console.log(333, data)
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