import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { DbModule } from 'src/db/db.module'

@Module({
  imports: [
    DbModule.register({
      path: 'users.json'
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
