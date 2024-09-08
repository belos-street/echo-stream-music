import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm'
import { ArtistEntity } from './artist.entity'
import { AlbumEntity } from './album.entity'
import { GenreEntity } from './genre.entity'
// import { Genre } from './genre.entity'

/** 歌曲表 */
@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100, comment: '歌曲标题' })
  title: string

  @Column({ name: 'file_url', length: 255, comment: '歌曲文件的存储路径' })
  fileUrl: string

  @Column({ name: 'lyrics_url', nullable: true, comment: '歌词文件的存储路径' })
  lyricsUrl: string

  @Column({ name: 'cover_url', nullable: true, comment: '封面文件的存储路径' })
  coverUrl: string

  @Column({ comment: '歌曲时长(秒)' })
  duration: number

  @CreateDateColumn({ name: 'create_time', type: 'timestamp', comment: '创建时间' })
  createTime: Date

  @ManyToOne(() => ArtistEntity)
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistEntity

  @ManyToOne(() => AlbumEntity)
  @JoinColumn({ name: 'album_id' })
  album: AlbumEntity

  @ManyToOne(() => GenreEntity)
  @JoinColumn({ name: 'genre_id' })
  genre: GenreEntity
}
