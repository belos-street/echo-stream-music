import {
  HeartFilled,
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'
import { MinioUrl } from '@renderer/config'
import { addHistoryRequest } from '@renderer/server/api/music'
import { useSongStore } from '@renderer/store/useMusicStore'
import { PlayStaus, usePlayStore } from '@renderer/store/usePlayStore'
import { useUserStore } from '@renderer/store/useUserStore'
import { useEffect, useRef } from 'react'

export function PlayPanel(): JSX.Element {
  const { status, setStatus, volume, setProgress } = usePlayStore()
  const { song } = useSongStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { user } = useUserStore()

  //初始化播放配置
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100
  }, [])

  //音量控制
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100
  }, [volume])

  //播放进度控制
  const updateTime = () => {
    if (!audioRef.current) return
    const progressCurrent = Number(
      ((audioRef.current.currentTime / audioRef.current.duration) * 100).toFixed(1)
    )
    setProgress(progressCurrent)
  }

  // 跳转到指定的时间点
  // const seekTo = (time) => {
  //   if (!audioRef.current) return
  //   audioRef.current.currentTime = time
  //   setCurrentTime(time)
  // }

  //控制播放状态
  const handleStatusClick = () => {
    if (status === PlayStaus.Paused) {
      setStatus(PlayStaus.Playing)
      audioRef.current?.play()
    } else if (status === PlayStaus.Playing) {
      setStatus(PlayStaus.Paused)
      audioRef.current?.pause()
    }
  }

  //切换歌曲，自动播放，同时添加历史记录请求
  useEffect(() => {
    setStatus(PlayStaus.Playing)
    audioRef.current?.play()
    addHistoryRequest({
      userId: user.id,
      songId: song.id
    })
  }, [song.fileUrl])

  //切换上一首/下一首歌曲

  //歌曲喜欢

  //歌曲播放完毕事件
  return (
    <div className="flex w-1/3 justify-center gap-16">
      <HeartFilled className="cursor-pointer mr-16 c-red" />
      <StepBackwardOutlined className="text-20 cursor-pointer c-primary" />
      {status === PlayStaus.Playing && (
        <PauseCircleFilled
          className="text-32 cursor-pointer c-primary"
          onClick={() => handleStatusClick()}
        />
      )}
      {status === PlayStaus.Paused && (
        <PlayCircleFilled
          className="text-32 cursor-pointer c-primary"
          onClick={() => handleStatusClick()}
        />
      )}
      <StepForwardOutlined className="text-20 cursor-pointer c-primary" />
      <audio src={MinioUrl + song.fileUrl} ref={audioRef} onTimeUpdate={updateTime} />
    </div>
  )
}
