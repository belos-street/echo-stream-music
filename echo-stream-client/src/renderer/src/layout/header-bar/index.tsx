import { LeftOutlined, RightOutlined, SettingOutlined, SkinOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const { Search } = Input
export function HeaderBar(): JSX.Element {
  const onSearch = () => {
    console.log(111)
  }

  return (
    <header className="w-screen flex flex-row h-40 bg-neutral-800">
      <div className="w-200 flex flex-items-center justify-end pr-6 gap-24">
        <LeftOutlined className="" />
        <RightOutlined />
      </div>
      <div className="flex-1 flex justify-end items-center gap-12 text-neutral-500 p-12">
        <Search
          id="search-input"
          placeholder="search..."
          onSearch={onSearch}
          className="w-140 text-12"
          size="small"
        />
        <SettingOutlined />
        <SkinOutlined />
      </div>
    </header>
  )
}
