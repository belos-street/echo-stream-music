//当前播放的歌曲状态
import { create } from 'zustand'

export enum PlayStaus {
  Playing,
  Paused
}

export type PlayStore = {
  progress: number //0% ~100%
  setProgress: (progress: number) => void
  status: PlayStaus
  setStatus: (progress: PlayStaus) => void
}

export const usePlayStore = create<PlayStore>((set) => ({
  progress: 0,
  setProgress: (progress) => set((state) => ({ ...state, progress })),
  status: PlayStaus.Paused,
  setStatus: (status) => set((state) => ({ ...state, status }))
}))
