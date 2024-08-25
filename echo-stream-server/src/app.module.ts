import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InitTypeOrmModule } from 'db'
import { UserModule } from './user/user.module'
import { RegisterJwtModule } from './user/src/jwt'
import { SongModule } from './song/song.module';
@Module({
  imports: [InitTypeOrmModule, RegisterJwtModule, UserModule, SongModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
