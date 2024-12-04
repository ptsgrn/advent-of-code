export function parse(input: string) {
  return input.split("\n").map(r => r.split(" "))
}

const WIN_MAP: Record<string, string[]> = {
  "X": ["C", "B"], // rock
  "Y": ["A", "C"], // paper
  "Z": ["B", "A"], // scissor
}

const SCORE_MAP = ["X", "Y", "Z"]

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((sum, [other, suggest]) => {
    if (WIN_MAP[suggest][0] === other) {
      sum += 6
    } else if (WIN_MAP[suggest][1] !== other) {
      sum += 3
    }
    return sum + SCORE_MAP.indexOf(suggest) + 1
  }, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  const reverseWinLoseMap: Record<string, string[]> = {
    A: ["Z", "X", "Y"],
    B: ["X", "Y", "Z"],
    C: ["Y", "Z", "X"]
  }

  return input.reduce((sum, [other, suggest]) => {
    if (suggest === 'Y') sum += 3
    if (suggest === 'Z') sum += 6
    return sum + SCORE_MAP.indexOf(reverseWinLoseMap[other][SCORE_MAP.indexOf(suggest)]) + 1
  }, 0)
}
