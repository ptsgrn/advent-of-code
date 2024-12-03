export function parse(input: string) {
  return input.trim().split("\n").map(v => v.split(" ").map(Number));
}

const abs = Math.abs
const sum = (list: number[]) => list.reduce((acc, v) => acc + v, 0)
const absSum = (list: number[]) => list.reduce((acc, v) => acc + abs(v), 0)

export function partOne(input: ReturnType<typeof parse>) {
  return input
    // calculate diff between each value
    .map(v => v
      // diff between each value but last one
      .map((v, i, a) => {
        if (i === a.length - 1) return null
        return v - a[i + 1]
      })
      // remove null values
      .filter(v => v !== null)
    )
    // if consecutive,
    // sum of list of absolute values is equal to absolute value of sum of list
    .filter(l => abs(sum(l)) === abs(absSum(l)))
    .filter(l => l.every(v => v !== 0 && abs(v) <= 3))
    .length
}

export function partTwo(input: ReturnType<typeof parse>) {
  let valid = 0;
  for (const report of input) {
    let validSum = 0
    for (let i = 0; i < report.length; i++) {
      // just remove one element from the list each time
      let newReport = [...report.slice(0, i), ...report.slice(i + 1)]
      // find if the new list is valid, if yes, it will return 1
      validSum += partOne([newReport])
    }
    // since invalid list will always return 0, we can just check if the sum is not 0
    if (validSum !== 0) valid++
  }
  return valid
}