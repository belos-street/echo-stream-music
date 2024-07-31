import { ElectronAPI } from '@electron-toolkit/preload'
import type { HTTPMethod } from '../main/request'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      request: <T>(method: HTTPMethod, api: string, config?: AxiosRequestConfig) => Promise<T>
    }
  }
}
