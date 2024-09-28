import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MarkFavoriteDto } from './dto/mark.dto'
import { GetArtistInfoDto } from './dto/artist.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { ArtistEntity } from './entities/artist.entity'
import { FavoriteEntity } from './entities/favorite.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { SongEntity } from './entities/song.entity'
import { successResponse } from 'util/apiResponse'
import { GetFavoritesDto } from './dto/favorites.dto'
import { SearchDto, SearchType } from './dto/search.dto'
import { MarkHistoryDto } from './dto/history.dto'
import { HistoryEntity } from './entities/history.entity'
import { RecommendDto } from './dto/recommend.dto'
import { GenreEntity } from './entities/genre.entity'
import { mergeMaps } from './src/mergeMaps'
import { PreferenceItem, Score } from './src'

@Injectable()
export class SongService {
  @InjectRepository(ArtistEntity)
  private artistRepository: Repository<ArtistEntity>
  @InjectRepository(FavoriteEntity)
  private favoriteRepository: Repository<FavoriteEntity>
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>
  @InjectRepository(SongEntity)
  private songRepository: Repository<SongEntity>
  @InjectRepository(HistoryEntity)
  private historyRepository: Repository<HistoryEntity>
  // 检查用户是否存在
  async checkUserExists(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new HttpException(`User ID ${userId} not found`, HttpStatus.NOT_FOUND)
    return user
  }

  // 检查歌曲是否存在
  async checkSongExists(songId: number) {
    const song = await this.songRepository.findOne({ where: { id: songId } })
    if (!song) throw new HttpException(`Song ID ${songId} not found`, HttpStatus.NOT_FOUND)
    return song
  }

  async search(dto: SearchDto) {
    const keyword = `%${dto.keyword}%`

    if (dto.type === SearchType.Artist) {
      const [artists, artistsCount] = await this.artistRepository.findAndCount({
        where: [{ title: ILike(keyword) }]
      })
      return successResponse({
        artists,
        total: artistsCount
      })
    }

    await this.checkUserExists(dto.userId)
    const [songs, songsCount] = await this.songRepository.findAndCount({
      where: [{ title: ILike(keyword) }],
      relations: ['artist']
    })

    //判断是否收藏
    const userFavorites = await this.favoriteRepository.find({
      where: { user: { id: dto.userId } },
      relations: ['song'] // 加载关联的歌曲
    })
    const userFavoriteIds = userFavorites.map((favorite) => favorite.song.id)

    const songList = songs
      .map((song, index) => ({ ...song, index: index + 1 }))
      .map((song) => ({
        ...song,
        artistId: song.artist.id,
        artist: song.artist.title
      }))
      .map((song) => ({
        ...song,
        isFavorite: userFavoriteIds.includes(song.id)
      }))

    return successResponse({
      songs: songList,
      total: songsCount
    })
  }

