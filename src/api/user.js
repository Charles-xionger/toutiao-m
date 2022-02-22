/**
 * 用户相关的请求模块
 */

import request from '@/utils/request'
// import store from '@/store'

export const login = (data) => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码 每分钟发送一次
 * @param {*} mobile
 * @returns
 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // // 发送请求头数据
    // headers: {
    //   // 注意： 接口需要授权才能访问
    //   // token 的数据格式： Bearer token数据，注意Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户频道数据
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

/**
 * 关注用户
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 * @param {被取消关注的用户id} target
 * @returns
 */
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `app/v1_0/user/followings/${target}`
  })
}

/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 获取当前登录用户的个人资料
 */
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新用户头像
 */
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
