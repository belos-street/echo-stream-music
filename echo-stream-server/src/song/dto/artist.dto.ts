import { IsNotEmpty } from 'class-validator'

export class GetArtistInfoDto {
  @IsNotEmpty({ message: '歌手ID不能为空' })
  artistId: number
}
