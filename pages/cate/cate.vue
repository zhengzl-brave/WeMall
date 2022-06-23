<template>
  <view>
    <view class="scroll-view-wrap">
      <scroll-view scroll-y="true" class="left-wrap" :style="{height: wh + 'px'}">
        <block v-for="(item, index) in cateList" :key="index">
          <view :class="['left-item', index === active ? 'active' : '']" @click="handleClickMenu(index)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <scroll-view scroll-y="true" class="right-wrap" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <block v-for="(item, index) in childCate" :key="index">
          <view class="right-twice-level">/ {{item.cat_name}} /</view>
          <view class="right-third-level">
            <view class="thrid-level-item" v-for="(child, key) in item.children" :key="key" @click="handleClickThird(child)">
              <image :src="child.cat_icon"></image>
              <text>{{ child.cat_name }}</text>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口可用高度
        wh: 0,
        // 分类菜单数据
        cateList: [],
        active: 0,
        // 二级分类
        childCate: [],
        // 滚动条距离顶部距离
        scrollTop: 0
      }
    },
    onLoad() {
      // 获取当前系统信息
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      // 获取分类数据
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.cateList = res.message
        this.childCate = res.message[0].children
      },
      // 点击分类菜单
      handleClickMenu(index) {
        this.active = index
        this.childCate = this.cateList[index].children
        // 让scrollTop 在0 和 1之间切换 因为不改变值没法触发响应式变化
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      // 点击三级分类跳转商品
      handleClickThird(item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-wrap {
  display: flex;
  .left-wrap {
    width: 120px;
    .left-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #ffffff;
        position: relative;
        &:before {
          content: '';
          display: block;
          height: 30px;
          width: 3px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .right-wrap {
    .right-twice-level {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .right-third-level {
      display: flex;
      flex-wrap: wrap;
      .thrid-level-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        image {
          width: 60px;
          height: 60px;
          padding-bottom: 4px;
        }
        text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
