import { DynamicModule, Module } from '@nestjs/common'
import { DbService } from './db.service'

export type DbModuleOptions = {
  path: string
}

@Module({})
export class DbModule {
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options
        },
        DbService
      ],
      exports: [DbService]
    }
  }
}
