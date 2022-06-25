<template>
  <view>
    <view class="serarch-container" :style="{'background-color': bgColor}" @click="handleClick">
      <view class="search-wrap" :style="{'border-radius': borderRadisu + 'px'}">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"smart-search",
    props: {
      // 背景
      bgColor: {
        type: String,
        default: "#C00000"
      },
      // 圆角值
      borderRadisu: {
        type: Number,
        default: 15
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      handleClick() {
        this.$emit('handleSearch')
      }
    }
  }
</script>

<style lang="scss">
.serarch-container {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .search-wrap {
      background-color: #fff;
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    .placeholder {
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>