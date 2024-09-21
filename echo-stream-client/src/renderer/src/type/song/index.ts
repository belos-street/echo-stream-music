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
}

export type Artist = {
  biography: string
  coverUrl: string
  createTime: string
  id: number
  title: string
}
