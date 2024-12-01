export function parse(input: string) {
  let a = []
  let b = []

  for (const line of input.trim().split('\n')) {
    const res = line.split("   ").map(Number)
    a.push(res[0])
    b.push(res[1])
  }

  a = a.toSorted()
  b = b.toSorted()

  return { a, b }
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.a.map((v, i) => Math.abs(v - input.b[i])).reduce((a, b) => a + b, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  let counterMemo = new Map()
  let sum = 0
  const b = input.b
  const a = input.a
  for (const n of input.a) {
    let count = counterMemo.has(n) ? counterMemo.get(n) : b.filter(b => b === n).length
    counterMemo.set(a, count)
    sum += n * count
  }
  return sum
}