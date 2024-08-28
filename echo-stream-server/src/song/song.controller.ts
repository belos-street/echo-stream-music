import { Controller } from '@nestjs/common'
import { SongService } from './song.service'

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  //搜索歌曲 返回歌曲列表 {单曲 歌手 专辑}

  //每日推荐 长时间任务 挂在后台 返回歌曲列表

  //我喜欢的音乐 返回歌曲列表

  //标记音乐为 我喜欢

  //查看歌曲的专辑

  //查看歌手的信息
}
