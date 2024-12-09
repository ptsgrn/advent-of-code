export function parse(input: string): [number, number[]][] {
  return input.split('\n').map((line) => line.split(":")).map(([r, v]) => {
    return [+r, v.trim().split(" ").map(Number)]
  })
}

const calculate = (r: number[], o: string) => {
  let result = r[0]
  for (let i = 0; i < o.length; i++) {
    if (o[i] === "0") {
      result += r[i + 1]
    } else (o[i] === "1") {
      result *= r[i + 1]
    }
  }
  return result
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, [r, v]) => {
    const n = v.length
    const max = 2 ** (n - 1)
    for (let i = 0; i < max; i++) {
      const o = i
        .toString(2)
        .padStart(n - 1, "0")
      if (calculate(v, o) === r) {
        return acc + r
      }
    }
    return acc
  }, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, [r, v]) => {
    const n = v.length
    const max = 3 ** (n - 1)
    for (let i = 0; i < max; i++) {
      const o = i
        .toString(3)
        .padStart(n - 1, "0")
      if (calculate(v, o) === r) {
        return acc + r
      }
    }
    return acc
  }, 0)
}