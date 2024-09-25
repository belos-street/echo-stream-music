import { CalendarOutlined } from '@ant-design/icons'
import { useTable } from '@renderer/hooks/useTable'
import { songGetFavoritesRequest } from '@renderer/server/api/music'
import { useSongStore } from '@renderer/store/useMusicStore'
import { useUserStore } from '@renderer/store/useUserStore'
import { Song } from '@renderer/type/song'
import { Table } from 'antd'
import { useEffect, useState } from 'react'

export function Daily(): JSX.Element {
  const { user } = useUserStore()
  const [dataSource, setDataSource] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [columns] = useTable()

  useEffect(() => {
    //获取歌曲列表
    songGetFavoritesRequest({ userId: user.id })
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
