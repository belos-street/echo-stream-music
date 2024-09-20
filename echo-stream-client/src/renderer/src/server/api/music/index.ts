import { http } from '@renderer/server'
import { baseUrl } from '..'
import { FavoriteReq, Song } from '@renderer/type/song'

const api = {
  favorites: `${baseUrl}/song/favorites`
}

export const songGetFavoritesRequest = (data: FavoriteReq) =>
  http.get<Song[]>(api.favorites, { params: data })
