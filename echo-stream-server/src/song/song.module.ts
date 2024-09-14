import { Module } from '@nestjs/common'
import { SongService } from './song.service'
import { SongController } from './song.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SongEntity } from './entities/song.entity'
import { HistoryEntity } from './entities/history.entity'
import { FavoriteEntity } from './entities/favorite.entity'
import { ArtistEntity } from './entities/artist.entity'
import { GenreEntity } from './entities/genre.entity'
import { UserEntity } from 'src/user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, FavoriteEntity, UserEntity, SongEntity])],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
