import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MarkFavoriteDto } from './dto/mark.dto'
import { GetArtistInfoDto } from './dto/artist.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArtistEntity } from './entities/artist.entity'

@Injectable()
export class SongService {
  @InjectRepository(ArtistEntity)
  private artistRepository: Repository<ArtistEntity>

  async markAsFavorite(dto: MarkFavoriteDto) {}

  async getArtistInfo(dto: GetArtistInfoDto) {
    const artist = await this.artistRepository.findOne({ where: { id: dto.artistId } })
    if (!artist) {
      throw new HttpException(`Artist with ID ${dto.artistId} not found`, HttpStatus.BAD_REQUEST)
    }
    return artist
  }
}
