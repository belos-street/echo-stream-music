import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { SongService } from './song.service'
import { LoginGuard } from 'src/user/src/login.guard'
import { MarkFavoriteDto } from './dto/mark-favorite.dto'

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  //搜索歌曲 返回歌曲列表 {单曲 歌手 专辑}

  //每日推荐 长时间任务 挂在后台 返回歌曲列表

  //我喜欢的音乐 返回歌曲列表

  //标记音乐为 我喜欢
  @Post('markAsFavorite')
  @UseGuards(LoginGuard)
  async markAsFavorite(@Body() markFavoriteDto: MarkFavoriteDto) {
    return this.songService.markAsFavorite(markFavoriteDto)
  }

  //查看歌曲的专辑

  //查看歌手的信息
}
