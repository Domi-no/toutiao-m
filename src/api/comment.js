import request from '@/utils/request'

/**
   * 获取文章列表
   */
const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
/**
 * 对评论或评论回复点赞
 */
const addCommentLike = (commentId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
   * 取消对评论或评论回复点赞
   */
const deleteCommentLike = (commentId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

/**
 * 添加评论或评论回复
 */
const addComment = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}

export {
  getComments,
  addCommentLike,
  deleteCommentLike,
  addComment
}
