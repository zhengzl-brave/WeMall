const state = {
  address: JSON.parse(uni.getStorageSync('address') || '{}')
}
const mutations = {
  setAddress(state, info) {
    state.address = info
    this.commit('user/saveAddressToStorage')
  },
  // 持久化存储
  saveAddressToStorage(state) {
    uni.setStorageSync('address', JSON.stringify(state.address))
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