import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/keyboard/list',
    method: 'post',
    data
  })
}

export function editor(data) {
  return request({
    url: '/keyboard/editor',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/keyboard/add',
    method: 'post',
    data
  })
}
