import { ElectronAPI } from '@electron-toolkit/preload'
import type { Preload } from '.'
declare global {
  interface Window {
    electron: ElectronAPI
    api: Preload
  }
}
