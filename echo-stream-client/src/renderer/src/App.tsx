import { AsideList } from './layout/aside-list'
import { HeaderBar } from './layout/header-bar'
import { MusicBar } from './layout/music-bar'

function App(): JSX.Element {
  return (
    <>
      <HeaderBar />
      <div className="flex-1">
        <AsideList />
        <main></main>
      </div>
      <MusicBar />
    </>
  )
}

export default App
