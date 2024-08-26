import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ArtistEntity } from './artist.entity'

/** 专辑 */
@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn({ comment: '专辑表主键' })
  id: number

  @Column({ type: 'varchar', length: 30, comment: '歌手名' })
  title: string

  @Column({ name: 'cover_url', nullable: true, comment: '专辑图片' })
  coverUrl: string

  @Column({ type: 'longtext', nullable: true, comment: '专辑介绍' })
  description: string

  @Column({ type: 'date', comment: '发行日期' })
  releaseDate: Date

  @CreateDateColumn({ name: 'create_time', type: 'timestamp', comment: '创建时间' })
  createTime: Date

  @ManyToOne(() => ArtistEntity)
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistEntity
}
