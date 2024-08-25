import { UserEntity } from 'src/user/entities/user.entity'
import { ArtistEntity } from 'src/song/entities/artist.entity'
import { SongEntity } from 'src/song/entities/song.entity'

export const entities = [UserEntity, ArtistEntity, SongEntity] // or './**/entities/*.entity.ts'
