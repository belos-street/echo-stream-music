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
      <div className="grid grid-cols-[200px_1fr] grid-rows-[40px_1fr_60px] gap-0 w-full h-full">
        <HeaderBar />
        <AsideList />
        <main className="row-start-2 col-start-2 row-span-1 col-span-1 overflow-hidden">
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
        <MusicBar />
      </div>
    </>
  )
}

export default App
