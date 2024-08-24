import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InitTypeOrmModule } from 'db'
import { UserModule } from './user/user.module'
@Module({
  imports: [InitTypeOrmModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
