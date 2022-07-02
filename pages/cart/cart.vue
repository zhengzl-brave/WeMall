<template>
  <view>
    <view class="cart-wrap" v-if="cart.length !== 0">
      <!-- 收获地址 -->
      <goods-address></goods-address>
      <!-- 购物车标题 -->
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text>购物车</text>
      </view>
      <!-- 商品列表 -->
      <view class="goods-list">
        <goods-item :goodsList="cart" :isRadio="true" @changeRadio="changeRadio" :isNumber="true"
          @changeCount="changeCount" :isRightSwipe="true" @deleteOne="deleteOne"></goods-item>
      </view>
      <!-- 结算组件 -->
      <goods-settle></goods-settle>
    </view>
    <view class="cart-empty" v-else>
      <image src="../../static/cart_empty@2x.png"></image>
      <text>购物车空空如也</text>
    </view>
  </view>
</template>

<script>
  import carBar from '@/mixins/cart_bar.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [carBar],
    computed: {
      ...mapState('cart', ['cart'])
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations('cart', ['updateState', 'updateCount', 'removeGoods']),
      // 改变单选状态
      changeRadio(item) {
        this.updateState(item)
      },
      // 改变计数器数量
      changeCount(item) {
        this.updateCount(item)
      },
      // 滑动删除一项数据
      deleteOne(item) {
        this.removeGoods(item)
      }
    }
  }
</script>

<style lang="scss">
  .cart-wrap {
    padding-bottom: 50px;

    .cart-title {
      height: 40px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #efefef;
      font-size: 14px;

      text {
        margin-left: 10px;
      }

      .uni-icons {
        vertical-align: middle;
      }
    }
  }
  .cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    image {
      width: 90px;
      height: 90px;
    }
    text {
      font-size: 13px;
      color: gray;
      padding-top: 10px;
    }
  }
</style>
