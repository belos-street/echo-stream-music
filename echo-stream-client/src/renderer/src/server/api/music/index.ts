import { http } from '@renderer/server'
import { baseUrl } from '..'
import { FavoriteReq, SearchReq, SearchRes, Song } from '@renderer/type/song'

const api = {
  favorites: `${baseUrl}/song/favorites`,
  search: `${baseUrl}/song/search`
}

export const songGetFavoritesRequest = (data: FavoriteReq) =>
  http.get<Song[]>(api.favorites, { params: data })

export const searchRequest = (data: SearchReq) => http.post<SearchRes>(api.search, data)
