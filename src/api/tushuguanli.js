import request from '@/utils/request';
import requestDown from '@/utils/requestDown';

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

// 批量删除 /admin/v2/book/deleteBatch
export const deleteBatch = (params) => {
  return request({
    url: '/admin/v2/book/deleteBatch',
    method: 'post',
    data: params
  })
}

// 上传图书封面 /admin/v2/book/uploadCoverimg/add
export const coverImgUpload = (params) => {
  return request({
    url: '/admin/v2/book/uploadCoverimg/add',
    method: 'post',
    data: params
  })
}

// 批量新增图书 /admin/v2/book/addBatch
export const addBatchBooks = (params) => {
  return request({
    url: '/admin/v2/book/addBatch',
    method: 'post',
    data: params
  })
}

// 图书采购: 处理为采购中 /admin/v2/book/doBookShoping
export const doBookShoping = (params) => {
  return request({
    url: '/admin/v2/book/doBookShoping',
    method: 'post',
    data: params
  })
}

// 图书采购: 处理为已上架 /admin/v2/book/doBookShoped
export const doBookShoped = (params) => {
  return request({
    url: '/admin/v2/book/doBookShoped',
    method: 'post',
    data: params
  })
}

// 图书采购: 删除操作 admin/v2/book/deleteBookShop
export const deleteBookShop = (params) => {
  return request({
    url: 'admin/v2/book/deleteBookShop',
    method: 'post',
    data: params
  })
}


// 导出: 单本图书的借阅记录 /admin/v2/book/excelBorrowList
export const excelBorrowList = (params) => {
  return requestDown({
    url: '/admin/v2/book/excelBorrowList',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 图书批量导出模板下载 /admin/v2/book/excelTemplate
export const excelTemplate = () => {
  return requestDown({
    url: '/admin/v2/book/excelTemplate',
    method: 'post',
    responseType: 'blob'
  })
}
