import * as Minio from 'minio'

type ElementObj = { name: string; size: number }
export class UploadBase {
  private minioClient: Minio.Client
  private bucketName: string = 'echo-stream'

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MY_SERVER_IP || 'localhost', //读环境变量
      port: 9000,
      useSSL: false,
      accessKey: 'root',
      secretKey: process.env.MYSQL_PASSWORD as string //这里把秘钥设置成了mysql的密码
    })
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
  async listObjects(): Promise<ElementObj[]> {
    return new Promise((resolve, reject) => {
      const stream = this.minioClient.listObjects(this.bucketName, '', true)

      const list: ElementObj[] = []

      stream.on('data', function (obj: ElementObj) {
        list.push(obj)
      })

      stream.on('error', (err) => {
        console.error('Error listing objects:', err)
        reject(err)
      })

      stream.on('end', () => {
        resolve(list)
      })
    })
  }
}
