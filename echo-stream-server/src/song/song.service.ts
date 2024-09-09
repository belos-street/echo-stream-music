import { Injectable } from '@nestjs/common'
import { MarkFavoriteDto } from './dto/mark-favorite.dto'

@Injectable()
export class SongService {
  async markAsFavorite(markFavoriteDto: MarkFavoriteDto) {}
}
