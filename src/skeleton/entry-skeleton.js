/*
 * @Author: your name
 * @Date: 2020-03-15 12:27:43
 * @LastEditTime: 2020-03-15 12:27:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat_APP\src\skeleton\entry-skeleton.js
 */
import Vue from 'vue';
import Skeleton1 from './Skeleton1.vue';
import Skeleton2 from './Skeleton2.vue';

export default new Vue({
  components: {
    Skeleton1,
    Skeleton2,
  },
  //render: h => h(Skeleton1,Skeleton2),
  template: `
       <div style='height: 100%;'>
           <skeleton1 id="skeleton1" style="display:none"/>
           <skeleton2 id="skeleton2" style="display:none"/>
       </div>
    `
});