<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: []
      };
    },
    onLoad() {
      this.getSwiperList()
    },
    methods: {
      async getSwiperList() {
        const { data:res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status !== 200) {
          return uni.showToast({
            title: '数据加载失败',
            duration: 1500,
            icon: 'none'
          })
        }
        this.swiperList = res.message
        console.log(res)
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item, image {
    height: 100%;
    width: 100%;
  }
}
</style>
