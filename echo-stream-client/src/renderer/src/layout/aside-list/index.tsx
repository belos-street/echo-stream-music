import { DownloadOutlined, HeartOutlined } from '@ant-design/icons'
import { DailyIcon, MusicIcon, AddIcon, MusicListIcon, RecentlyPlayedIcon } from '@icons/'
import { Avatar } from 'antd'
import { ListItem } from './list-item'
import { userInfoRequest } from '@renderer/server/api/user'
import { useEffect } from 'react'
import { useUserStore } from '@renderer/store/useUserStore'

export function AsideList(): JSX.Element {
  const { user, setUser } = useUserStore()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = () => {
    userInfoRequest({ id: 1 }).then((res) => {
      setUser(res)
    })
  }
  return (
    <aside className="row-start-2 col-start-1 row-span-1 col-span-1  bg-neutral-900 flex flex-col h-full">
      <section className="flex items-center gap-12 px-12 mt-12">
        <Avatar size={32} src={user.headPic} onClick={() => getUserInfo()} />

        <span className="text-14 font-bold">{user.nickName}</span>
      </section>
      <ul className="mt-16 text-14 font-bold px-0">
        <ListItem name="发现音乐" route="/" icon={<MusicIcon className="mr-8 " />} />
        <ListItem name="每日推荐" route="/daily" icon={<DailyIcon className="mr-8" />} />
      </ul>
      <ul className="mt-16 text-14 px-0">
        <li className="pl-16 mb-6 text-12 text-neutral-500">我的音乐</li>
        <ListItem name="我喜欢" route="/like" icon={<HeartOutlined className="mr-8" />} />
        <ListItem
          name="最近播放"
          route="/recently"
          icon={<RecentlyPlayedIcon className="mr-8" />}
        />
        <ListItem name="下载管理" route="/download" icon={<DownloadOutlined className="mr-8" />} />
      </ul>
      <ul className="px-0 mt-16 text-14">
        <li className="pl-16 mb-6 text-12 text-neutral-500 flex justify-between">
          创建的歌单
          <AddIcon className="mr-8 cursor-pointer" />
        </li>
        <ListItem name="歌单1" route="/list/1" icon={<MusicListIcon className="mr-8" />} />
        <ListItem name="歌单2" route="/list/2" icon={<MusicListIcon className="mr-8" />} />
        <ListItem name="歌单3" route="/list/3" icon={<MusicListIcon className="mr-8" />} />
      </ul>
    </aside>
  )
}
