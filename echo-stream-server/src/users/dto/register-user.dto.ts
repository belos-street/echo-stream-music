import { IsNotEmpty, Length } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 20, { message: '密码最少 8 位' })
  password: string
}
