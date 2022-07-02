const state = {
  // 每个商品对象包含 goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state
  cart: JSON.parse(uni.getStorageSync('cart') || '[]')
}
const mutations = {
  // 加入购物车
  addCart(state, goods) {
    const res = state.cart.find(item => item.goods_id === goods.goods_id)
    if(!res) {
      state.cart.push(goods)
    } else {
      res.goods_count += 1
    }
    this.commit('cart/saveCart')
  },
  // 持久化本地存储
  saveCart(state) {
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  },
  // 更改商品选中状态
  updateState(state, goods) {
    const res = state.cart.find(x => x.goods_id === goods.goods_id)
    if(res) {
      res.goods_state = goods.goods_state
      this.commit('cart/saveCart')
    }
  },
  // 更改商品数量
  updateCount(state, goods) {
    const res = state.cart.find(x => x.goods_id === goods.goods_id)
    if(res) {
      res.goods_count = goods.goods_count
      this.commit('cart/saveCart')
    }
  },
  // 删除商品
  removeGoods(state, goods) {
    const res = state.cart.filter(x => x.goods_id !== goods.goods_id)
    state.cart = res
    this.commit('cart/saveCart')
  },
  // 反选操作
  checkedAll(state, checkState) {
    state.cart.forEach(x => x.goods_state = checkState)
    this.commit('cart/saveCart')
  }
}
const actions = {}
const getters = {
  // 计算属性获取加入购物车数量
  // total(state) {
  //   let c = 0
  //   state.cart.forEach(x => c += x.goods_count)
  //   return c
  // }
  total(state) {
    return state.cart.reduce((count, item) => count += item.goods_count, 0)
  },
  // 勾选数量
  checkedCount(state) {
    return state.cart.filter(x => x.goods_state).reduce((count, item) => count += item.goods_count, 0)
  },
  // 已勾选总结
  checkedAmount(state) {
    return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price , 0).toFixed(2)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}