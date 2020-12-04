/*
 * @Author: your name
 * @Date: 2020-11-13 16:12:55
 * @LastEditTime: 2020-11-13 16:15:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /el-form-schema/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
