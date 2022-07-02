import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  watch: {
    total: {
      handler(val) {
        if(val) {
          this.getCartBdge()
        }
      }
    }
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