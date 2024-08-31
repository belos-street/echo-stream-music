export function minutesToSeconds(timeStr: string) {
  // 分割字符串为分钟和秒数
  const [minutes, seconds] = timeStr.split(':').map((item) => Number(item))
  // 计算总秒数
  const totalSeconds = minutes * 60 + seconds

  return totalSeconds
}
