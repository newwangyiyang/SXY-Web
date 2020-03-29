import request from '@/utils/request';

// 馆藏地列表 /admin/v2/book/collectionList
export const collectionList = () => {
  return request({
    url: '/admin/v2/book/collectionList',
    method: 'get'
  })
}

// 图书种类列表 /admin/v2/book/classifyList
export const classifyList = () => {
  return request({
    url: '/admin/v2/book/classifyList',
    method: 'get'
  })
}

// 馆藏查询 /admin/v2/book/search
export const gcSearch = (params) => {
  return request({
    url: '/admin/v2/book/search',
    method: 'get',
    params
  })
}

// 获取图书详情 /admin/v2/book/detail
export const gcDetail = (params) => {
  return request({
    url: '/admin/v2/book/detail',
    method: 'get',
    params
  })
}

// 图书更新 /admin/v2/book/update
export const bookUpdate = (params) => {
  return request({
    url: '/admin/v2/book/update',
    method: 'post',
    data: params
  })
}

// 图书单本删除 /admin/v2/book/delete
export const bookDelete = params => {
  return request({
    url: '/admin/v2/book/delete',
    method: 'post',
    data: params
  })
}

// 图书借阅记录 /admin/v2/book/borrowList
export const borrowList = params => {
  return request({
    url: '/admin/v2/book/borrowList',
    method: 'get',
    params
  })
}

// 图书新增 /admin/v2/book/add
export const bookAdd = params => {
  return request({
    url: '/admin/v2/book/add',
    method: 'post',
    data: params
  })
}

// 图书荐购 /admin/v2/book/recommendList
export const recommendList = params => {
  return request({
    url: '/admin/v2/book/recommendList',
    method: 'get',
    params
  })
}

// 图书采购分页 /admin/v2/book/shopPage
export const caigouShowPage = (params) => {
  return request({
    url: '/admin/v2/book/shopPage',
    method: 'get',
    params
  })
}
