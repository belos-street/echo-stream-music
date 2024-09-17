import { HttpException, HttpStatus } from '@nestjs/common'
import * as Minio from 'minio'

export class BucketService {
  private client: Minio.Client
  static bucketName: string = 'echo-stream'

  constructor() {
    this.client = new Minio.Client({
      endPoint: process.env.MY_SERVER_IP || 'localhost', //读环境变量
      port: 9000,
      useSSL: false,
      accessKey: 'root',
      secretKey: process.env.MYSQL_PASSWORD as string //这里把秘钥设置成了mysql的密码
    })
  }

  getClient() {
    return this.client
  }

  async getFileUrl(fileName: string, timeout: number = 3600) {
    await this.isFileExist(fileName)
    return await this.client.presignedGetObject(BucketService.bucketName, fileName, timeout)
  }

  async isFileExist(fileName: string) {
    try {
      await this.client.statObject(BucketService.bucketName, fileName)
      return true
    } catch (e) {
      throw new HttpException(`The file ${fileName} is not exist`, HttpStatus.NOT_FOUND)
    }
  }
}
