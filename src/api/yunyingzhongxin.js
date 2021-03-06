import request from '@/utils/request';
import requestDown from '@/utils/requestDown';
// 馆藏地列表 /admin/v2/stat/getCollectionList
export const getCollectionList = () => {
  return request({
    url: '/admin/v2/stat/getCollectionList',
    method: 'get'
  });
};

// 图书借阅数据 /admin/v2/stat/bookCount
export const bookCount = (params) => {
  return request({
    url: '/admin/v2/stat/bookCount',
    method: 'get',
    params
  });
};

// 馆藏地数据对比 /admin/v2/stat/collectionDataList
export const collectionDataList = (params) => {
  return request({
    url: '/admin/v2/stat/collectionDataList',
    method: 'get',
    params
  })
}

// 馆藏地借阅趋势 /admin/v2/stat/collcetionBorrowLine
export const collcetionBorrowLine = (params) => {
  return request({
    url: '/admin/v2/stat/collcetionBorrowLine',
    method: 'get',
    params
  })
}

// 图书借阅分类 /admin/v2/stat/classifyBorrowRank
export const classifyBorrowRank = (params) => {
  return request({
    url: '/admin/v2/stat/classifyBorrowRank',
    method: 'get',
    params
  })
}

// 热门借阅榜单 /admin/v2/stat/bookBorrowRank
export const adminBookBorrowRank = (params) => {
  return request({
    url: '/admin/v2/stat/bookBorrowRank',
    method: 'get',
    params
  })
}

// 热门借阅榜单(分页) /admin/v2/stat/bookBorrowRankPage
export const bookBorrowRankPage = (params) => {
  return request({
    url: '/admin/v2/stat/bookBorrowRankPage',
    method: 'get',
    params
  })
}

// 读者借阅数据 /admin/v2/stat/userCount
export const userCount = (params) => {
  return request({
    url: '/admin/v2/stat/userCount',
    method: 'get',
    params
  })
}

// 读者活跃统计 /admin/v2/stat/userActiveData
export const userActiveData = (params) => {
  return request({
    url: '/admin/v2/stat/userActiveData',
    method: 'get',
    params
  })
}

// 借阅达人榜 /admin/v2/stat/userborrowRank
export const userborrowRank = (params) => {
  return request({
    url: '/admin/v2/stat/userborrowRank',
    method: 'get',
    params
  })
}

// 借阅榜单(分页) /admin/v2/stat/userborrowRankPage
export const userborrowRankPage = (params) => {
  return request({
    url: '/admin/v2/stat/userborrowRankPage',
    method: 'get',
    params
  })
}

// 设备使用统计 /admin/v2/stat/deviceCount
export const deviceCount = () => {
  return request({
    url: '/admin/v2/stat/deviceCount',
    method: 'get'
  })
}

// 设备异常列表 /admin/v2/stat/deviceAbnormalList
export const deviceAbnormalList = () => {
  return request({
    url: '/admin/v2/stat/deviceAbnormalList',
    method: 'get'
  })
}

// 借阅数据分页 /admin/v2/stat/collection
export const collectionPage = (params) => {
  return request({
    url: '/admin/v2/stat/collection',
    method: 'get',
    params
  })
}

// 图书分类列表 /admin/v2/book/classifyList
export const classifyList = () => {
  return request({
    url: '/admin/v2/book/classifyList',
    method: 'get'
  })
}

// 图书分类统计 /admin/v2/stat/classify
export const classifyPage = (params) => {
  return request({
    url: '/admin/v2/stat/classify',
    method: 'get',
    params
  })
}

// 读者借阅数据 /admin/v2/stat/user
export const borrowUser = (params) => {
  return request({
    url: '/admin/v2/stat/user',
    method: 'get',
    params
  })
}

// 读者用户组列表 /admin/v2/user/deptList
export const yyzxDeptList = () => {
  return request({
    method: 'get',
    url: '/admin/v2/user/deptList'
  })
}


// 读者用户活跃 /admin/v2/stat/userDept
export const userDept = (params) => {
  return request({
    url: '/admin/v2/stat/userDept',
    method: 'get',
    params
  })
}

// 异常列表分页 /admin/v2/stat/deviceBreak
export const deviceBreakPage = (params) => {
  return request({
    url: '/admin/v2/stat/deviceBreak',
    method: 'get',
    params
  })
}

// 设备列表 /admin/v2/stat/deviceBorrowData
export const deviceBorrowData = (params) => {
  return request({
    url: '/admin/v2/stat/deviceBorrowData',
    method: 'get',
    params
  })
}

// 导出: 图书分类统计 /admin/v2/stat/excelClassify
export const excelClassify = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelClassify',
    method: 'post',
    responseType: 'blob',
    data: params
  })
};

// 导出: 热门借阅榜单 /admin/v2/stat/excelBookBorrowRank
export const excelBookBorrowRank = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelBookBorrowRank',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 图书借阅数据 /admin/v2/stat/excelCollection
export const excelCollection = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelCollection',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 读者借阅数据 /admin/v2/stat/excelUser
export const excelUser = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelUser',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 读者活跃 /admin/v2/stat/excelUserDept
export const excelUserDept = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelUserDept',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 借阅达人表单 /admin/v2/stat/excelUserborrowRank
export const excelUserborrowRank = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelUserborrowRank',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 设备使用统计 /admin/v2/stat/excelDeviceBorrowData
export const excelDeviceBorrowData = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelDeviceBorrowData',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

// 导出: 设备异常 /admin/v2/stat/excelDeviceBreak
export const excelDeviceBreak = (params) => {
  return requestDown({
    url: '/admin/v2/stat/excelDeviceBreak',
    method: 'post',
    responseType: 'blob',
    data: params
  })
}
