
// 封装本地储存

// 获取本地存储数据
const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 设置本地存储数据
const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 删除本地存储数据
const removeItem = name => {
  window.localStorage.removeItem(name)
}

// 暴露方法
export {
  getItem, setItem, removeItem
}
