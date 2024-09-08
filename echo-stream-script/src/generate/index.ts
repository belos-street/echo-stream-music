/**
 *  处理爬虫结果
 *  1. 生成歌手列表的sql
 *  2. 生成歌曲列表的sql
 *    2.1 标注歌手
 *    2.2 标注流派
 */
import { readFile } from 'fs/promises'
import { join } from 'path'
import { SongInfo } from '..'
import { type Browser, launch, type Page } from 'puppeteer'

class Generate {
  public musicInfoList: (SongInfo & { genre: number })[]
  public artistSet: Set<string>
  private browser: Browser | null
  private page: Page | null

  constructor() {
    this.musicInfoList = []
    this.artistSet = new Set()

    this.browser = null
    this.page = null
  }

  async readResult() {
    const result = await readFile(join(process.cwd(), 'result.json'), 'utf-8')
    const data = JSON.parse(result)
    this.musicInfoList = data
  }

  async initBrowser() {
    this.browser = await launch({ headless: false })
    this.page = await this.browser.newPage()
  }

  installArtistSet() {
    this.musicInfoList.map((item) => this.artistSet.add(item.artist))
  }

  async splitArtist() {
    let sql = `INSERT INTO artists (id, title, cover_url, biography) VALUES\n`

    let index = 1
    for (const artist of this.artistSet) {
      const info = await this.getArtistInfo(artist)
      let [coverUrl, biography] = ['', '']
      if (info && info.coverUrl && info.biography) {
        coverUrl = info.coverUrl
        biography = info.biography
      }

      sql += ` (${index}, '${artist}', '${coverUrl}', '${biography}')${index === this.artistSet.size ? '' : ','}\n`
      index++

      console.log(artist, coverUrl, biography)
    }

    await this.browser!.close()

    console.log(sql)
  }

  async getArtistInfo(artist: string) {
    let url = `https://y.qq.com/n/ryqq/search?w=${artist}`
    if (!this.page) return null
    await this.page!.goto(url, { waitUntil: 'domcontentloaded' })

    //1. 进入歌手详情页
    const timeout = 5 * 1000 // 设置超时时间为 5 秒
    const introSelector = '.mod_intro__title a'

    try {
      await this.page.waitForSelector(introSelector, { timeout })
    } catch {
      return null
    }

    await this.page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      element.click()
      return null
    }, introSelector)

    //2. 获取歌手头像
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' }) // 等待页面导航完成
    const coverSelector = '.data__photo'
    await this.page.waitForSelector(coverSelector)
    const coverUrl = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLImageElement
      if (element.src) return element.src
      return null
    }, coverSelector)

    //3. 获取歌手简介
    const biographySelector = '#popup_data_detail .popup_data_detail__cont'
    await this.page.waitForSelector(biographySelector)
    const biography = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      const pList = element.querySelectorAll('P')
      for (const ele of pList) {
        if (ele.textContent?.startsWith('简介：')) return ele.textContent?.replace('简介：', '').replace(/'/g, "''")
      }
      return null
    }, biographySelector)

    return {
      coverUrl,
      biography
    }
  }

  countGenres() {
    const genreMap: { [k in number]: string[] } = {}
    this.musicInfoList.map((item) =>
      genreMap[item.genre] !== undefined ? genreMap[item.genre].push(item.title) : (genreMap[item.genre] = [item.title])
    )
    console.log(genreMap)
  }

  async writeSongs() {
    const artistList = [...this.artistSet]

    let sql = `INSERT INTO songs (title, file_url, lyrics_url, cover_url, duration, artist_id, album_id, genre_id) VALUES\n`
    for (let index = 0; index < this.musicInfoList.length; index++) {
      const song = this.musicInfoList[index]
      sql += ` ('${song.title.replace(/'/g, "''")}', '${song.id}.mp3', '${song.id}.lrc', '${song.id}.jpg', ${
        song.duration
      }, ${findArtistIndex(song.artist)}, ${0}, ${song.genre})${index === this.musicInfoList.length - 1 ? '' : ','}\n`
    }

    function findArtistIndex(name: string) {
      let index = artistList.findIndex((item) => item === name)
      return index === -1 ? 0 : index + 1
    }

    console.log(sql)
  }
}

async function bootStrap() {
  const generate = new Generate()
  await generate.readResult()
  generate.installArtistSet()
  await generate.writeSongs()
  // await generate.initBrowser()
  // await generate.splitArtist()
}

bootStrap()
