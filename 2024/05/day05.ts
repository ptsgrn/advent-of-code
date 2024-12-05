export function parse(input: string) {
  const processedInput = input.split("\n\n")
  const rules = processedInput[0]
    .split("\n")
    .map(r => r.split("|").map(Number))
  const updates = processedInput[1]
    .split("\n")
    .map(u => u.split(",").map(Number))
  return {
    rules,
    updates
  }
}

const getCenter = (list: number[]) => list[Math.floor(list.length / 2)]
const getRelatedRules = (list: number[][], num: number) => {
  const filtered = list.filter(n => n.includes(num))
  return [filtered.map(n => n[0]).filter(n => n !== num), filtered.map(n => n[1]).filter(n => n !== num)]
}
const isValidUpdates = (rules: number[][], update: number[]): boolean => {
  for (let i = 0; i < update.length; i++) {
    const [comesBefore, comesAfter] = getRelatedRules(rules, update[i])
    const [before, after] = [update.slice(0, i), update.slice(i + 1)]
    const beforeConflict = before.some(b => comesAfter.includes(b))
    const afterConflict = after.some(a => comesBefore.includes(a))
    if (beforeConflict || afterConflict) return false
  }
  return true
}

export function partOne(input: ReturnType<typeof parse>) {
  return input
    .updates
    .filter(u => isValidUpdates(input.rules, u))
    .map(getCenter)
    .reduce((a, b) => a + b, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input
    .updates
    .filter(u => !isValidUpdates(input.rules, u))
    .map(v => v.toSorted((a, b) => {
      const [beforeA, afterA] = getRelatedRules(input.rules, a)
      return beforeA.includes(b) ? 1 : afterA.includes(b) ? -1 : 0
    }))
    .map(getCenter)
    .reduce((a, b) => a + b, 0)
}