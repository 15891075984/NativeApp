/*
 * @Author: your name
 * @Date: 2020-03-08 11:14:35
 * @LastEditTime: 2020-03-08 18:29:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\store\goods.js
 */
const goods = {
    namespaced: true,
    types: {},
    state: {
        goods: [1,2,3,4,5],
        upload: {
            productName:'',
            productPrice:'',
            productContent:'',
            productTag:''
        }
    },
    mutations: {
        setProductTag (state, data) {
            state.upload.productTag = data
            console.log(data)
        }
    },
    actions: {
        
    }
}
export default goods