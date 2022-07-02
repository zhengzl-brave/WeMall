<template>
  <view>
    <view class="settle-wrap">
      <!-- 全选 -->
        <label class="radio" @click="changeCheckAll">
          <radio color="#C00000" :checked="isCheckAll" /><text>全选</text>
        </label>
      <!-- 总价 -->
      <view class="all-price">
        合计：<text>￥{{ checkedAmount }}</text>
      </view>
      <!-- 结算 -->
      <view class="settle-btn">结算({{ checkedCount }})</view>
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name:"goods_settle",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedAmount']),
      isCheckAll() {
        return this.checkedCount === this.total
      }
    },
    methods: {
      ...mapMutations('cart', ['checkedAll']),
      changeCheckAll() {
        this.checkedAll(!this.isCheckAll)
      }
    }
  }
</script>

<style lang="scss">
.settle-wrap {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 0 5px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .all-price {
    text {
      font-weight: bold;
    }
  }
  .settle-btn {
    min-width: 100px;
    height: 50px;
    background-color: #C00000;
    color: #fff;
    line-height: 50px;
    text-align: center;
  }
}
</style>