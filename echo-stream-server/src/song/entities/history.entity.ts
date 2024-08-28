import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { SongEntity } from './song.entity'
import { UserEntity } from 'src/user/entities/user.entity'

/** 用户播放历史表 */
@Entity('history')
export class HistoryEntity {
  @PrimaryGeneratedColumn({ comment: '用户播放历史表主键' })
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
