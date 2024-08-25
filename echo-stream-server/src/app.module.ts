import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InitTypeOrmModule } from 'db'
import { UserModule } from './user/user.module'
import { RegisterJwtModule } from './user/src/jwt'
@Module({
  imports: [InitTypeOrmModule, RegisterJwtModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
