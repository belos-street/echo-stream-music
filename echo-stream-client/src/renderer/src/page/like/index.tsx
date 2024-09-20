import { HeartFilled, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import { useUserStore } from '@renderer/store/useUserStore'
import { Button, Divider, Table, TableColumnsType, Tag } from 'antd'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

export function Like(): JSX.Element {
  const { user } = useUserStore()
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖西湖区湖底公园1号西湖区湖底公园1号区湖底公园1号'
    }
  ]

  const columns: TableColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'operate',
      key: 'operate',
      width: 120,
      render: (_, record) => {
        return (
          <>
            <div className="flex gap-12 justify-end pr-4">
              <div>{record.age}</div>
              <HeartFilled className="cursor-pointer c-red" />
              <DownloadOutlined className="cursor-pointer" />
            </div>
          </>
        )
      }
    },
    {
      title: '音乐标题',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true
    },
    {
      title: '歌手',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true
    },
    {
      title: '时长',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      ellipsis: true
    }
  ]

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex py-12 px-30 gap-30 w-full">
        <div className="w-200 h-200 bg-blue">1</div>
        <div className="flex-1 flex flex-col gap-20">
          <div className="text-22 font-bold flex items-center ">
            <Tag color="green">歌单</Tag>
            我喜欢的音乐 {user.id}
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
      <div>
        <Table dataSource={dataSource} columns={columns} size="small" />
      </div>
    </div>
  )
}
