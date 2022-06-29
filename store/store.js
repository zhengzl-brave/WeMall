import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import user from './user'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    cart,
    user
  }
})
export default store