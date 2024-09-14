import { IsNotEmpty, IsNumber } from 'class-validator'

export class MarkFavoriteDto {
  @IsNotEmpty({ message: '歌曲ID不能为空' })
  @IsNumber({}, { message: '歌曲ID必须是数字类型' })
  songId: number

  @IsNotEmpty({ message: '用户ID不能为空' })
  @IsNumber({}, { message: '用户ID必须是数字类型' })
  userId: number
}

//
