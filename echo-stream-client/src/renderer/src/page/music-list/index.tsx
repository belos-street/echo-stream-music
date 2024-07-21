import { useParams } from 'react-router-dom'

export function MusicList() {
  const { id } = useParams()
  return <h1>歌单{id}</h1>
}
