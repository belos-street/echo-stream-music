import { IsNotEmpty } from 'class-validator'

export class MarkFavoriteDto {
  @IsNotEmpty({ message: '歌曲ID不能为空' })
  songId: number

  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number
}
