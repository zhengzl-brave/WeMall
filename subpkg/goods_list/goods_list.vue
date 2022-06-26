<template>
  <view>
    <!-- 调用商品的列表组件 -->
    <goods-item :goodsList="goodsList" @handleToDetail="handleToDetail"></goods-item>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '', // 查询关键字
          cid: '', // 商品分类id
          pagesize: 10,
          pagenum: 1
        },
        goodsList: [],
        total: 0,
        // 节流阀
        isLoading: false
      };
    },
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        // 下拉刷新调用callback回调
        cb && cb()
        if(res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 跳转详情调用
      handleToDetail(item) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    // 上拉加载，触底触发方法
    onReachBottom() {
      // 当pageNum * pageSize 大于等于总数时代表没有更多了
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('没有更多数据了!')
      if(this.isLoading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    // 下拉刷新
    onPullDownRefresh() {
      // 重置数据
      this.queryObj.pagenum = 1
      this.queryObj.isLoading = false
      this.total = 0
      this.goodsList = []
      // 请求数据
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
