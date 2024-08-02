import { AxiosRequestConfig } from 'axios'

const request = window.api.request

export const http = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request('get', url, config),
  post: <T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> =>
    request('post', url, { data, ...config }),
  put: <T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> =>
    request('put', url, { data, ...config }),
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request('delete', url, config)
}
