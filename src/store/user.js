/*
 * @Author: your name
 * @Date: 2020-03-07 21:23:24
 * @LastEditTime: 2020-05-06 18:15:24
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
        username: '',
        selected: "闲鱼",
        userAddress:"",
        userInfo:{
            buyNum: 0,
            collectNum: 0,
            createTime: null,
            fansNum: 0,
            followNum: 0,
            icon: "",
            id: 0,
            publishNum: 0,
            sellNum: 0,
            starNum: 0,
            uid: 0,
            uname: "",
            updateTime: null,
            userResume: "",
            userSex: 0,
            userAddress: "广东省中山市",
            balance: 0
        },
        previousAvatar:'',
        handle:'delete',
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
            localStorage.meAvator = data.icon
            state.previousAvatar = data.icon
            const userAddress = returnCitySN
            if(Object.keys(userAddress).length >= 1) {
                state.userAddress = userAddress.cname
            }
        },
        //设置用户头像，用户可能取消或者确定
        setUserInfoAvatar (state, data)  {
            state.userInfo.icon = data
        },

        setHandle (state,data) {
            state.handle = data
        }
    },
    actions: {
        getUserInfo ({commit}) {
            axios.get('/api/user/workspace/info').then( data => {
                if (data.code !== 0) {return }
                commit('setUserInfo', data.data)
            })
        }
    }
}
export default user