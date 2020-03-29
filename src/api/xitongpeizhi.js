import request from '@/utils/request';

// 管理员列表 /admin/v2/system/accountList
export const accountList = () => {
  return request({
    url: '/admin/v2/system/accountList',
    method: 'get',
  })
}

// 微信绑定二维码 /admin/v2/system/makeQrcodeBindWeixin
export const makeQrcodeBindWeixin = (params) => {
  return request({
    url: '/admin/v2/system/makeQrcodeBindWeixin',
    method: 'get',
    params
  })
}

// 修改密码 /admin/v2/system/changePassword
export const changePassword = (params) => {
  return request({
    url: '/admin/v2/system/changePassword',
    method: 'post',
    data: params
  })
}

// 用户组列表 /admin/v2/system/deptList
export const deptList = () => {
  return request({
    url: '/admin/v2/system/deptList',
    method: 'get'
  })
}
