<template>
  <view>
    <view class="login">
      <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
      <button type="primary" class="login-btn" @click="getUserInfo">授权登录</button>
      <view class="login-desc">
        登录后尽享更多权益
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  export default {
    name:"we-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('user', ['redictInfo'])
    },
    methods: {
      ...mapMutations('user', ['setUserInfo', 'setToken']),
      ...mapMutations('user', ['setRedictInfo']),
      getUserInfo(e) {
        uni.getUserProfile({
          desc:'用于完善会员资料',
          success: res => {
            this.setUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: err => {
            if(err.errMsg === 'getUserProfile:fail auth deny') 
            return uni.$showMsg('您已取消授权登录！')
          }
        })
      },
      getToken(info) {
        // 获取code值
        uni.login({
          success: async res => {
            if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
            const query = {
              code: res.code,
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            }
            /* 此后台接口用不了 调用过程就是如此 **/
            // const { data: loginRes } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
            // if(loginRes.meta.status !== 200) return uni.$showMsg('登录失败！')
            this.setToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
            uni.$showMsg('登录成功！')
            this.naviageBack() // 返回原来页面
          },
          fail: err => {
            if(err) return uni.$showMsg('登录失败！')
          }
        })
      },
      // 返回登录前页面
      naviageBack() {
        if(this.redictInfo?.openType === 'switchTab') {
          uni.switchTab({
            url: this.redictInfo.from,
            // 导航成功后执行清除redictInfo
            complete: () => {
              this.setRedictInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.login {
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    transform: translateY(50%);
  }
  .login-btn {
    width: 90%;
    background-color: #C00000;
    border-radius: 100px;
    margin: 15px 0;
  }
  .login-desc {
    font-size: 13px;
    color: gray;
    
  }
}
</style>