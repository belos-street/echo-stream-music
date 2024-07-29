import { Inject, Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { Music } from './entities/music.entity'

@Injectable()
export class MusicService {
  @Inject()
  dbService: DbService

  async likeList() {
    const list: Music[] = await this.dbService.read()
    return list
  }
}
