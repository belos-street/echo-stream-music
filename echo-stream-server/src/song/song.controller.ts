import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { SongService } from './song.service'
import { LoginGuard } from 'src/user/src/login.guard'
import { MarkFavoriteDto } from './dto/mark.dto'
import { GetArtistInfoDto } from './dto/artist.dto'

@UseGuards(LoginGuard)
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  //搜索歌曲 返回歌曲列表 {单曲 歌手 专辑}

  //每日推荐 长时间任务 挂在后台 返回歌曲列表

  //我喜欢的音乐 返回歌曲列表

  //标记音乐为 我喜欢
  @Post('mark')
  async markAsFavorite(@Body() dto: MarkFavoriteDto) {
    return await this.songService.markAsFavorite(dto)
  }

  //查看歌手的信息
  @Get('artist')
  async getArtistInfo(@Query() dto: GetArtistInfoDto) {
    return await this.songService.getArtistInfo(dto)
  }
}
