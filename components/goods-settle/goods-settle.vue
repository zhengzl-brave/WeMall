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
      <view class="settle-btn" @click="handleSettle">结算({{ checkedCount }})</view>
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  export default {
    name:"goods_settle",
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    computed: {
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedAmount']),
      ...mapGetters('user', ['addStr']),
      ...mapState('user', ['token']),
      ...mapState('cart', ['cart']),
      
      isCheckAll() {
        return this.checkedCount === this.total
      }
    },
    methods: {
      ...mapMutations('cart', ['checkedAll']),
      ...mapMutations('user', ['setRedictInfo']),
      changeCheckAll() {
        this.checkedAll(!this.isCheckAll)
      },
      // 点击结算
      handleSettle() {
        if(!this.checkedCount) return uni.$showMsg('请选择购买商品！')
        if(!this.addStr) return uni.$showMsg('请填写收货地址！')
        if(!this.token) return this.delayNative()
        this.payOrder()
      },
      // 消息提示窗口
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算' + n + '秒后自动跳转到登录页',
          mask: true, // 遮罩 防止点击穿透
          duration: 1500
        })
      },
      // 倒计时提示
      delayNative() {
        this.seconds = 3 // 初始化倒计时时间
        this.showTips(this.seconds) // 刚开始就马上展示
        // 开启计时器
        this.timer = setInterval(() => {
          this.seconds --
          if(this.seconds <= 0) {
            clearInterval(this.timer)
            wx.switchTab({
              url: '/pages/mine/mine',
              success: () => {
                // 记录路径
                this.setRedictInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds) // 随着倒计时展示
        }, 1000)
      },
      // 订单支付流程：创建订单->创建预支付订单->微信支付->生成订单
      async payOrder() {
        // 创建订单对象
        const orderInfo = {
          // order_price: this.checkedAmount,
          order_price: 0.01, // 开发阶段写死0.01
          consignee_addr: this.addStr,
          goods: this.cart.filter(x => x.goods_state).map(item => ({
            goods_id: item.goods_id,
            goods_number: item.goods_count,
            goods_price: item.goods_price
          }))
        }
        // 发请求创建订单
        const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if(res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 获取服务器订单编号
        const order_number = res.message.order_number
        // 订单预支付
        const {data: res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number })
        if(res2.meta.status !== 200) return uni.$showMsg('预支付订单生成失败！')
        // 得到了微信订单支付的必须参数
        const payInfo = res2.message.pay
        // 实现微信支付 参考uni-app文档 传必要参数
        uni.requestPayment({
          provider: 'wxpay',
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: payInfo.signType,
          paySign: payInfo.paySign,
          success: async res => {
            // 完成支付进一步查询支付结果
            const {data: res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number })
            if(res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
            // 完成订单支付
            uni.showToast({
              title:'支付完成！',
              icon:'success'
            })
          },
          fail: err => {
            return uni.$showMsg('订单未支付！')
          }
        })
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