import { Body, Controller, Get, Inject, Post, Query, Res, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from './dto/login-user.dto'
import type { Response } from 'express'
import { successResponse } from 'util/apiResponse'
import { InfoUserDto } from './dto/info-user.dto'
import { LoginGuard } from './src/login.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const foundUser = await this.userService.login(dto)

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: { id: foundUser.id, username: foundUser.username }
      })
      res.setHeader('token', token)
      return successResponse(token)
    } else {
      return 'login fail'
    }
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.registerUser(registerUserDto)
  }

  @Get('info')
  @UseGuards(LoginGuard)
  async info(@Query() infoUserDto: InfoUserDto) {
    console.log(infoUserDto)
    return await this.userService.getUserInfo(infoUserDto)
  }
}
