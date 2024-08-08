import { createWriteStream } from 'fs'
import https from 'https'
import { join } from 'path'
import { MusicJSON } from '..'

type MusicUrl = {
  song: string
  // lyric: string
  album: string
}

export async function requestDownload(music: MusicJSON, url: MusicUrl) {
  const assetsPath = join(process.cwd(), 'assets')
  const albumName = music.id + '.' + url.album.split('.').pop()!
  await handleDownloadFile(url.album, join(assetsPath, 'album', albumName))

  const songName = music.id + '.mp3'
  await handleDownloadFile(url.song, join(assetsPath, 'song', songName))

  return true
  // const songPath = join(assetsPath, 'song', 'song.mp3')
  //await handleSong(url.song, songPath)
}

function handleDownloadFile(url: string, filePath: string) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const file = createWriteStream(filePath)
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve('ok')
        })
      })
      .on('error', (err) => {
        reject(err)
        console.error(`handleSong error: ${err.message}`)
      })
  })
}
