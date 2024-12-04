export function parse(input: string) {
  return input
    .split("\n\n")
}


const getElvesCal = (content: string[]) => content.map(e => e.split("\n").map(Number).reduce((a, b) => a + b)).sort((a, b) => a - b)


export function partOne(input: ReturnType<typeof parse>) {
  return Math.max(...getElvesCal(input))
}

export function partTwo(input: ReturnType<typeof parse>) {
  const elvesCal = getElvesCal(input)
  // @ts-ignore
  return elvesCal.at(-1) + elvesCal.at(-2) + elvesCal.at(-3)
}