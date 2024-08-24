import { IsString, Length } from 'class-validator'

export class LoginDto {
  @IsString()
  @Length(1, 50)
  username: string

  @IsString()
  @Length(8, 20)
  password: string
}
