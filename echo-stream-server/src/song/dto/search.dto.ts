import { IsNumber, IsString, Length } from 'class-validator'
import { ArtistEntity } from '../entities/artist.entity'
import { SongEntity } from '../entities/song.entity'

export class SearchDto {
  @IsString()
  @Length(1, 50)
  keyword: string

  @IsString()
  type: 'song' | 'artist'

  @IsNumber()
  page: number
}
