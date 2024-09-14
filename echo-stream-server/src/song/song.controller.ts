import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { SongService } from './song.service'
import { LoginGuard } from 'src/user/src/login.guard'
import { MarkFavoriteDto } from './dto/mark.dto'
import { GetArtistInfoDto } from './dto/artist.dto'
import { GetFavoritesDto } from './dto/favorites.dto'
import { SearchDto } from './dto/search.dto'

@UseGuards(LoginGuard)
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  //每日推荐 长时间任务 挂在后台 返回歌曲列表

  //搜索 歌曲/歌手
  @Post('search')
  async search(@Body() dto: SearchDto) {
    return await this.songService.search(dto)
  }

  //我喜欢的音乐 返回歌曲列表
  @Get('favorites')
  async getFavoriteSongs(@Query() dto: GetFavoritesDto) {
    return await this.songService.getFavoriteSongs(dto)
  }

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
