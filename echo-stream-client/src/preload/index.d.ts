import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      request: <T>(url: string, options?: any) => Promise<T>
    }
  }
}
