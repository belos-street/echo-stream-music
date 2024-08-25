import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

/** 歌手 */
@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn({ comment: '歌手表主键' })
  id: number

  @Column({ type: 'varchar', length: 30, comment: '歌手名' })
  title: string

  @Column({ name: 'cover_url', nullable: true, comment: '歌手照片' })
  coverUrl: string

  @Column({ type: 'longtext', nullable: true, comment: '歌手简介' })
  biography: string

  @CreateDateColumn({ name: 'create_time', type: 'timestamp', comment: '创建时间' })
  createTime: Date
}
