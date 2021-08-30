import { request } from 'network/request.js'

export function getOrderList(queryInfo) {
  return request().get('orders', {
    params: queryInfo
  })
}

export function getExpressInfo() {
  return request().get('kuaidi/1106975712662')
}