import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity({ name: 'users' })
@Unique(['username'])
@Unique(['nickName'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50, comment: '用户名' })
  username: string

  @Column({ type: 'varchar', length: 50, comment: '密码' })
  password: string

  @Column({ name: 'nick_name', type: 'varchar', length: 50, comment: '昵称' })
  nickName: string

  @Column({ type: 'varchar', length: 50, comment: '邮箱' })
  email: string

  @Column({ name: 'head_pic', type: 'varchar', length: 100, comment: '头像', nullable: true })
  headPic: string | null

  @Column({ name: 'phone_number', type: 'varchar', length: 20, comment: '手机号', nullable: true })
  phoneNumber: string | null

  @Column({ name: 'is_frozen', type: 'boolean', comment: '是否冻结', default: false })
  isFrozen: boolean

  @Column({ name: 'is_admin', type: 'boolean', comment: '是否是管理员', default: false })
  isAdmin: boolean

  @CreateDateColumn({ name: 'create_time', type: 'timestamp', comment: '创建时间' })
  createTime: Date
}
