
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

Vue.config.productionTip = false

// 引入request请求封装的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
// 请求拦截
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截
$http.afterRequest = function() {
  uni.hideLoading()
}
import { showMsg } from './utils'
uni.$showMsg = showMsg

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif