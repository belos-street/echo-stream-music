import type { Page } from 'puppeteer'
import { getFinalUrl } from '../utils'
import { SongInfo } from '..'

export async function analyzeWebsite(page: Page, music: string): Promise<SongInfo | false> {
  try {
    const musicUrl = `https://suntl.com/other/musicss/?name=${encodeURIComponent(music)}&type=netease`
    await page.goto(musicUrl, { waitUntil: 'networkidle2' })

    const albumSelector = '.aplayer-pic'
    await page.waitForSelector(albumSelector)
    const albumUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) {
        return element.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, '$1').split('?')[0]
      }
      return null
    }, albumSelector)

    const songSelector = '#j-src-btn'
    await page.waitForSelector(songSelector)
    const songInitUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) return element.getAttribute('href')
      return null
    }, songSelector)
    const songUrl = await getFinalUrl(songInitUrl)

    const lrcSelector = '#j-lrc'
    await page.waitForSelector(lrcSelector)
    const lyricText = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLInputElement
      if (element) return element.value
      return null
    }, lrcSelector)

    if (!albumUrl || !songUrl || !lyricText) return false

    return {
      album: albumUrl,
      song: songUrl,
      lyric: lyricText
    }
  } catch (error) {
    console.error('analyzeWebsite:', error)
  }
}
