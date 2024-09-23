import { HeartFilled, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import { MinioUrl } from '@renderer/config'
import { songGetFavoritesRequest } from '@renderer/server/api/music'
import { useSongStore } from '@renderer/store/useMusicStore'
import { useUserStore } from '@renderer/store/useUserStore'
import { Song } from '@renderer/type/song'
import { secondsToMinutes } from '@renderer/utils'
import { Button, Divider, Table, TableColumnsType, Tag } from 'antd'
import { useEffect, useState } from 'react'

const columns: TableColumnsType<Song> = [
  {
    title: '',
    dataIndex: 'operate',
    key: 'operate',
    width: 120,
    render: (_, record) => {
      return (
        <>
          <div className="flex gap-12 justify-end pr-4">
            <div>{record.index! < 10 ? `0${record.index}` : record.index}</div>
            <HeartFilled className="cursor-pointer c-red" />
            <DownloadOutlined className="cursor-pointer" />
          </div>
        </>
      )
    }
  },
  {
    title: '音乐标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
  },
  {
    title: '歌手',
    dataIndex: 'artist',
    key: 'artist',
    width: 140,
    ellipsis: true
  },
  {
    title: '时长',
    dataIndex: 'duration',
    key: 'duration',
    width: 120,
    ellipsis: true,
    render: (text) => secondsToMinutes(text)
  }
]

export function Like(): JSX.Element {
  const { user } = useUserStore()
  const [dataSource, setDataSource] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [coverUrl, setCoverUrl] = useState<string>('')

  useEffect(() => {
    //获取歌曲列表
    songGetFavoritesRequest({ userId: user.id })
      .then((res) => {
        setDataSource(res)
        console.log(res)
        res.length > 0 && res[0].coverUrl
          ? setCoverUrl(MinioUrl + res[0].coverUrl)
          : setCoverUrl('')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user])

  const { setSong } = useSongStore()
  const handleRowDoubleClick = (record: Song) => {
    setSong(record)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex py-12 px-30 gap-30 w-full">
        <div className="w-200 h-200">
          <img src={coverUrl} className="rd-8 w-full h-full" />
        </div>
        <div className="flex-1 flex flex-col gap-20">
          <div className="text-22 font-bold flex items-center ">
            <Tag color="green">歌单</Tag>
            我喜欢的音乐
          </div>
          <div className="text-12  text-neutral-400">2024-08-21 创建</div>
          <div>
            <Button type="primary" icon={<PlayCircleOutlined />} shape="round">
              播放全部
            </Button>
          </div>
          <div className="text-12  text-neutral-400">歌曲数：233</div>
        </div>
      </div>
      <Divider className="mt-18 mb-8 px-30" />
      <div className="flex-1">
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          loading={loading}
          rowKey="id"
          className="song-table"
          rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
          pagination={false}
          onRow={(record) => {
            return {
              onDoubleClick: () => handleRowDoubleClick(record)
            }
          }}
          scroll={{
            y: '260px'
          }}
        />
      </div>
    </div>
  )
}
