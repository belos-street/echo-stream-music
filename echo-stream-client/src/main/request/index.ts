import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ipcMain } from 'electron'
import { IPCEvent } from '../eunm/ipcEunm'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 6,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export function setupApiRequest() {
  ipcMain.on(
    IPCEvent['api:request'],
    async (event, method: HTTPMethod, api: string, config?: AxiosRequestConfig) => {
      try {
        let response: AxiosResponse
        if (method !== 'get') {
          if (!config || !config.data) throw new Error('Missing data for POST request')
          response = await axiosInstance[method](api, config?.data, config)
        } else {
          response = await axiosInstance.get(api, config)
        }
        event.reply(IPCEvent['api:response'], response.data)
      } catch (error) {
        const errorData: AxiosError = error as AxiosError
        event.reply(IPCEvent['api:response'], errorData.response!.data)
      }
    }
  )
}

// 添加请求拦截器
// request.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // 在这里可以添加认证令牌等
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
//   },/^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/
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
