import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export function HeaderBar(): JSX.Element {
  return (
    <header className="w-screen flex flex-row h-40 bg-neutral-800">
      <div className="w-200 flex flex-items-center justify-end pr-6 gap-24">
        <LeftOutlined className="" />
        <RightOutlined />
      </div>
      <div>322</div>
    </header>
  )
}
