import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [UsersModule, DbModule, BookModule, MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
