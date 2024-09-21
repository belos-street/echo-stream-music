/**
 * secondsToMinutes
 * @param seconds
 * @returns minutes:seconds
 *
 * 12 -> 00:12
 * 123 - > 02:03
 * 1234 - > 20:34
 */

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')

  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${remainingSeconds}`
}
