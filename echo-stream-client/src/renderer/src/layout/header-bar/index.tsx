import { LeftOutlined, RightOutlined, SettingOutlined, SkinOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Search } = Input
export function HeaderBar(): JSX.Element {
  const navigate = useNavigate()
  const onSearch = (text: string) => {
    console.log(text)
    text && navigate(`/search/${text}`)
  }

  return (
    <header className="draggable-header w-screen flex flex-row justify-between h-40 bg-neutral-800">
      <div className="w-200 flex flex-items-end justify-end pr-6 gap-24 pb-8">
        <LeftOutlined className="draggable-header__disable cursor-pointer" />
        <RightOutlined className="draggable-header__disable cursor-pointer" />
      </div>
      <div className="draggable-header__disable flex justify-end items-center gap-12 text-neutral-500 p-12 pb-8">
        <Search
          id="search-input"
          placeholder="search..."
          onSearch={onSearch}
          className="w-140 text-12"
          size="small"
        />
        <SettingOutlined className="cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out" />
        <SkinOutlined className="cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out" />
      </div>
    </header>
  )
}
