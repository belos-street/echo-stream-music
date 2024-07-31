import { Inject, Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { Music } from './entities/music.entity'
import { successResponse } from 'util/apiResponse'

@Injectable()
export class MusicService {
  @Inject()
  dbService: DbService

  async likeList() {
    const list: Music[] = await this.dbService.read()
    return successResponse(list)
  }
}
