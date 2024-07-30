import axios, { AxiosInstance } from 'axios'
import { ipcMain } from 'electron'

const request: AxiosInstance = axios.create({
  // baseURL: 'https://api.example.com',
  timeout: 1000 * 6,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
// request.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // 在这里可以添加认证令牌等
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// 添加响应拦截器
// request.interceptors.response.use(
//   (response) => {
//     // 对响应数据做点什么
//     return response
//   },
//   (error) => {
//     // 对响应错误做点什么
//     if (error.response.status === 401) {
//       // 处理未授权的情况
//       console.error('Unauthorized access')
//     }
//     return Promise.reject(error)
//   }
// )

function initApiRequest() {
  ipcMain.on('api:request', async (event, url: string, options?: any) => {
    try {
      const response = await request(url, options)
      event.reply('api:response', { data: response.data })
    } catch (error) {
      event.reply('api:response', { error: error.toString() })
    }
  })
}

export { initApiRequest }
