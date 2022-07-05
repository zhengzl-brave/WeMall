import http from '@/utils/request.js'

export function banner(data) {
  return http({
    url: '/api/public/v1/home/swiperdata',
    data
  })
}