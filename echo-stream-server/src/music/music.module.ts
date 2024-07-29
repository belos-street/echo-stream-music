import { Module } from '@nestjs/common'
import { MusicService } from './music.service'
import { MusicController } from './music.controller'
import { DbModule } from 'src/db/db.module'

@Module({
  imports: [
    DbModule.register({
      path: 'music.json'
    })
  ],
  controllers: [MusicController],
  providers: [MusicService]
})
export class MusicModule {}
