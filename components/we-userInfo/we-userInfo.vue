<template>
  <view class="user-cont">
    <view class="header">
      <image :src="userInfo.avatarUrl" class="avater"></image>
      <view class="nickname">{{ userInfo.nickName }}</view>
    </view>
    <view class="panel-list">
      <!-- panel-one -->
      <view class="panel">
        <view class="body">
          <view class="panel-item" v-for="(item, index) in panelOne" :key="index">
            <text>{{ item.num }}</text>
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>
      <!-- panel-two -->
      <view class="panel">
        <view class="title">我的订单</view>
        <view class="body">
          <view class="panel-item" v-for="(item, index) in panelTwo" :key="index">
            <image :src="item.icon" class="icon"></image>
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>
      <!-- panel-three -->
      <view class="panel">
        <view class="panel-list" v-for="(item, index) in panelThree" @click="handlePanelTree(item)" :key="index">
          <text>{{ item }}</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name:"we-userInfo",
    data() {
      return {
        panelOne: [
          { num: 8, label: '收藏的店铺' },
          { num: 15, label: '收藏的商品' },
          { num: 18, label: '关注的商品' },
          { num: 84, label: '足迹' },
        ],
        panelTwo: [
          { icon: '/static/my-icons/icon1.png', label: '待付款' },
          { icon: '/static/my-icons/icon2.png', label: '待收货' },
          { icon: '/static/my-icons/icon3.png', label: '退款/退货' },
          { icon: '/static/my-icons/icon4.png', label: '全部订单' },
        ],
        panelThree: ['收货地址', '联系客服', '退出登录']
      };
    },
    computed: {
      ...mapState('user', ['userInfo'])
    },
    methods: {
      ...mapMutations('user', ['setAddress', 'setUserInfo', 'setToken']),
      handlePanelTree(item) {
        switch(item) {
          case "退出登录":
            this.logout()
            break
          default:
            return
        }
      },
      async logout() {
        const [err, res] = await uni.showModal({
          title:'提示',
          content:'确定退出登录吗？'
        }).catch(err => err)
        if(res?.confirm) {
          this.setAddress({})
          this.setUserInfo({})
          this.setToken('')
        }
      }
    }
  }
</script>

<style lang="scss">
.user-cont {
  height: 100%;
  background-color: #f4f4f4;
  .header {
    height: 400rpx;
    background-color: #C00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avater {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      color: #fff;
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .panel-list {
    padding: 0 10px;
    .panel {
      background-color: #fff;
      border-radius: 3px;
      position: relative;
      top: -10px;
      margin-bottom: 10px;
      .title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border: 1px solid #f4f4f4;
      }
      .body {
        display: flex;
        justify-content: space-around;
        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;
          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
      .panel-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
        padding: 0 10px;
        font-size: 15px;
      }
    }
  }
}
</style>