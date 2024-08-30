import type { Page } from 'puppeteer'
import { getFinalUrl } from '../utils'
import { SongInfo } from '..'

export async function analyzeWebsite(page: Page, title: string): Promise<SongInfo | false> {
  try {
    const musicUrl = `https://suntl.com/other/musicss/?name=${encodeURIComponent(title)}&type=netease`
    await page.goto(musicUrl, { waitUntil: 'networkidle2' })

    const coverSelector = '.aplayer-pic'
    await page.waitForSelector(coverSelector)
    const coverUrl = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLDivElement
      if (element) {
        return element.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, '$1').split('?')[0]
      }
      return null
    }, coverSelector)

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

    const idSelector = '#j-songid'
    await page.waitForSelector(idSelector)
    const songId = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLInputElement
      if (element) return element.value
      return null
    }, idSelector)

    const artistSelector = '#j-author'
    await page.waitForSelector(artistSelector)
    const artist = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLInputElement
      if (element) return element.value
      return null
    }, artistSelector)

    if (!coverUrl || !songUrl || !lyricText || !songId || !artist) return false

    return {
      coverUrl,
      songUrl,
      lyric: lyricText,
      id: songId,
      artist,
      title
    }
  } catch (error) {
    console.error('analyzeWebsite:', error)
    return false
  }
}
