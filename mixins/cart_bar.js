import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  onShow() {
    this.getCartBdge()
  },
  methods: {
    getCartBdge() {
      uni.setTabBarBadge({
        index:2,
        text:this.total + ''
      })
    }
  }
}