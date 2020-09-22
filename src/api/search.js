// 搜索接口
import request from '@/utils/request'

const getSearchSuggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
const getSearch = params => {
  return request({
    url: '/app/v1_0/search',
    params
  })
}

export {
  getSearchSuggestion,
  getSearch
}
