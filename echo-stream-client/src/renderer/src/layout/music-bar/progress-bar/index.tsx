/**
 *
 * 监听两种鼠标事件
 * 1. 鼠标 直接在 progress 上按下
 * 2. 鼠标 点击 point 拖动
 */

export function SliderBar(): JSX.Element {
  return (
    <div className="group w-screen h-16 flex flex-items-center flex-justify-center cursor-pointer absolute -top-7">
      <div id="sliderBar" className="w-screen h-2 bg-transparent">
        <div id="progress" className=" bg-primary h-full w-200 rounded-r relative">
          <div
            id="point"
            className="bg-primary h-12 w-12 rounded-full absolute -right-5 -top-5 hidden group-hover:block"
          />
        </div>
      </div>
    </div>
  )
}
