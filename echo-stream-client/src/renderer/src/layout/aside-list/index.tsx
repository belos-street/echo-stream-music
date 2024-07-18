export function AsideList(): JSX.Element {
  return (
    <aside className="w-200 bg-neutral-900 flex flex-col h-full">
      <section className="m-2 text-very-cool">11</section>
      <ul>
        <li>发现音乐</li>
        <li>每日推荐</li>
      </ul>
      <ul>
        <li>我的音乐</li>
        <li>我喜欢</li>
        <li>最近播放</li>
        <li>下载管理</li>
      </ul>
      <ul>
        <li>创建的歌单</li>
        <li>...</li>
      </ul>
    </aside>
  )
}
