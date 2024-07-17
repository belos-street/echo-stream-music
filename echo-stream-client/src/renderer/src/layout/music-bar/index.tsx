import { SliderBar } from './progress-bar'
import {
  HeartFilled,
  MutedFilled,
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'
import { SingleLoopIcon, PlayLoopIcon, RandomPlayIcon } from '@renderer/assets/icons'
import { usePlayStore, PlayStaus } from '@renderer/store/usePlayStore'

export function MusicBar(): JSX.Element {
  const { status, setStatus } = usePlayStore()
  return (
    <footer className="w-screen flex flex-col h-60 bg-neutral-900 relative">
      <SliderBar />
      <div className="p-8 h-full flex justify-between">
        <div className="flex gap-8 items-center w-1/3">
          <div className="w-40 h-40 bg-blue rounded-4"></div>
          <div className="flex flex-col">
            <div className="flex text-14 gap-4">
              <div>黑色幽默</div>
              <span className="text-12 text-neutral-500">-</span>
              <div className="text-12 text-neutral-500">Jay Chou</div>
            </div>
            <div className="flex gap-2 text-12 text-neutral-500">
              <div className="w-40 text-center">00:00</div>
              <span>/</span>
              <div className="w-40 text-center">23:00</div>
            </div>
          </div>
        </div>
        <div className="flex w-1/3 justify-center gap-16">
          <HeartFilled className="cursor-pointer mr-16" />
          <StepBackwardOutlined className="text-20 cursor-pointer c-primary" />
          {status === PlayStaus.Paused && (
            <PauseCircleFilled className="text-32 cursor-pointer c-primary" />
          )}
          {status === PlayStaus.Playing && (
            <PlayCircleFilled className="text-32 cursor-pointer c-primary" />
          )}
          <StepForwardOutlined className="text-20 cursor-pointer c-primary" />
        </div>
        <div className="flex w-1/3 pr-16 justify-end gap-16">
          <SingleLoopIcon className="text-16 cursor-pointer" />
          <PlayLoopIcon className="text-16 cursor-pointer" />
          <RandomPlayIcon className="text-16 cursor-pointer" />
          <MutedFilled />
        </div>
      </div>
    </footer>
  )
}
