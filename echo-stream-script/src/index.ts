import { load } from 'cheerio'
import { requestHtml } from './request'
import { requestDownload } from './download'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Page } from 'puppeteer'
import puppeteer from 'puppeteer'

export type MusicJSON = {
  url: string
  id: string
  name: string
}

async function exec() {
  //1. 读取需要爬虫的歌曲信息
  const musicList = readDataJSON() as MusicJSON[]

  //2. 调度器下载歌曲信息，禁止一次性下载太多
  const browser = await puppeteer.launch({ headless: false }) //浏览器运行过程
  const page = await browser.newPage()

  for (const music of musicList) {
    console.log('download begin - ', music.name)
    await handleDownloadFile(page, music)
  }

  await browser.close()
}

function readDataJSON() {
  const assetsPath = join(process.cwd(), 'assets', 'data.json')
  try {
    const dataJSON = readFileSync(assetsPath, 'utf-8')
    return JSON.parse(dataJSON)
  } catch (error) {
    console.error(error)
  }
}

// async function handleDownloadFile(music: MusicJSON) {
//   try {
//     const html = await requestHtml(music.url)
//     const $ = load(html)

//     const albumUrl = $('#aplayer img').attr('src')!
//     console.log($('#btn-download-mp3'), 'mp3')
//     const songUrl = $('#btn-download-mp3').attr('href')!

//     if (!albumUrl || !songUrl) throw new Error('albumUrl or songUrl is empty')

//     const downloadCallback = await requestDownload(music, { album: albumUrl, song: songUrl })

//     if (downloadCallback) {
//       console.log(`download succeed :${music.name}`)
//     }
//   } catch (error) {
//     console.error('handleDownloadFileRequest:', error)
//   }
// }

async function handleDownloadFile(page: Page, music: MusicJSON) {
  try {
    await page.goto(music.url, { waitUntil: 'networkidle2' })

    await page.waitForSelector('.aplayer-pic')
    const albumUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) {
        return element.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, '$1')
      }
      return null
    }, '.aplayer-pic')

    await page.waitForSelector('#btn-download-mp3')
    const songUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) return element.getAttribute('href')
      return null
    }, '#btn-download-mp3')

    if (!albumUrl || !songUrl) throw new Error('albumUrl or songUrl is empty')

    const downloadCallback = await requestDownload(music, { album: albumUrl, song: songUrl })

    if (downloadCallback) {
      console.log(`download succeed :${music.name}`)
    }
  } catch (error) {
    console.error('handleDownloadFileRequest:', error)
  }
}

exec()
