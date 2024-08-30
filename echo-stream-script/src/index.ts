import { requestDownload } from './download'
import { readFileSync } from 'fs'
import { join } from 'path'
import { launch } from 'puppeteer'
import { analyzeWebsite } from './analyze'
import { UploadBase } from './upload'

export type SongInfo = {
  coverUrl: string
  songUrl: string
  lyric: string
  id: string
  artist: string
  title: string
}

async function exec() {
  console.log('--- exec beginning ---')
  //1. 读取需要爬虫的歌曲信息
  const musicJSONList = readDataJSON() as string[]
  const musicInfoList: SongInfo[] = []
  //2. 创建浏览器环境
  const browser = await launch({ headless: false })
  const page = await browser.newPage()
  //3. 调度 线性下载歌曲信息，不设置并发下载 以免被反爬
  for (const music of musicJSONList) {
    console.log('download :', music)
    //3.1 获取web页面的下载信息
    const musicInfo = await analyzeWebsite(page, music)
    if (!musicInfo) {
      console.log(`analyze failed :${music}`)
      continue
    }
    //3.2 下载文件到本地
    const downloadCallback = await requestDownload(musicInfo)
    downloadCallback && console.log(`succeed :${music}`)
    musicInfoList.push(musicInfo)
    console.log('--- ---')
  }
  //4.关闭浏览器环境
  await browser.close()
  console.log('--- download completed ---')

  //5. 上传到文件服务器
  const upload = new UploadBase()
  const bucket = await upload.listObjects()
  for (const musicInfo of musicInfoList) {
  }
  console.log(bucket)

  //6.生成sql数据
  console.log('--- exec completed ---')
}

function readDataJSON() {
  const assetsPath = join(process.cwd(), 'data.json')
  try {
    const dataJSON = readFileSync(assetsPath, 'utf-8')
    return JSON.parse(dataJSON)
  } catch (error) {
    console.error(error)
  }
}

exec()
