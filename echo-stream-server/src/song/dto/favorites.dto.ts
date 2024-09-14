import { IsNotEmpty } from 'class-validator'

export class GetFavoritesDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number
}
