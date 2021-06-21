/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */

export const setItem = (key, value) => {
  if (typeof value === 'object') {
    // 将数组，对象型的数据转换成JSON 格式字符串进行存储
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
/**
 * 删除数据
 */
export const removItem = key => {
  window.localStorage.removeItem(key)
}
