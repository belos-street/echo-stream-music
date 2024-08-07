import {
  HeartFilled,
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'
import { PlayStaus, usePlayStore } from '@renderer/store/usePlayStore'

export function PlayPanel(): JSX.Element {
  const { status, setStatus } = usePlayStore()

  const handleStatusClick = () => {
    if (status === PlayStaus.Paused) {
      setStatus(PlayStaus.Playing)
    } else if (status === PlayStaus.Playing) {
      setStatus(PlayStaus.Paused)
    }
  }

  return (
    <div className="flex w-1/3 justify-center gap-16">
      <HeartFilled className="cursor-pointer mr-16 c-red" />
      <StepBackwardOutlined className="text-20 cursor-pointer c-primary" />
      {status === PlayStaus.Playing && (
        <PauseCircleFilled
          className="text-32 cursor-pointer c-primary"
          onClick={() => handleStatusClick()}
        />
      )}
      {status === PlayStaus.Paused && (
        <PlayCircleFilled
          className="text-32 cursor-pointer c-primary"
          onClick={() => handleStatusClick()}
        />
      )}
      <StepForwardOutlined className="text-20 cursor-pointer c-primary" />
    </div>
  )
}
