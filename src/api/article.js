import request from '@/utils/request.js'

const getArticle = function (params) {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}

// 获取文章

const getArticleById = function (articleId) {
  return request({
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏文章
 */
const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

/**
 * 点赞
 */
const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

export {
  getArticle,
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
}
