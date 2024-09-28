export function mergeMaps(map1: Map<number, number>, map2: Map<number, number>): Map<number, number> {
  const mergedMap = new Map<number, number>()

  // 首先将第一个 Map 中的所有条目添加到新的 Map 中
  for (const [key, value] of map1) {
    mergedMap.set(key, value)
  }

  // 然后遍历第二个 Map，如果键存在，则将值相加；否则，直接添加新条目
  for (const [key, value] of map2) {
    if (mergedMap.has(key)) {
      const currentValue = mergedMap.get(key) || 0
      mergedMap.set(key, currentValue + value)
    } else {
      mergedMap.set(key, value)
    }
  }

  return mergedMap
}
