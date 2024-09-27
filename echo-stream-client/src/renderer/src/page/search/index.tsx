import { DownloadOutlined, HeartFilled } from '@ant-design/icons'
import { searchRequest, songMarkRequest } from '@renderer/server/api/music'
import { useSongStore } from '@renderer/store/useMusicStore'
import { useUserStore } from '@renderer/store/useUserStore'
import { SearchType, Song } from '@renderer/type/song'
import { secondsToMinutes } from '@renderer/utils'
import { Table, TableColumnsType, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function Search(): JSX.Element {
  const { name } = useParams()
  const { user } = useUserStore()
  const [active, setActive] = useState('song')

  /** song table */
  const { setSong } = useSongStore()
  const [dataSource, setDataSource] = useState<Song[]>([])

  const handleSearchRequest = () => {
    searchRequest({
      keyword: name!,
      type: active === 'song' ? SearchType.Song : SearchType.Artist,
      userId: user.id
    }).then((res) => {
      setDataSource(res.songs)
      console.log(res)
    })
  }

  useEffect(() => {
    handleSearchRequest()
  }, [name])

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

  const SongTable = () => (
    <Table
      dataSource={dataSource}
      columns={columns}
      size="small"
      rowKey="id"
      className="search-table-song h-full"
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
      pagination={false}
      scroll={{
        y: '400px'
      }}
      onRow={(record) => {
        return {
          onDoubleClick: () => {
            setSong(record)
          }
        }
      }}
    />
  )

  /** artist table */

  return (
    <div className="p-12 w-full h-full flex flex-col">
      <div className="text-20 font-bold">{name}</div>
      <Tabs
        size="small"
        defaultActiveKey="song"
        onChange={(key) => setActive(key)}
        className="tab-full h-full"
      >
        <TabPane tab="歌曲" key="song" className="w-full h-full overflow-y-auto">
          <SongTable />
        </TabPane>
        <TabPane tab="歌手" key="artist" className="w-full h-full">
          Tab 2 内容
        </TabPane>
      </Tabs>
    </div>
  )
}
