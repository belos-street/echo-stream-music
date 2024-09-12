import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MarkFavoriteDto } from './dto/mark.dto'
import { GetArtistInfoDto } from './dto/artist.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArtistEntity } from './entities/artist.entity'
import { FavoriteEntity } from './entities/favorite.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { SongEntity } from './entities/song.entity'
import { successResponse } from 'util/apiResponse'

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

  async markAsFavorite(dto: MarkFavoriteDto) {
    // 检查用户是否存在
    const user = await this.userRepository.findOne({ where: { id: dto.userId } })
    if (!user) {
      throw new HttpException(`User ID ${dto.userId} not found`, HttpStatus.NOT_FOUND)
    }

    // 检查歌曲是否存在
    const song = await this.songRepository.findOne({ where: { id: dto.songId } })
    if (!song) {
      throw new HttpException(`Song ID ${dto.songId} not found`, HttpStatus.NOT_FOUND)
    }

    // 检查是否已经收藏
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { user: { id: dto.userId }, song: { id: dto.songId } }
    })
    if (existingFavorite) {
      const result = await this.favoriteRepository.remove(existingFavorite)
      return successResponse(result, '取消收藏成功')
    } else {
      const favorite = this.favoriteRepository.create({ user, song })
      const result = await this.favoriteRepository.save(favorite)
      return successResponse(result)
    }
  }

  async getArtistInfo(dto: GetArtistInfoDto) {
    const artist = await this.artistRepository.findOne({ where: { id: dto.artistId } })
    if (!artist) {
      throw new HttpException(`Artist with ID ${dto.artistId} not found`, HttpStatus.NOT_FOUND)
    }
    return successResponse(artist)
  }
}
