import { TypeOrmModule } from '@nestjs/typeorm'
import { entities } from './entities'

//初始化 ORM映射
export const InitTypeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD, //请配置环境变量MYSQL_PASSWORD 数据库密码
  database: 'echo_stream',
  synchronize: true,
  logging: true,
  entities: [...entities],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: { authPlugin: 'sha256_password' }
})
