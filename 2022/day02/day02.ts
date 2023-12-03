import text from '../day02/input.txt'
// import text from '../day02/input-test.txt'
let sum = 0
const rounds = text.split("\n").map(r => r.split(" "))

const winMap: Record<string, string[]> = {
  "X": ["C", "B"], // rock
  "Y": ["A", "C"], // paper
  "Z": ["B", "A"] // scissor
}

const scoreMap = ["X", "Y", "Z"]

for (const [other, suggest] of rounds) {
  if (winMap[suggest][0] == other) {
    sum += 6
  } else if (winMap[suggest][1] !== other) {
    sum += 3
  }
  sum += scoreMap.indexOf(suggest) + 1
}

console.log(sum)

sum = 0

const reverseWinLoseMap: Record<string, string[]> = {
  A: ["Z", "X", "Y"],
  B: ["X", "Y", "Z"],
  C: ["Y", "Z", "X"]
}

for (const [other, suggest] of rounds) {
  if (suggest == 'Y') sum += 3
  if (suggest == 'Z') sum += 6
  sum += scoreMap.indexOf(reverseWinLoseMap[other][scoreMap.indexOf(suggest)]) + 1
}

console.log(sum)