import { CalendarOutlined, DownloadOutlined, HeartFilled } from '@ant-design/icons'
import { getRecommendRequest, songMarkRequest } from '@renderer/server/api/music'
import { useSongStore } from '@renderer/store/useMusicStore'
import { useUserStore } from '@renderer/store/useUserStore'
import { Song } from '@renderer/type/song'
import { secondsToMinutes } from '@renderer/utils'
import { Table, TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'

export function Daily(): JSX.Element {
  const { user } = useUserStore()
  const [dataSource, setDataSource] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

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
              <HeartFilled
                className={`cursor-pointer ${record.isFavorite ? 'c-red' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()

                  setDataSource((prevData) =>
                    prevData.map((item) =>
                      item.id === record.id ? { ...item, isFavorite: !item.isFavorite } : item
                    )
                  )
                  songMarkRequest({
                    userId: user.id,
                    songId: record.id
                  }).then(() => {
                    //  handleSearchRequest()
                  })
                }}
              />
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

  useEffect(() => {
    //获取歌曲列表
    getRecommendRequest({ userId: user.id })
      .then((res) => {
        setDataSource(res)
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
    <div>
      <div className="flex items-center p-12 gap-12">
        <CalendarOutlined className="text-64 c-primary" />
        <div>
          <div className="font-bold text-24">每日歌曲推荐</div>
          <div className="text-12 text-neutral-500">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
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
            y: '440px'
          }}
        />
      </div>
    </div>
  )
}
