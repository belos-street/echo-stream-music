import { requestDownload } from './download'
import { readFileSync } from 'fs'
import { join } from 'path'
import { launch } from 'puppeteer'
import { analyzeWebsite } from './analyze'

export type MusicJSON = {
  url: string
  id: string
  name: string
}

async function exec() {
  console.log('--- exec beginning ---')
  //1. 读取需要爬虫的歌曲信息
  const musicList = readDataJSON() as MusicJSON[]

  //2. 创建浏览器环境
  const browser = await launch({ headless: false })
  const page = await browser.newPage()

  //3. 调度 线性下载歌曲信息，不设置并发下载以免被反爬
  for (const music of musicList) {
    console.log('download :', music.name)

    //3.1 获取web页面的下载信息
    const musicUrl = await analyzeWebsite(page, music)
    if (!musicUrl) {
      console.log(`analyze failed :${music.name}`)
      continue
    }

    //3.2 下载文件到本地
    const downloadCallback = await requestDownload(music, musicUrl!)
    downloadCallback && console.log(`succeed :${music.name}`)

    console.log('--- ---')
  }

  //关闭浏览器环境
  await browser.close()
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
