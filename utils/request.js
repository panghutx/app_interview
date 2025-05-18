import { METHODS } from "http"

let requestCount = 0

const request = (options) => {
  requestCount++
  uni.showLoading({ title: '加载中', mask: true })
  
  return new Promise((resolve, reject) => {
	  console.log("底层request",options)
    uni.request({
      // url: 'http://127.0.0.1:8000' + options.url,
      url: 'https://interview.youngsay.cn' + options.url,
      data: options.data || {},
      method : options.method || 'POST',
      header: {
		// 'Origin': 'http://localhost:8080',  // 显式声明
		    'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'X-Token': uni.getStorageSync('token') || '',
        ...options.header
      },
      success: (res) => {
		  console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          uni.showToast({ title: res.data.msg || '请求异常', icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
		  console.log(err)
        uni.showToast({ title: '网络连接失败', icon: 'none' })
        reject(err)
      },
      complete: () => {
        if (--requestCount <= 0) {
          uni.hideLoading()
        }
      }
    })
  })
}

export default request