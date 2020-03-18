/*
 * @Author: your name
 * @Date: 2020-03-07 21:23:24
 * @LastEditTime: 2020-03-18 20:46:55
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
        userInfo:{
            buyNum: 0,
            collectNum: 0,
            createTime: null,
            fansNum: 0,
            followNum: 0,
            icon: "http://47.93.117.14:8080/second-hand/fileSystem/files/images.jpg",
            id: 0,
            publishNum: 0,
            sellNum: 0,
            starNum: 0,
            uid: 0,
            uname: "",
            updateTime: null,
            userResume: "",
            userSex: 0,
            userAddress: "广东省中山市"
        },
        previousAvatar:''
    },
    mutations: {
        setUsername (state, data) {
            state.username = data
        },
        setSelected (state, data) {
            state.selected = data
        },
        setUserInfo (state, data) {
            //解析ip地址成 真实地址 粒度 省市
            state.userInfo = data
            console.log(33433,data)
            state.previousAvatar = data.icon
            const userAddress = returnCitySN
            if(Object.keys(userAddress).length >= 1) {
                state.userAddress = userAddress.cname
            }
        },
        setUserInfoAvatar (state, data)  {
            state.userInfo.icon = data
        }
    },
    actions: {
        getUserInfo ({commit}) {
            axios.get('/api/user/workspace/info').then( data => {
                if (!data) {return }
                commit('setUserInfo', data)
            })
        }
    }
}
export default user