import { usePlayStore } from '@renderer/store/usePlayStore'
import { SliderBar } from './progress-bar'
import { Button } from 'antd'
import { StepForwardOutlined } from '@ant-design/icons'

export function MusicBar(): JSX.Element {
  const { progress } = usePlayStore()
  return (
    <footer className="w-screen flex flex-col h-60 bg-neutral-900 relative">
      <SliderBar />
      <div>
        {progress} <Button type="primary">Button</Button>
      </div>

      <StepForwardOutlined />
    </footer>
  )
}
