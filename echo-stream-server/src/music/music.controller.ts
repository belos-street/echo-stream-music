import { Controller, Get } from '@nestjs/common'
import { MusicService } from './music.service'

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('likeList')
  async likeList() {
    return this.musicService.likeList()
  }

  // @Get('info')
  // async findById(@Param('id') id: string) {
  //   return this.musicService.findById(+id)
  // }
}
