export function initVolume() {
  const volume = window.localStorage.getItem('playVolume')
  return volume ? Number(volume) : 0.5
}
