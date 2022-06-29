<template>
  <view>
    <vide class="addres-add-btn" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收获地址+</button>
    </vide>
    <view class="address-info" @click="chooseAddress" v-else>
      <view class="wrap-one">
        <view class="person">
          收货人：
          <text>{{ address.userName }}</text>
        </view>
        <view class="phone">
          <view class="phone-right">
            电话：
            <text>{{ address.telNumber }}</text>
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="wrap-two">
        <view class="addr-label">收货地址：</view>
        <view class="addr-name">{{ addStr }}</view>
      </view>
    </view>
    <view class="bottom-border-img">
      <image src="../../static/cart_border@2x.png"></image>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    name:"goods_address",
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters('user', ['addStr']),
      ...mapState('user', ['address'])
    },
    methods: {
      ...mapMutations('user', ['setAddress']),
      // 选择收货地址
      chooseAddress() {
        // const [err, res] = await uni.chooseAddress().catch(err => err)
        uni.chooseAddress({
          success: res => {
            this.setAddress(res)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.addres-add-btn {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info {
  height: 90px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  .wrap-one {
    display: flex;
    justify-content: space-between;
    .phone {
      display: flex;
      text {
        margin-right: 5px;
      }
    }
  }
  .wrap-two {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .addr-label {
      white-space: nowrap;
    }
  }
}
.bottom-border-img {
  image {
    display: block;
    width: 100%;
    height: 5px;
  }
}
</style>