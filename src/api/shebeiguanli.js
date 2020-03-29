import request from '@/utils/request';

// 查询设备列表 /admin/v2/device/search
export const deviceSearch = (params) => {
  return request({
    url: '/admin/v2/device/search',
    method: 'get',
    params
  })
};
