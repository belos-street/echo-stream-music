import { createWriteStream, constants, writeFile } from 'fs'

import { join } from 'path'
import { SongInfo } from '..'
import { access, mkdir } from 'fs/promises'
import { getUrlProtocol } from '../utils'

export async function requestDownload(song: SongInfo) {
  const assetsPath = join(process.cwd(), 'assets')
  await accessAssetsFiles(assetsPath)

  const albumName = song.id + '.' + song.coverUrl.split('.').pop()!
  const ablumPath = join(assetsPath, 'album', albumName)
  const isRepeatAblum = await checkRepeatFile(ablumPath)
  if (!isRepeatAblum) {
    await handleDownloadFile(song.coverUrl, ablumPath)
  } else {
    console.log(song.title, ' 重复封面文件跳过下载')
  }

  const songName = song.id + '.mp3'
  const songPath = join(assetsPath, 'song', songName)
  const isRepeatSong = await checkRepeatFile(songPath)
  if (!isRepeatSong) {
    await handleDownloadFile(song.songUrl, songPath)
  } else {
    console.log(song.title, ' 重复歌曲文件跳过下载')
  }

  const lyricName = song.id + '.lrc'
  const lyricPath = join(assetsPath, 'lyric', lyricName)
  const isRepeatLyric = await checkRepeatFile(lyricPath)
  if (!isRepeatLyric) {
    await handleWriteFile(lyricPath, song.lyric)
  } else {
    console.log(song.title, ' 重复歌词文件跳过下载')
  }

  return true
}

//检查资源目录是否存在
async function accessAssetsFiles(dirPath: string) {
  try {
    // 尝试读取目录元数据
    await access(dirPath, constants.F_OK)
  } catch (error) {
    // 如果目录不存在，则尝试创建
    await mkdir(dirPath, { recursive: true })
    await mkdir(join(dirPath, 'song'), { recursive: true })
    await mkdir(join(dirPath, 'lyric'), { recursive: true })
    await mkdir(join(dirPath, 'album'), { recursive: true })
  }
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
