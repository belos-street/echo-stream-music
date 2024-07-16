/**
 *
 * 监听两种鼠标事件
 * 1. 鼠标 直接在 progress 上按下
 * 2. 鼠标 点击 point 拖动
 */

import { usePlayStore } from '@renderer/store/usePlayStore'

export function SliderBar(): JSX.Element {
  const { progress, setProgress } = usePlayStore()

  const handleSliderBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickX = event.clientX
    const sliderWidth = event.currentTarget.clientWidth

    const progressCurrent = Number(((clickX / sliderWidth) * 100).toFixed(1))
    setProgress(progressCurrent)
  }

  return (
    <div
      className="group w-screen h-16 flex flex-items-center flex-justify-center cursor-pointer absolute -top-7"
      onClick={handleSliderBarClick}
    >
      <div id="sliderBar" className="w-screen h-2 bg-transparent">
        <div
          id="progressBar"
          className=" bg-primary h-full rounded-r relative  transition-width duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        >
          <div
            id="point"
            className="bg-primary h-12 w-12 rounded-full absolute -right-5 -top-5 hidden group-hover:block"
          />
        </div>
      </div>
    </div>
  )
}
