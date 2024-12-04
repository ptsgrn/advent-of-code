export function parse(input: string) {
  return input.split('\n').map(line => line.split(""))
}

const isValidCoord = (x: number, y: number, m: number, n: number) => x >= 0 && x < m && y >= 0 && y < n
const directions = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
]

const arrowsDirections = [
  "↖", "↑", "↗",
  "←", "→",
  "↙", "↓", "↘",
]

const dirToArrow = (dir: number[]) => {
  const index = directions.findIndex(d => d[0] === dir[0] && d[1] === dir[1])
  return arrowsDirections[index] + ` (${dir[0]},${dir[1]})`
}

export function partOne(input: ReturnType<typeof parse>) {
  let count = 0;
  const rowCount = input.length;
  const colCount = input[0].length;
  const word = "XMAS"

  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < colCount; x++) {
      for (const dir of directions) {
        if (input[y][x] !== word[0]) continue
        let nx = x + dir[0]
        let ny = y + dir[1]
        let wordIndex = 1;
        while (nx >= 0 && nx < colCount && ny >= 0 && ny < rowCount) {
          if (input[ny][nx] !== word[wordIndex]) break
          nx += dir[0]
          ny += dir[1]
          wordIndex += 1
        }
        if (wordIndex === word.length) count++
      }
    }
  }
  return count
}

export function partTwo(input: ReturnType<typeof parse>) {

}