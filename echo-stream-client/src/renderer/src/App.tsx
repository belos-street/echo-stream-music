import { Route, Routes } from 'react-router-dom'
import { AsideList } from './layout/aside-list'
import { HeaderBar } from './layout/header-bar'
import { MusicBar } from './layout/music-bar'
import { MusicList } from './page/music-list'
import { Button } from 'antd'
import { userInfoRequest } from './server/api/user'

import { Daily } from './page/daily'

//继续封装请求器
function clickTest() {
  userInfoRequest({
    id: 1
  }).then((res) => {
    console.log(res, 'okkkkkkk')
  })
}

function App(): JSX.Element {
  return (
    <>
      <HeaderBar />
      <div className="flex-1 flex">
        <AsideList />
        <main>
          <Routes>
            <Route path="/" element={<h1>111</h1>} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/like" element={<h1>333</h1>} />
            <Route path="/recently" element={<h1>444</h1>} />
            <Route path="/download" element={<h1>555</h1>} />
            <Route path="/list/:id" element={<MusicList />} />
          </Routes>
        </main>
        <Button onClick={() => clickTest()}>click test</Button>
      </div>
      <MusicBar />
    </>
  )
}

export default App
