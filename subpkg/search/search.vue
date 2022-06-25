<template>
  <view>
    <!-- 搜索输入框 -->
    <view class="search-container">
      <uni-search-bar @input="input" cancelButton="none" :radius="100" placeholder="输入搜索内容" :focus="true"></uni-search-bar>
    </view>
    <!-- 搜索结果列表 -->
    <view class="search-list" v-if="searchResults.length !== 0">
      <view class="search-item" v-for="(item, index) in searchResults" :key="index" @click="handleToDeatil(item)">
        <view class="item-title">{{item.goods_name}}</view>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-list" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-item">
        <uni-tag :text="item" v-for="(item, index) in histories" :key="index" @click="handleToGoods(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        timer: null,
        // 搜索结果数据
        searchResults: [],
        // 历史数据
        historyList: []
      };
    },
    computed: {
      histories() {
        // 去重
        return [...new Set(this.historyList)]
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('keyword') || '[]')
    },
    methods: {
      // 输入文本事件触发
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyword = e
          this.getSearchList()
        }, 500)
      },
      // 获取搜索结果数据列表
      async getSearchList() {
        if(this.keyword === '') {
          this.searchResults = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.keyword})
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveHistoryWord()
      },
      // 点击搜索商品项跳转商品详情
      handleToDeatil(item) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 存储历史关键字
      saveHistoryWord() {
        this.historyList.unshift(this.keyword)
        // 本地存储
        uni.setStorageSync('keyword', JSON.stringify(this.historyList))
      },
      // 清除历史记录
      clearHistory() {
        this.historyList = []
        uni.setStorageSync('keyword', '[]')
      },
      // 点击历史记录跳转商品列表
      handleToGoods(keyword) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + keyword
        })
      }
    }
  }
</script>

<style lang="scss">
.search-container {
  background-color: #C00000;
  position: sticky;
  top: 0;
  z-index: 999;
}
.search-list {
  padding: 0 5px;
  .search-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    .item-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
      font-size: 13px;
    }
  }
}
.history-list {
    padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }
  .history-item {
    display: flex;
    flex-wrap: wrap;
    .uni-tag {
      margin: 5px 5px 0 0;
    }
  }
}
</style>
