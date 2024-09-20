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
}
