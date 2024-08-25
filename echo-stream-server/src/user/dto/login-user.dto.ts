import { IsString, Length } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @Length(1, 50)
  username: string

  @IsString()
  @Length(8, 20)
  password: string
}
