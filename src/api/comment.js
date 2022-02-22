/**
 * 评论请求模块
 */

import request from '@/utils/request'

/**
 * 获取文章评论列表
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    // GET 参数使用 params 进行传递
    // 传入的时候是对象， 发送给后端的形式？
    // axios 会把 params 对象转为 key=value?key=value 的格式拼接到 url 中携带
    params
  })
}

/**
 * 对评论或评论回复点赞
*/
export const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
export function deleteCommentLike(commentId) {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}

/**
 * 发布文章评论或评论回复
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
