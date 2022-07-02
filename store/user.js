const state = {
  address: JSON.parse(uni.getStorageSync('address') || '{}'),
  token: uni.getStorageSync('token') || '',
  userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
  redictInfo: null // openType: 跳转方式 from: 跳转路径
}
const mutations = {
  setAddress(state, info) {
    state.address = info
    this.commit('user/saveAddressToStorage')
  },
  // 持久化存储
  saveAddressToStorage(state) {
    uni.setStorageSync('address', JSON.stringify(state.address))
  },
  // 用户信息存储
  setUserInfo(state, info) {
    state.userInfo = info
    this.commit('user/saveUserInfoStorage')
  },
  // 持久化存储用户
  saveUserInfoStorage(state) {
    uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
  },
  // 存储token
  setToken(state, info) {
    state.token = info
    this.commit('user/saveTokenStorage')
  },
  // 持久化token
  saveTokenStorage(state) {
    uni.setStorageSync('token', state.token)
  },
  // 记录上次页面路径方便做跳转返回
  setRedictInfo(state, info) {
    state.redictInfo = info
  }
}
const getters = {
  addStr(state) {
    if(state.address.provinceName) {
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}