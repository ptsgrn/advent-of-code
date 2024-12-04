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
  const word = "XMAS";
  const wordLength = word.length;

  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < colCount; x++) {
      if (input[y][x] !== word[0]) continue;
      for (const dir of directions) {
        let nx = x, ny = y, wordIndex = 0;
        while (wordIndex < wordLength && isValidCoord(nx, ny, colCount, rowCount) && input[ny][nx] === word[wordIndex]) {
          nx += dir[0];
          ny += dir[1];
          wordIndex++;
        }
        if (wordIndex === wordLength) count++;
      }
    }
  }
  return count;
}

export function partTwo(input: ReturnType<typeof parse>) {

}