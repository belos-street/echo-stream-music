import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

/** 音乐流派 */
@Entity('genres')
export class GenreEntity {
  @PrimaryGeneratedColumn({ comment: '音乐流派表主键' })
  id: number

  @Column({ type: 'varchar', length: 30, comment: '流派名称' })
  name: string

  @Column({ type: 'longtext', nullable: true, comment: '流派描述' })
  description: string

  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: Date
}