  async getFavoriteSongs(dto: GetFavoritesDto) {
    await this.checkUserExists(dto.userId)
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: dto.userId } },
      order: { createTime: 'DESC' },
      relations: ['song', 'song.artist'] // 加载关联的歌曲
    })
    const songList = favorites
      .map((favorite) => favorite.song)
      .map((song, index) => ({ ...song, index: index + 1 }))
      .map((song) => ({
        ...song,
        artistId: song.artist.id,
        artist: song.artist.title
      }))

    return successResponse(songList)
  }

  async markAsFavorite(dto: MarkFavoriteDto) {
    const user = await this.checkUserExists(dto.userId)
    const song = await this.checkSongExists(dto.songId)

    // 检查是否已经收藏
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { user: { id: dto.userId }, song: { id: dto.songId } }
    })
    if (existingFavorite) {
      const result = await this.favoriteRepository.remove(existingFavorite)
      return successResponse(result, 'Unfavorited successfully')
    }

    const favorite = this.favoriteRepository.create({ user, song })
    const result = await this.favoriteRepository.save(favorite)
    return successResponse(result, 'Favorited successfully')
  }

  async getArtistInfo(dto: GetArtistInfoDto) {
    const artist = await this.artistRepository.findOne({ where: { id: dto.artistId } })
    if (!artist) {
      throw new HttpException(`Artist with ID ${dto.artistId} not found`, HttpStatus.NOT_FOUND)
    }
    return successResponse(artist)
  }

  async markHistory(dto: MarkHistoryDto) {
    const user = await this.checkUserExists(dto.userId)
    const song = await this.checkSongExists(dto.songId)

    const favorite = this.historyRepository.create({ user, song })

    const result = await this.historyRepository.save(favorite)
    return successResponse(result)
  }

  // recommend - history
  async recommendHistory(dto: RecommendDto) {
    const result = await this.historyRepository.find({
      where: { user: { id: dto.userId } },
      order: { createTime: 'DESC' },
      take: 100,
      relations: ['song', 'song.artist', 'song.genre']
    })

    const favorites = result
      .map((item) => item.song)
      .map((song) => ({
        ...song,
        artistId: song.artist.id,
        artist: song.artist.title
      }))
      .map((song) => ({
        ...song,
        genreId: song.genre.id,
        genre: song.genre.name
      }))

    const genreMap = new Map<number, number>()
    const artistMap = new Map<number, number>()
    for (const song of favorites) {
      const artistId = song.artistId,
        genreId = song.genreId
      if (artistMap.has(artistId)) {
        artistMap.set(artistId, artistMap.get(artistId) + 2)
      } else {
        artistMap.set(artistId, 2)
      }
      if (genreMap.has(genreId)) {
        genreMap.set(genreId, genreMap.get(genreId) + 4)
      } else {
        genreMap.set(genreId, 4)
      }
    }
    return {
      artistMap,
      genreMap
    }
  }

  async recommendFavorite(dto: RecommendDto) {
    const result = await this.favoriteRepository.find({
      where: { user: { id: dto.userId } },
      order: { createTime: 'DESC' },
      take: 100,
      relations: ['song', 'song.artist', 'song.genre']
    })

    const favorites = result
      .map((item) => item.song)
      .map((song) => ({
        ...song,
        artistId: song.artist.id,
        artist: song.artist.title
      }))
      .map((song) => ({
        ...song,
        genreId: song.genre.id,
        genre: song.genre.name
      }))

    const genreMap = new Map<number, number>()
    const artistMap = new Map<number, number>()
    for (const song of favorites) {
      const artistId = song.artistId,
        genreId = song.genreId
      if (artistMap.has(artistId)) {
        artistMap.set(artistId, artistMap.get(artistId) + 1)
      } else {
        artistMap.set(artistId, 1)
      }
      if (genreMap.has(genreId)) {
        genreMap.set(genreId, genreMap.get(genreId) + 2)
      } else {
        genreMap.set(genreId, 2)
      }
    }

    return {
      artistMap,
      genreMap
    }
  }

  countPreferences(artistMap: Map<number, number>, genreMap: Map<number, number>): PreferenceItem[] {
    const artistPreferences: PreferenceItem[] = [],
      genrePreferences = []
    for (const item of artistMap) {
      artistPreferences.push({
        type: 'artist',
        value: item[0],
        score: item[1]
      })
    }

    for (const item of genreMap) {
      genrePreferences.push({
        type: 'genre',
        value: item[0],
        score: item[1]
      })
    }

    return [
      ...artistPreferences.sort((a, b) => b.score - a.score).slice(0, 5),
      ...genrePreferences.sort((a, b) => b.score - a.score).slice(0, 5)
    ]
  }

  async getSongsByPreferences(preferences: PreferenceItem[], dto: RecommendDto) {
    const { userId } = dto
    const userFavorites = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['song'] // 加载关联的歌曲
    })

    const favoriteSongIds = userFavorites.map((favorite) => favorite.song.id)
    console.log(favoriteSongIds)

    const recommendedSongs: SongEntity[] = []

    for (const item of preferences) {
      if (item.type === 'artist') {
        // item.value是歌手id， 查询歌手  的五首歌，要求不是user添加了收藏的
        const songsByArtist = await this.songRepository
          .createQueryBuilder('song')
          .leftJoinAndSelect('song.artist', 'artist')
          .leftJoinAndSelect('song.genre', 'genre')
          .where('song.artist_id = :artistId', { artistId: item.value })
          .andWhere('song.id NOT IN (:...favoriteSongIds)', { favoriteSongIds })
          .orderBy('RAND()')
          .take(5)
          .getMany()
        recommendedSongs.push(...songsByArtist)
      } else if (item.type === 'genre') {
        // item.value是流派id， 查询流派  的五首歌，要求不是user添加了收藏的
        const songsByGenre = await this.songRepository
          .createQueryBuilder('song')
          .leftJoinAndSelect('song.artist', 'artist')
          .leftJoinAndSelect('song.genre', 'genre')
          .where('song.genre_id = :genreId', { genreId: item.value })
          .andWhere('song.id NOT IN (:...favoriteSongIds)', { favoriteSongIds })
          .orderBy('RAND()')
          .take(5)
          .getMany()
        recommendedSongs.push(...songsByGenre)
      }
    }

    return recommendedSongs
  }

  /**
   * 计算推荐歌曲的得分
   *
   * 此函数根据用户的偏好对推荐的歌曲进行评分旨在为用户推荐他们可能喜欢的歌曲
   * 它通过比较歌曲的艺术家和类型是否符合用户的偏好来计算得分，并返回 top 10 得分最高的歌曲
   *
   * @param recommendedSongs 推荐的歌曲列表这些是根据某种推荐算法选出的歌曲
   * @param preferences 用户的偏好项目列表这些偏好项反映了用户对不同艺术家和类型的喜好程度
   * @returns SongEntity[] 推荐歌曲的列表，按用户偏好得分排序并限制为 top 10
   */
  countScore(recommendedSongs: SongEntity[], preferences: PreferenceItem[]) {
    const scoresMap = new Map<number, number>()
    for (const song of recommendedSongs) {
      if (scoresMap.has(song.id)) break
      const artistScore =
        preferences.filter((item) => item.type === 'artist').find((item) => item.value === song.artist.id)?.score ?? 0
      const genreScore =
        preferences.filter((item) => item.type === 'genre').find((item) => item.value === song.genre.id)?.score ?? 0
      scoresMap.set(song.id, artistScore + genreScore)
    }

    let scores: Score[] = []
    for (const song of scoresMap) {
      scores.push({ id: song[0], score: song[1] })
    }
    scores = scores.sort((a, b) => b.score - a.score).slice(0, 10)

    return scores
      .map((item) => recommendedSongs.find((song) => song.id === item.id))
      .map((song) => ({
        ...song,
        artistId: song.artist.id,
        artist: song.artist.title
      }))
      .map((song, index) => ({ ...song, index: index + 1 }))
      .map((song) => ({
        ...song,
        isFavorite: false
      }))
  }

  async recommend(dto: RecommendDto) {
    await this.checkUserExists(dto.userId)
    //step1 查询该用户的最近100条听歌记录, 统计出现的歌手次数和音乐流派，其中歌手权重分2分，流派权重分为4分
    const { artistMap: historyArtistMap, genreMap: historyGreneMap } = await this.recommendHistory(dto)

    //step2 查询该用户的最近收藏100条歌曲, 统计出现的歌手次数和音乐流派，其中歌手权重分1分，流派权重分为2分
    const { artistMap: favoriteArtistMap, genreMap: favoriteGreneMap } = await this.recommendFavorite(dto)

    //step3 合并分数并统计得分列表。
    const artistMap = mergeMaps(historyArtistMap, favoriteArtistMap)
    const genreMap = mergeMaps(historyGreneMap, favoriteGreneMap)
    const preferences = this.countPreferences(artistMap, genreMap)

    //step4 根据 preference 列表，查询音乐，返回歌曲列表
    const recommendedSongs = await this.getSongsByPreferences(preferences, dto)

    //step5 计算歌曲列表各曲得分取前十
    const songs = this.countScore(recommendedSongs, preferences)
    return successResponse(songs)
  }
}
