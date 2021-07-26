/*
 * 频道请求模块
 */

import request from '@/utils/request'

/**
 *  获取所有频道列表
 */

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 *  添加用户频道
 */

export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除频道
 */

export const deleteChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
