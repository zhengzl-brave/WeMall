<template>
  <view>
    <uni-swipe-action>
      <block v-for="(item, index) in goodsList" :key="index">
        <uni-swipe-action-item :right-options="rightOption" :disabled="!isRightSwipe" @click="handleDelete(item)">
          <view class="goods-item" @click="handleClcik(item)">
            <view class="goods-left">
              <radio :checked="item[optonObj.goods_state]" color="#C00000" v-if="isRadio" @click="hanleRadio(item)"></radio>
              <image :src="item[optonObj.goods_small_logo] || defaultImg"></image>
            </view>
            <view class="goods-right">
              <view class="goods-title">{{ item[optonObj.goods_name] || '' }}</view>
              <view class="goods-info">
                <view class="goods-price">￥{{ priceFormat(item[optonObj.goods_price]) }}</view>
                <uni-number-box :min="1" :value="item[optonObj.goods_count]" v-if="isNumber" @change="handleChange($event, item)"></uni-number-box>
              </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
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
      },
      // 是否开启radio
      isRadio: {
        type: Boolean,
        default: false
      },
      // 是否开启计数器
      isNumber: {
        type: Boolean,
        default: false
      },
      // 是否开启右侧滑动
      isRightSwipe: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      optonObj() {
        return Object.assign({
          goods_small_logo: 'goods_small_logo',
          goods_name: 'goods_name',
          goods_price: 'goods_price',
          goods_state: 'goods_state',
          goods_count: 'goods_count'
        }, this.option)
      }
    },
    data() {
      return {
        defaultImg: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
        rightOption: [
          {
            text: "删除",
            style: {
              backgroundColor: "#C00000"
            }
          }
        ]
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
      },
      // 点击单选按钮
      hanleRadio(item) {
        this.$emit('changeRadio', {
          goods_id: item.goods_id,
          goods_state: !item.goods_state
        })
      },
      // 点击计数器
      handleChange(val, item) {
        this.$emit('changeCount', {
          goods_id: item.goods_id,
          goods_count: +val
        })
      },
      // 点击删除
      handleDelete(item) {
        this.$emit('deleteOne', {
          goods_id: item.goods_id
        })
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    image {
      width: 100px;
      height: 100px;
      display: block;
    }
    margin-right: 5px;
  }
  .goods-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-title {
      font-size: 13px;
    }
    .goods-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>
