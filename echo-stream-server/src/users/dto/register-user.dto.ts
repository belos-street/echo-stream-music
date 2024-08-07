import { IsNotEmpty, Length } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 20, { message: '密码长度在8~20位' })
  password: string
}
