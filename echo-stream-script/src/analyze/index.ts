import type { Page } from 'puppeteer'
import { getFinalUrl, minutesToSeconds } from '../utils'
import { SongInfo } from '..'

export async function analyzeWebsite(page: Page, title: string): Promise<SongInfo | false> {
  try {
    const musicUrl = `https://suntl.com/other/musicss/?name=${encodeURIComponent(title)}&type=netease`
    await page.goto(musicUrl, { waitUntil: 'networkidle2' })

    //1. 获取歌曲封面链接
    const coverSelector = '.aplayer-pic'
    await page.waitForSelector(coverSelector)
    const coverUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) {
        return element.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, '$1').split('?')[0]
      }
      return null
    }, coverSelector)
    if (!coverUrl) return false

    //2. 获取歌曲资源链接
    const songSelector = '#j-src-btn'
    await page.waitForSelector(songSelector)
    const songInitUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) return element.getAttribute('href')
      return null
    }, songSelector)
    const songUrl = await getFinalUrl(songInitUrl) //163资源需要重定向才能拿到最终地址
    if (songUrl.endsWith('404')) {
      //资源过期了
      console.log(title, '- 歌曲资源不存在')
      return false
    }

    //3. 获取歌词
    const lrcSelector = '#j-lrc'
    await page.waitForSelector(lrcSelector)
    const lyricText = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLInputElement
      if (element) return element.value
      return null
    }, lrcSelector)
    if (!lyricText) return false

    //4. 获取歌词id
    const idSelector = '#j-songid'
    await page.waitForSelector(idSelector)
    const songId = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLInputElement
      if (element) return element.value
      return null
    }, idSelector)
    if (!songId) return false

    //5. 获取歌手名字
    const artistSelector = '#j-author'
    await page.waitForSelector(artistSelector)
    const artist = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLInputElement
      if (element) return element.value
      return null
    }, artistSelector)
    if (!artist) return false

    //6. 获取歌曲时长
    const durationSelector = '.aplayer-dtime'
    await page.waitForSelector(durationSelector)
    let durationText: string | null = null
    //歌曲资源加载后拿到的元素的时长 才是正确的
    while (!durationText || durationText === '00:00') {
      await new Promise((resolve) => setTimeout(resolve, 500))
      durationText = await getDurationText(page, durationSelector)
    }

    if (!durationText) return false
    const duration = minutesToSeconds(durationText)

    return {
      coverUrl,
      songUrl,
      lyric: lyricText,
      id: songId,
      artist,
      title,
      duration
    }
  } catch (error) {
    console.error('analyzeWebsite:', error)
    return false
  }
}

async function getDurationText(page: Page, durationSelector: string) {
  let text: string | null = await page.evaluate((selector) => {
    const element = document.querySelector(selector) as HTMLSpanElement
    if (element) return element.innerText
    return null
  }, durationSelector)
  return text
}
