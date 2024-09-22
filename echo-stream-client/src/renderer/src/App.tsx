import { Route, Routes } from 'react-router-dom'
import { AsideList } from './layout/aside-list'
import { HeaderBar } from './layout/header-bar'
import { MusicBar } from './layout/music-bar'
import { MusicList } from './page/music-list'

import { Daily } from './page/daily'
import { Like } from './page/like'
import { Search } from './page/search'

function App(): JSX.Element {
  return (
    <>
      <HeaderBar />
      <div className="flex-1 flex">
        <AsideList />
        <main className="w-full h-full">
          <Routes>
            <Route path="/" element={<h1>111</h1>} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/like" element={<Like />} />
            <Route path="/recently" element={<h1>444</h1>} />
            <Route path="/download" element={<h1>555</h1>} />
            <Route path="/list/:id" element={<MusicList />} />
            <Route path="/search/:name" element={<Search />} />
          </Routes>
        </main>
      </div>
      <MusicBar />
    </>
  )
}

export default App
