import { IsNotEmpty, IsNumber } from 'class-validator'

export class RecommendDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number
}
