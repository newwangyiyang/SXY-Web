import request from '@/utils/request'

// 管理员登录
export function login(data) {
  return request({
    url: '/admin/v2/system/doLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/admin/v2/system/doLogout',
    method: 'post'
  })
}
