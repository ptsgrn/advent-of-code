export function parse(input: string) {
  return input.split('\n').map(line => line.split(""))
}

export function partOne(input: ReturnType<typeof parse>) {
  const directions = [
    [-1, -1], [0, -1], [1, -1], // top
    [-1, 0], [1, 0], // middle
    [-1, 1], [0, 1], [1, 1], // bottom
  ]
  const isValidCoord = (x: number, y: number, m: number, n: number) => x >= 0 && x < m && y >= 0 && y < n
  let count = 0;
  const rowCount = input.length;
  const colCount = input[0].length;
  const word = "XMAS";
  const wordLength = word.length;

  for (const dir of directions) {
    for (let y = 0; y < rowCount; y++) {
      for (let x = 0; x < colCount; x++) {
        if (input[y][x] !== word[0]) continue;
        let nx = x, ny = y, wordIndex = 0;
        while (
          wordIndex < wordLength
          && isValidCoord(nx, ny, colCount, rowCount)
          && input[ny][nx] === word[wordIndex]
        ) {
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
  let count = 0;
  const rowCount = input.length;
  const colCount = input[0].length;
  for (let y = 1; y < rowCount - 1; y++) {
    for (let x = 1; x < colCount - 1; x++) {
      const
        tl = input[y - 1][x - 1],
        tr = input[y - 1][x + 1],
        bl = input[y + 1][x - 1],
        br = input[y + 1][x + 1];
      if (
        input[y][x] !== "A"
        || [tl, tr, bl, br].filter(v => v == "M" || v == "S").length !== 4
        || tl === br
        || tr === bl
      ) continue;
      count++
    }
  }
  return count;
}
