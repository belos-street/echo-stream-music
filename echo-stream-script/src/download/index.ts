import { createWriteStream, constants, writeFile } from 'fs'
import https from 'https'
import http from 'http'
import { join } from 'path'
import { MusicJSON } from '..'
import { access } from 'fs/promises'

type MusicUrl = {
  song: string
  lyric: string
  album: string
}

export async function requestDownload(music: MusicJSON, url: MusicUrl) {
  const assetsPath = join(process.cwd(), 'assets')

  const albumName = music.id + '.' + url.album.split('.').pop()!
  const ablumPath = join(assetsPath, 'album', albumName)
  const isRepeatAblum = await checkRepeatFile(ablumPath)
  if (!isRepeatAblum) {
    await handleDownloadFile(url.album, ablumPath)
  } else {
    console.log(music.name, ' 重复封面文件跳过下载')
  }

  const songName = music.id + '.mp3'
  const songPath = join(assetsPath, 'song', songName)
  const isRepeatSong = await checkRepeatFile(songPath)
  if (!isRepeatSong) {
    await handleDownloadFile(url.song, songPath)
  } else {
    console.log(music.name, ' 重复歌曲文件跳过下载')
  }

  const lyricName = music.id + '.lrc'
  const lyricPath = join(assetsPath, 'lyric', lyricName)
  const isRepeatLyric = await checkRepeatFile(lyricPath)
  if (!isRepeatLyric) {
    await handleWriteFile(lyricPath, url.lyric)
  } else {
    console.log(music.name, ' 重复歌词文件跳过下载')
  }

  return true
}

function handleDownloadFile(url: string, filePath: string) {
  return new Promise((resolve, reject) => {
    const protocol = getUrlProtocol(url)
    protocol
      .get(url, (response) => {
        const file = createWriteStream(filePath)
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(true)
        })
      })
      .on('error', (err) => {
        reject(err)
        console.error(`handleSong error: ${err.message}`)
      })
  })
}

function handleWriteFile(filename: string, content: string) {
  return new Promise((resolve, reject) => {
    writeFile(filename, content, { encoding: 'utf8' }, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve(true)
    })
  })
}

//重复文件检测
async function checkRepeatFile(filePath: string) {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

//生成下载报告结果

//判断下载
function getUrlProtocol(url: string) {
  return url.startsWith('https') ? https : http
}
