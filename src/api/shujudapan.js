import request from '@/utils/request';

// 所有机构 /admin/v2/system/getAllOrg
export const getAllOrg = () => {
  return request({
    url: '/admin/v2/system/getAllOrg',
    method: 'get'
  })
};

// 总盘大数据 /admin/v2/stat/count
export const zongpanCount = (params) => {
  return request({
    url: '/admin/v2/stat/count',
    method: 'get',
    params
  })
};

// 总盘数据对比 /admin/v2/stat/allOrgCount
export const zongpanAllOrgCount = (params) => {
  return request({
    url: '/admin/v2/stat/allOrgCount',
    method: 'get',
    params
  })
}

// 总盘数据类别 /admin/v2/stat/classifyBorrowRank
export const zongPanClassifyBorrowRank = (params) => {
  return request({
    url: '/admin/v2/stat/classifyBorrowRank',
    method: 'get',
    params
  })
}

// 热门借阅榜单 /admin/v2/stat/bookBorrowRank
export const zongPanBookBorrowRank = (params) => {
  return request({
    url: '/admin/v2/stat/bookBorrowRank',
    method: 'get',
    params
  })
}

// 借阅达人榜 /admin/v2/stat/userborrowRank
export const zongPanUserborrowRank = (params) => {
  return request({
    url: '/admin/v2/stat/userborrowRank',
    method: 'get',
    params
  })
}
