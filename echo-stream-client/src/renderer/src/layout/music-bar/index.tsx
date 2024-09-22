import { SliderBar } from './progress-bar'
import { PlayPanel } from './play-panel'
import { ControlPanel } from './control-panel'
import { useSongStore } from '@renderer/store/useMusicStore'
import { secondsToMinutes } from '@renderer/utils'
import { MinioUrl } from '@renderer/config'

export function MusicBar(): JSX.Element {
  const { song } = useSongStore()
  return (
    <footer className="w-screen flex flex-col h-60 bg-neutral-900 relative">
      <SliderBar />
      <div className="p-8 h-full flex justify-between">
        <div className="flex gap-8 items-center w-1/3">
          <div className="w-40 h-40 ">
            {song.coverUrl && (
              <img src={MinioUrl + song.coverUrl} alt="" className="w-full h-full rounded-4" />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex text-14 gap-4">
              <div>{song.title}</div>
              <span className="text-12 text-neutral-500">-</span>
              <div className="text-12 text-neutral-500">{song.artist}</div>
            </div>
            <div className="flex gap-2 text-12 text-neutral-500">
              <div className="w-40 text-center">00:00</div>
              <span>/</span>
              <div className="w-40 text-center">{secondsToMinutes(song.duration)}</div>
            </div>
          </div>
        </div>
        <PlayPanel />
        <ControlPanel />
      </div>
    </footer>
  )
}
