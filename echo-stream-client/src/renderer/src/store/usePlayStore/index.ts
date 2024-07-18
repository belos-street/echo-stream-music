//当前播放的状态

// import { useLocalStorage } from '@renderer/hooks'
import { create } from 'zustand'

export enum PlayStaus {
  Playing,
  Paused
}

export enum PlayMode {
  Single = '单曲循环',
  Random = '随机播放',
  Loop = '列表循环'
}

export type PlayStore = {
  progress: number //0% ~100%
  setProgress: (progress: number) => void
  status: PlayStaus
  setStatus: (progress: PlayStaus) => void
  mode: PlayMode
  setMode: (mode: PlayMode) => void
  volume: number
  setVolume: (volume: number) => void
}

export const usePlayStore = create<PlayStore>((set) => {
  const mode = (window.localStorage.getItem('playMode') as PlayMode) ?? PlayMode.Loop
  const volume = Number(window.localStorage.getItem('playVolume'))
  return {
    progress: 0,
    setProgress: (progress) => set((state) => ({ ...state, progress })),
    status: PlayStaus.Paused,
    setStatus: (status) => set((state) => ({ ...state, status })),
    mode,
    setMode: (mode) =>
      set((state) => {
        window.localStorage.setItem('playMode', mode)
        return { ...state, mode }
      }),
    volume,
    setVolume: (volume) =>
      set((state) => {
        window.localStorage.setItem('playVolume', volume + '')
        return { ...state, volume }
      })
  }
})
