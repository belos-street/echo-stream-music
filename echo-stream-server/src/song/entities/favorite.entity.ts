import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { SongEntity } from './song.entity'
import { UserEntity } from 'src/user/entities/user.entity'

/** 用户喜欢音乐表 */
@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn({ comment: '用户喜欢音乐表主键' })
  id: number

  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: Date

  @ManyToOne(() => SongEntity)
  @JoinColumn({ name: 'song_id' })
  song: SongEntity

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
