import { writeFile } from 'fs/promises'
import { join } from 'path'
import { SongInfo } from '..'

export async function generateResult(musicInfoList: SongInfo[]) {
  const json = JSON.stringify(musicInfoList)
  await writeFile(join(process.cwd(), 'result.json'), json)
}
