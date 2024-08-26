import { UserEntity } from 'src/user/entities/user.entity'
import { ArtistEntity } from 'src/song/entities/artist.entity'
import { SongEntity } from 'src/song/entities/song.entity'
import { AlbumEntity } from 'src/song/entities/album.entity'
import { GenreEntity } from 'src/song/entities/genre.entity'

export const entities = [UserEntity, ArtistEntity, SongEntity, AlbumEntity, GenreEntity] // or '../../src/**/entities/*.entity.ts'