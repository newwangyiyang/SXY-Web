import request from '@/utils/request';

// 消息列表 /admin/v2/system/messageCenterList
export const messageCenterList = (params) => {
  return request({
    url: '/admin/v2/system/messageCenterList',
    method: 'get',
    params
  })
}

// 平台公告列表 /admin/v2/system/messageNoticeList
export const messageNoticeList = (params) => {
  return request({
    url: '/admin/v2/system/messageNoticeList',
    method: 'get',
    params
  })
}
