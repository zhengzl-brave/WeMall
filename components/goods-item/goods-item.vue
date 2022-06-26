<template>
  <view>
    <block v-for="(item, index) in goodsList" :key="index">
      <view class="goods-item" @click="handleClcik(item)">
        <view class="goods-left">
          <image :src="item[optonObj.goods_small_logo] || defaultImg"></image>
        </view>
        <view class="goods-right">
          <view class="goods-title">{{ item[optonObj.goods_name] || '' }}</view>
          <view class="goods-info">
            <view class="goods-price">￥{{ priceFormat(item[optonObj.goods_price]) }}</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    props: {
      goodsList: {
        type: Array,
        default: () => []
      },
      // 可选项 当名称与后台返回不一致时可添加该属性更改字段名
      option: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      optonObj() {
        return Object.assign({
          goods_small_logo: 'goods_small_logo',
          goods_name: 'goods_name',
          goods_price: 'goods_price'
        }, this.option)
      }
    },
    data() {
      return {
        defaultImg: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png"
      };
    },
    methods: {
      // 价格格式转换
      priceFormat(num) {
        return num.toFixed(2)
      },
      // 跳转方法
      handleClcik(item) {
        this.$emit('handleToDetail', item)
      }
    }
  }
</script>

<style lang="scss">
.goods-item {
  padding: 10px 5px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  .goods-left {
    image {
      width: 100px;
      height: 100px;
      display: block;
    }
    margin-right: 5px;
  }
  .goods-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-title {
      font-size: 13px;
    }
    .goods-info {
      .goods-price {
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>
