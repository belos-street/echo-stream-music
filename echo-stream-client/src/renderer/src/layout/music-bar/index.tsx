import { SliderBar } from './progress-bar'
import {
  HeartFilled,
  MutedFilled,
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'

export function MusicBar(): JSX.Element {
  return (
    <footer className="w-screen flex flex-col h-60 bg-neutral-900 relative">
      <SliderBar />
      <div className="p-8 h-full flex justify-between">
        <div className="flex gap-8 items-center flex-1">
          <div className="w-40 h-40 bg-blue rounded-4"></div>
          <div className="flex flex-col">
            <div className="flex text-14 gap-4">
              <div>黑色幽默</div> - <div>Jay</div>
            </div>
            <div className="flex gap-2 text-12 text-neutral-500">
              <div className="w-40 text-center">00:00</div>
              <span>/</span>
              <div className="w-40 text-center">23:00</div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center gap-12">
          <HeartFilled className="cursor-pointer" />
          <StepBackwardOutlined className="text-20 cursor-pointer" />
          <PauseCircleFilled className="text-32 cursor-pointer" />
          <PlayCircleFilled className="text-32 cursor-pointer" />
          <StepForwardOutlined className="text-20 cursor-pointer" />
        </div>
        <div className="flex flex-1 justify-center">
          <MutedFilled />
        </div>
      </div>
    </footer>
  )
}
