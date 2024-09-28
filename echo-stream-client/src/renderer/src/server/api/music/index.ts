import { http } from '@renderer/server'
import { baseUrl } from '..'
import {
  FavoriteReq,
  MarkReq,
  MarkRes,
  RecommendReq,
  SearchReq,
  SearchRes,
  Song
} from '@renderer/type/song'

const api = {
  favorites: `${baseUrl}/song/favorites`,
  search: `${baseUrl}/song/search`,
  mark: `${baseUrl}/song/mark`,
  history: `${baseUrl}/song/history`,
  recommend: `${baseUrl}/song/recommend`
}

export const songGetFavoritesRequest = (data: FavoriteReq) =>
  http.get<Song[]>(api.favorites, { params: data })

export const searchRequest = (data: SearchReq) => http.post<SearchRes>(api.search, data)

export const songMarkRequest = (data: MarkReq) => http.post<MarkRes>(api.mark, data)

export const addHistoryRequest = (data: MarkReq) => http.post(api.history, data)

export const getRecommendRequest = (data: RecommendReq) =>
  http.get<Song[]>(api.recommend, { params: data })
