// 失败弹窗
export const showMsg = function(title = "数据加载失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}