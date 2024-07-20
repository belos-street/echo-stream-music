import { DownloadOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import { DailyIcon, MusicIcon, AddIcon, MusicListIcon, RecentlyPlayedIcon } from '@icons/'
import { Avatar } from 'antd'

export function AsideList(): JSX.Element {
  return (
    <aside className="w-200 bg-neutral-900 flex flex-col h-full">
      <section className="flex items-center gap-12 px-12 mt-12">
        <Avatar size={32} icon={<UserOutlined />} />
        <span className="text-14 font-bold">用户名</span>
      </section>
      <ul className="mt-16 text-14 font-bold px-0">
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <MusicIcon className="mr-8 " />
          发现音乐
        </li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <DailyIcon className="mr-8" />
          每日推荐
        </li>
      </ul>
      <ul className="mt-16 text-14 px-0">
        <li className="pl-16 mb-6 text-12 text-neutral-500">我的音乐</li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <HeartOutlined className="mr-8" />
          我喜欢
        </li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <RecentlyPlayedIcon className="mr-8" />
          最近播放
        </li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <DownloadOutlined className="mr-8" />
          下载管理
        </li>
      </ul>
      <ul className="px-0 mt-16 text-14">
        <li className="pl-16 mb-6 text-12 text-neutral-500 flex justify-between">
          创建的歌单 <AddIcon className="mr-8 cursor-pointer" />
        </li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <MusicListIcon className="mr-8" />
          歌单1
        </li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <MusicListIcon className="mr-8" />
          歌单1
        </li>
        <li className="pl-16 py-4 hover:bg-neutral-950 transition-background duration-300 ease-in-ou cursor-pointer">
          <MusicListIcon className="mr-8" />
          歌单1
        </li>
      </ul>
    </aside>
  )
}
