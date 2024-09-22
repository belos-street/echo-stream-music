// 当前播放的歌曲信息
import { Song } from '@renderer/type/song'
import { create } from 'zustand'

export type SongStore = {
  song: Song
  setSong: (song: Song) => void
}

const initSongInfo: Song = {
  id: 0,
  title: '暂无歌曲',
  fileUrl: '',
  lyricsUrl: '',
  coverUrl: '',
  duration: 0,
  createTime: '',
  artist: '',
  artistId: 0
}

export const useSongStore = create<SongStore>((set) => ({
  song: initSongInfo,
  setSong: (song: Song) => set({ song })
}))
