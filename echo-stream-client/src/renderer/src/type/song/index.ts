export type FavoriteReq = {
  userId: number
}

export type Song = {
  id: number
  title: string
  fileUrl: string
  lyricsUrl: string
  coverUrl: string
  duration: number
  createTime: string
  index?: number
  artist: string
  artistId: number
  isFavorite?: boolean
}

export type Artist = {
  biography: string
  coverUrl: string
  createTime: string
  id: number
  title: string
}

export enum SearchType {
  Song = 0,
  Artist
}

export type SearchReq = {
  keyword: string
  type: SearchType // 0: song, 1: artist
  userId: number
}

export type SearchRes = {
  songs: Song[]
  artists: Artist[]
  total: number
}
