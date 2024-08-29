import * as Minio from 'minio'

export class UploadBase {
  private minioClient: Minio.Client
  private bucketName: string = 'echo-stream'

  constructor() {
    console.log(111)
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'echo-stream',
      secretKey: process.env.MYSQL_PASSWORD as string //这里把秘钥设置成了mysql的密码
    })
    console.log(222)
  }

  /**
   * 检查桶是否存在，如果不存在则创建
   */
  private async ensureBucketExists(): Promise<void> {
    const result = await this.minioClient.bucketExists(this.bucketName)

    if (!result) {
      await this.minioClient.makeBucket(this.bucketName)
    }
  }

  /**
   * 上传文件到MinIO
   * @param objectName 文件在MinIO中的对象名称
   * @param filePath 本地文件路径
   */
  async put(objectName: string, filePath: string): Promise<void> {
    try {
      await this.ensureBucketExists()
      return await this.minioClient.fPutObject(this.bucketName, objectName, filePath)
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  /**
   * 删除文件
   * @param objectName 文件在MinIO中的对象名称
   */
  async delete(objectName: string): Promise<void> {
    try {
      await this.ensureBucketExists()
      await this.minioClient.removeObject(this.bucketName, objectName)
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }

  /**
   * 列出桶中的所有文件
   * https://min.io/docs/minio/linux/developers/javascript/API.html#listObjectsV2
   */
  // async listObjects(): Promise<string[]> {
  //   try {
  //     console.log(33)
  //     const objects = this.minioClient.listObjectsV2(this.bucketName, '', true, '')
  //     //console.log(objects.map(obj=> ob))
  //     // return objects.objects.map((obj) => obj.name)
  //     return []
  //   } catch (error) {
  //     console.error('Error listing objects:', error)
  //     throw error
  //   }
  // }
}
