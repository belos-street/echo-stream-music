import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      request: <T>(method: HTTPMethod, api: string, config?: AxiosRequestConfig) => Promise<T>
    }
  }
}
