import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { InfoUserDto } from './dto/info-user.dto'

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>

  /**
   * 查询 用户名是否被注册过了
   * @param username
   */
  async findUserByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } })
  }

  /**
   * 查询 昵称是否被注册过了
   * @param username
   */
  async findUserByNickName(nickName: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { nickName } })
  }

  /**
   * 注册用户
   * @param registerUserDto
   */
  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existingUsername = await this.findUserByUsername(registerUserDto.username)
    if (existingUsername) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST)
    }

    const existingNickName = await this.findUserByNickName(registerUserDto.nickName)
    if (existingNickName) {
      throw new HttpException('Nickname already exists', HttpStatus.BAD_REQUEST)
    }

    const newUser = this.userRepository.create(registerUserDto)
    return this.userRepository.save(newUser)
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({ where: { username: loginUserDto.username } })

    if (!user) {
      throw new HttpException('The user does not exist or the password is incorrect', HttpStatus.BAD_REQUEST)
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('The user does not exist or the password is incorrect', HttpStatus.BAD_REQUEST)
    }

    return user
  }

  async getUserInfo(infoUserDto: InfoUserDto) {
    console.log(infoUserDto, '---')
    const user = await this.userRepository.findOne({
      where: { id: infoUserDto.id },
      select: ['id', 'username', 'nickName', 'email', 'headPic']
    })
    console.log(user, '---')
    if (!user) {
      throw new HttpException('The user does not exist', HttpStatus.BAD_REQUEST)
    }

    return user
  }
}
