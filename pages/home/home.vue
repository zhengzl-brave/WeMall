<template>
  <view>
    <!-- 搜索 -->
    <view class="search-wrap">
      <smart-search @handleSearch="handleSearch"></smart-search>
    </view>
    <!-- 轮播 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="handleNav(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-img"></image>
        <!-- 楼层图片 -->
        <view class="floor-img-box">
          <navigator class="img-left" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <view class="img-right">
            <navigator class="img-right-item" v-for="(child, key) in item.product_list.slice(1,5)" :key="key"
              :url="child.url">
              <image :src="child.image_src" :style="{width: child.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import carBar from '@/mixins/cart_bar.js'
  export default {
    mixins: [carBar],
    data() {
      return {
        // 轮播
        swiperList: [],
        // 分类导航
        navList: [],
        // 楼层
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取轮播数据
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message
      },
      // 获取分类导航数据
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.navList = res.message
      },
      // 获取楼层数据
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 点击分类跳转
      handleNav(item) {
        switch (item.name) {
          case "分类":
            uni.switchTab({
              url: '/pages/cate/cate'
            })
            break
        }
      },
      handleSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-wrap {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-list {
    .floor-img {
      width: 100%;
      height: 60rpx;
    }

    .floor-img-box {
      display: flex;
      padding-left: 10rpx;

      .img-right {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-left: 10rpx;
      }
    }
  }
</style>
