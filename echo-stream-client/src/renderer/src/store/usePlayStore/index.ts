import { create } from 'zustand'

export type PlayStore = {
  progress: number //0% ~100%
  setProgress: (progress: number) => void
}

export const usePlayStore = create<PlayStore>((set) => ({
  progress: 0,
  setProgress: (progress) => set((state) => ({ ...state, progress }))
}))
