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

    const [songs, songsCount] = await this.songRepository.findAndCount({
      where: [{ title: ILike(keyword) }]
    })
    return successResponse({
      songs,
      total: songsCount
    })
  }

  async getFavoriteSongs(dto: GetFavoritesDto) {
    await this.checkUserExists(dto.userId)
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: dto.userId } },
      relations: ['song'] // 加载关联的歌曲
    })
    const songList = favorites.map((favorite) => favorite.song)
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
}
