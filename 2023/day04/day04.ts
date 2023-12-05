import text from './input-test.txt'
console.log('# 2023/day04')

let sum = 0

for (let c of text.split('\n')) {
  const [ws, hs] = c.split(":")[1].split("|").map(s => s.split(" ").filter(t => t !== "").map(t => +t))
  const count = hs.filter(h => ws.includes(h)).length
  sum += count === 0 ? 0 : Math.pow(2, count - 1)
}

console.log("Part 1:", sum)

sum = 0



console.log("Part 2:", sum)