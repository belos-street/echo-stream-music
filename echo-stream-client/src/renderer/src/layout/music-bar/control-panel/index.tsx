import { MutedFilled } from '@ant-design/icons'
import { SingleLoopIcon, PlayLoopIcon, RandomPlayIcon } from '@icons/'
import { PlayMode, usePlayStore } from '@renderer/store/usePlayStore'
import { Tooltip } from 'antd'

export function ControlPanel(): JSX.Element {
  const { mode, setMode, volume, setVolume } = usePlayStore()

  const handleModeClick = () => {
    if (mode === PlayMode.Single) {
      setMode(PlayMode.Random)
    } else if (mode === PlayMode.Loop) {
      setMode(PlayMode.Single)
    } else if (mode === PlayMode.Random) {
      setMode(PlayMode.Loop)
    }
  }

  const handleVolumeClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickX = event.clientX
    const { clientWidth, offsetLeft } = event.currentTarget
    const volume = Number((((clickX - offsetLeft) / clientWidth) * 100).toFixed(1))
    setVolume(volume)
  }

  return (
    <div className="flex w-1/3 pr-16 justify-end items-center gap-16">
      <div onClick={() => handleModeClick()}>
        <Tooltip placement="top" title={<span className="text-12">{mode}</span>}>
          {mode === PlayMode.Single && <SingleLoopIcon className="text-16 cursor-pointer" />}
          {mode === PlayMode.Loop && <PlayLoopIcon className="text-16 cursor-pointer" />}
          {mode === PlayMode.Random && <RandomPlayIcon className="text-16 cursor-pointer" />}
        </Tooltip>
      </div>

      <div className="flex gap-8 items-center">
        <MutedFilled />
        <div
          className="w-100 h-6 bg-neutral-500 cursor-pointer rounded-full relative"
          onClick={handleVolumeClick}
        >
          <div
            className="h-full bg-primary cursor-pointer rounded-full transition-width duration-300 ease-in-out"
            style={{ width: `${volume}%` }}
          />
        </div>
      </div>
    </div>
  )
}
