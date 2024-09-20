import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ipcMain } from 'electron'
import { IPCEvent } from '../eunm/ipcEunm'

const axiosInstance: AxiosInstance = axios.create({
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
        if (axios.isAxiosError(error)) {
          if (error.response) {
            /// 请求已发出，服务器返回了状态码范围不在 2xx 的响应
            event.reply(IPCEvent['api:response'], {
              error: error.response.data
            })
          } else {
            //说明请求已经发出但没有收到响应 或 设置请求时发生了错误
            event.reply(IPCEvent['api:response'], {
              error: 'Bad Request',
              message: 'Request failed',
              statusCode: null
            })
          }
        }
      }
    }
  )
}
