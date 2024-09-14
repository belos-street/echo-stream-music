import { IsEnum, IsString, Length } from 'class-validator'

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
}
