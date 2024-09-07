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

  async splitArtist() {
    this.musicInfoList.map((item) => this.artistSet.add(item.artist))

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
}

async function bootStrap() {
  const generate = new Generate()
  await generate.readResult()
  await generate.initBrowser()
  generate.splitArtist()
}

bootStrap()

// INSERT INTO artists (id, title) VALUES
//  (1, '陈奕迅'),
//  (2, 'Carpenters'),
//  (3, '阿兰'),
//  (4, 'Laura Shigihara'),
//  (5, 'DJ Okawari'),
//  (6, 'EGOIST'),
//  (7, 'Eminem'),
//  (8, '陈粒'),
//  (9, '高橋李依'),
//  (10, 'GRe4N BOYZ'),
//  (11, 'ハンバート ハンバート'),
//  (12, 'ESti'),
//  (13, 'iris'),
//  (14, 'Nik Ammar'),
//  (15, 'Syd Matters'),
//  (16, 'José González'),
//  (17, 'Angus & Julia Stone'),
//  (18, 'Bright Eyes'),
//  (19, 'Jonathan Morali'),
//  (20, '野水伊織'),
//  (21, '涼海ネモ'),
//  (22, '阿澄佳奈'),
//  (23, '海援队'),
//  (24, 'お月さま交響曲'),
//  (25, '羽毛田丈史'),
//  (26, 'Mirolke'),
//  (27, '若草恵'),
//  (28, 'Aftergrow'),
//  (29, '春野杉卉'),
//  (30, '初音ミク'),
//  (31, '西木康智'),
//  (32, 'MANYO'),
//  (33, 'Dios'),
//  (34, 'AWOLNATION'),
//  (35, 'XXXTENTACION'),
//  (36, '陈光荣'),
//  (37, '崔健'),
//  (38, 'Queen'),
//  (39, 'Michael Kaneko'),
//  (40, '関口シンゴ'),
//  (41, 'Mabanua'),
//  (42, 'w8'),
//  (43, '周深'),
//  (44, 'Rosa Walton'),
//  (45, '赵雷'),
//  (46, '重音テトSV'),
//  (47, 'HOYO-MiX'),
//  (48, '陈致逸'),
//  (49, 'Joshua Radin'),
//  (50, '王菲'),
//  (51, '洛天依Official'),
//  (52, 'Hanser'),
//  (53, '茶理理'),
//  (54, '手嶌葵'),
//  (55, 'Doris Day'),
//  (56, '小林未郁'),
//  (57, '橋本潮'),
//  (58, 'BLU-SWING'),
//  (59, 'San Holo'),
//  (60, 'Christina Grimmie'),
//  (61, 'Nelly'),
//  (62, 'Fine乐团'),
//  (63, '南壽あさ子'),
//  (64, 'Nirvana'),
//  (65, 'Radiohead'),
//  (66, '竹内まりや'),
//  (67, 'Agnes Obel'),
//  (68, 'Sarah Brightman'),
//  (69, '蛙池'),
//  (70, '久石譲'),
//  (71, 'Pixies'),
//  (72, 'ヘクとパスカル'),
//  (73, '大橋トリオ'),
//  (74, '卡奇社'),
//  (75, 'アナログフィッシュ'),
//  (76, 'きのこ帝国'),
//  (77, 'H△G'),
//  (78, '樹莓蛋奶酥'),
//  (79, 'めありー'),
//  (80, '鹿乃'),
//  (81, '岩田恭明'),
//  (82, '有里知花')
