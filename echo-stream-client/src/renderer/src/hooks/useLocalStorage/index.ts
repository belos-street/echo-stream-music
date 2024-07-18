import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const initialValue: string | null = localStorage.getItem(key) //取值
  const parsedValue: T = initialValue ? (JSON.parse(initialValue) as T) : defaultValue //反序列化
  const [value, setValue] = useState<T>(parsedValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)) //序列化
  }, [key, value])

  return [value, setValue]
}
