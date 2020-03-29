import request from '@/utils/request';

// 所有用户组 /admin/v2/user/deptList
export const getDeptList = () => {
  return request({
    url: '/admin/v2/user/deptList',
    method: 'get'
  })
};

// 用户列表 /admin/v2/user/search
export const searchUser = (params) => {
  return request({
    url: '/admin/v2/user/search',
    method: 'get',
    params
  })
};

// 用户借阅记录 /admin/v2/user/borrowList
export const getBorrowList = (params) => {
  return request({
    url: '/admin/v2/user/borrowList',
    method: 'get',
    params
  })
}

// 用户新增 /admin/v2/user/add
export const addUser = (params) => {
  return request({
    url: '/admin/v2/user/add',
    method: 'post',
    data: params
  })
}

// 用户编辑 /admin/v2/user/update
export const updateUser = (params) => {
  return request({
    url: '/admin/v2/user/update',
    method: 'post',
    data: params
  })
}

// 用户删除 /admin/v2/user/delete
export const deleteUser = (params) => {
  return request({
    url: '/admin/v2/user/delete',
    method: 'post',
    data: params
  })
}

// 用户批量删除 /admin/v2/stat/userborrowRank
export const deleteHandler = (params) => {
  return request({
    url: '/admin/v2/stat/userborrowRank',
    method: 'post',
    data: params
  })
}

// 下载批量新增用户模板 /admin/v2/stat/userborrowRank
export const zongPanUserborrowRank1 = (params) => {
  return request({
    url: '/admin/v2/stat/userborrowRank',
    method: 'get',
    params
  })
}

// 用户批量上传 /admin/v2/stat/bookBorrowRank
export const zongPanBookBorrowRank11 = (params) => {
  return request({
    url: '/admin/v2/stat/bookBorrowRank',
    method: 'post',
    data: params
  })
}
