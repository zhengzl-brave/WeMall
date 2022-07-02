<template>
  <view class="mine">
    <we-login v-if="!token"></we-login>
    <we-userInfo v-else></we-userInfo>
  </view>
</template>

<script>
  import carBar from '@/mixins/cart_bar.js'
  import { mapState } from 'vuex'
  export default {
    mixins: [carBar],
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState('user', ['token'])
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
page, .mine {
  height: 100%;
}
</style>
