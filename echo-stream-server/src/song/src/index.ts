export type PreferenceItem = {
  type: 'artist' | 'genre'
  value: number
  score: number
}

export type Score = {
  id: number
  score: number
}
