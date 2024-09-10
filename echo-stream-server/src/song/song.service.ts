import { Injectable } from '@nestjs/common'
import { MarkFavoriteDto } from './dto/mark.dto'
import { GetArtistInfoDto } from './dto/artist.dto'

@Injectable()
export class SongService {
  async markAsFavorite(dto: MarkFavoriteDto) {}

  async getArtistInfo(dto: GetArtistInfoDto) {
    return dto.artistId
  }
}
