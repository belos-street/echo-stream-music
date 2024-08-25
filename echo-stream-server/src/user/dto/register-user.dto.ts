import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'

export class RegisterUserDto {
  @Length(6, 20)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, { message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @Length(1, 8)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, { message: '昵称只能是字母、数字或者 #、$、%、_、- 这些字符' })
  @IsNotEmpty({ message: '昵称不能为空' })
  nickName: string

  @Matches(/^[a-zA-Z0-9#$%_-]+$/, { message: '密码只能是字母、数字或者 #、$、%、_、- 这些字符' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 20, { message: '密码长度在8~20位' })
  password: string

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '不是合法的邮箱格式' })
  email: string
}
