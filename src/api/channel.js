// 频道请求模块
import request from '@/utils/request.js'

const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels'
  })
}

const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

const deletUserChannel = channelId => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
export {
  getAllChannels,
  addUserChannel,
  deletUserChannel
}
