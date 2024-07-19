import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export function AsideList(): JSX.Element {
  return (
    <aside className="w-200 bg-neutral-900 flex flex-col h-full">
      <section className="flex items-center gap-12 px-12 mt-12">
        <Avatar size={32} icon={<UserOutlined />} />
        <span className="text-14 font-bold">用户名</span>
      </section>
      <ul className="px-16 mt-16 text-14 font-bold">
        <li className="mb-12">发现音乐</li>
        <li>每日推荐</li>
      </ul>
      <ul className="px-16 mt-16 text-14">
        <li className="mb-6 text-12 text-neutral-500">我的音乐</li>
        <li className="mb-12">我喜欢</li>
        <li className="mb-12">最近播放</li>
        <li>下载管理</li>
      </ul>
      <ul className="px-16 mt-16 text-14">
        <li className="mb-6 text-12 text-neutral-500">创建的歌单</li>
        <li className="mb-12">歌单1</li>
        <li className="mb-12">歌单12</li>
        <li>歌单1</li>
      </ul>
    </aside>
  )
}
