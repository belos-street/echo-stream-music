import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator'

export enum SearchType {
  Song = 0,
  Artist
}

export class SearchDto {
  @IsString()
  @Length(1, 50)
  keyword: string

  @IsEnum(SearchType)
  type: SearchType

  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number
}
