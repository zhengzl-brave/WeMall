<template>
  <view>
    <!-- 轮播区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item class="swiper-item" v-for="(item, index) in goodsInfo.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-wrap" v-if="goodsInfo.goods_name">
      <view class="goods-price">￥{{ goodsInfo.goods_price }}</view>
      <view class="goods-msg">
        <view class="goods-title">{{ goodsInfo.goods_name || '--' }}</view>
        <view class="goods-store">
          <text>收藏</text>
          <uni-icons type="star" size="18" color="gray"></uni-icons>
        </view>
      </view>
      <view class="freight">快递：免运费</view>
      <!-- 富文本图文信息 -->
      <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    </view>
    <!-- 底部商品导航 -->
    <view class="bottom-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo: {},
        // 商品导航uni数据
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(option) {
      const goods_id = option.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsInfo = res.message
        // 正则匹配添加富文本图标样式属性 去除图标边距 为了解决ios无法识别webp,将webp替换为jpg
        this.goodsInfo.goods_introduce = this.goodsInfo.goods_introduce.replace(/<img /g,
          '<img style="display:block"').replace(/webp/g, 'jpg')
      },
      // 图片预览
      preview(index) {
        uni.previewImage({
          current: index, // 当前索引
          urls: this.goodsInfo.pics.map(item => item.pics_big) // 返回存大图的所有url的数组
        })
      },
      // 点击底部导航左侧按钮
      onClick(e) {
        if(e.content.text === '购物车') {
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      // 点击底部导航右侧按钮
      buttonClick() {}
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-wrap {
    padding: 10px 5px;
    padding-bottom: 50px;
    .goods-price {
      font-size: 18px;
      color: #C00000;
    }

    .goods-msg {
      display: flex;
      justify-content: space-between;

      .goods-title {
        font-size: 13px;
        padding-right: 10px;
      }

      .goods-store {
        width: 120px;
        display: flex;
        flex-direction: column;
        color: gray;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
      }
    }

    .freight {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
