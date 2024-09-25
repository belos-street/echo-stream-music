import { DownloadOutlined, HeartFilled } from '@ant-design/icons'
import { Song } from '@renderer/type/song'
import { secondsToMinutes } from '@renderer/utils'
import { TableColumnsType } from 'antd'

export function useTable() {
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

  return [columns]
}
