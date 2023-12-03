import input from './input-test.txt'
let sum = 0
const rows = input.split("\n").map(a => a + ".")
console.log("----")

for (let r = 0; r < rows.length; r++) {
  let num = ""
  for (let c = 0; c < rows[r].length; c++) {
    if (!Number.isNaN(+rows[r][c])) {
      num += rows[r][c]
    } else {
      const len = num.length
      if (len === 0) continue
      const neighbors = [
        rows[r - 1]?.slice(c - len - 1 < 0 ? 0 : c - len - 1, c + 1) ?? [],
        rows[r]?.[c - len - 1 < 0 ? -1 : c - len - 1] ?? [],
        rows[r]?.[c] ?? [],
        rows[r + 1]?.slice(c - len - 1 < 0 ? 0 : c - len - 1, c + 1) ?? []
      ]
      if (neighbors.filter(n => /[^0-9\.]/g.test(n)).length > 0) {
        sum += +num
      }
      num = ""
    }
  }
}

console.log("2023 Day 03")
console.log("Part 1:", sum)