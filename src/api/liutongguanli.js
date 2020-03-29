import request from '@/utils/request'

// 借阅列表 /admin/v2/borrow/search
export const borrowSearchList = (params) => {
  return request({
    url: '/admin/v2/borrow/search',
    method: 'get',
    params
  })
}

// 根据条形码获取图书信息 /admin/v2/book/getInfoByItem
export const getInfoByItem = (params) => {
  return request({
    url: '/admin/v2/book/getInfoByItem',
    method: 'get',
    params
  })
}

// 根据读者卡号获取图书信息 /admin/v2/borrow/userInfo
export const getUserInfoByNum = (params) => {
  return request({
    url: '/admin/v2/borrow/userInfo',
    method: 'get',
    params
  })
}

// 批量借书 /admin/v2/borrow/borrowBook
export const borrowBookByArr = (params) => {
  return request({
    url: '/admin/v2/borrow/borrowBook',
    method: 'post',
    data: params
  })
}

// 批量还书 /admin/v2/borrow/returnBook
export const returnBookByArr = (params) => {
  return request({
    url: '/admin/v2/borrow/returnBook',
    method: 'post',
    data: params
  })
}
