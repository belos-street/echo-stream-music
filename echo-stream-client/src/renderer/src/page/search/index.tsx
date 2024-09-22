import { DownloadOutlined, HeartFilled } from '@ant-design/icons'
import { searchRequest } from '@renderer/server/api/music'
import { useUserStore } from '@renderer/store/useUserStore'
import { SearchType, Song } from '@renderer/type/song'
import { secondsToMinutes } from '@renderer/utils'
import { Table, TableColumnsType, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
            <HeartFilled className={`cursor-pointer ${record.isFavorite ? 'c-red' : ''}`} />
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

export function Search(): JSX.Element {
  const { name } = useParams()
  const { user } = useUserStore()
  const [active, setActive] = useState('song')

  /** song table */
  const [dataSource, setDataSource] = useState<Song[]>([])

  useEffect(() => {
    searchRequest({
      keyword: name!,
      type: active === 'song' ? SearchType.Song : SearchType.Artist,
      userId: user.id
    }).then((res) => {
      setDataSource(res.songs)
      console.log(res)
    })
  }, [name])

  const SongTable = () => (
    <Table
      dataSource={dataSource}
      columns={columns}
      size="small"
      rowKey="id"
      className="search-table-song"
      rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
      pagination={false}
      onRow={(record) => {
        return {
          onDoubleClick: () => {
            console.log(record)
          }
        }
      }}
    />
  )

  /** artist table */

  return (
    <div className="p-12">
      <div className="text-20 font-bold mb-12">{name}</div>
      <Tabs
        size="small"
        defaultActiveKey="song"
        onChange={(key) => setActive(key)}
        items={[
          {
            label: '歌曲',
            key: 'song',
            children: <SongTable />
          },
          {
            label: '歌手',
            key: 'artist',
            children: 'Tab 2'
          }
        ]}
      />
    </div>
  )
}
