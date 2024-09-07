import { TypeOrmModule } from '@nestjs/typeorm'
import { entities } from './entities'

//初始化 ORM映射
export const InitTypeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.MY_SERVER_IP,
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD, //请配置环境变量MYSQL_PASSWORD 数据库密码
  database: 'echo_stream',
  synchronize: true, //TypeORM 会在启动时同步实体模型到数据库表结构
  logging: true,
  entities: [...entities],
  poolSize: 10, //数据库连接池大小
  connectorPackage: 'mysql2', // 指定 MySQL 连接器包
  extra: { authPlugin: 'sha256_password' }
})
