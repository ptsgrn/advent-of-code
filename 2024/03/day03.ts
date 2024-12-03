export function parse(input: string) {
  return input
}

export function partOne(input: ReturnType<typeof parse>) {
  const validInstructionRegex = /mul\(\d{1,3},\d{1,3}\)/gm
  const instructions = [...input.matchAll(validInstructionRegex)].map(v => v[0])
  return instructions
    .map(v => v
      .replace('mul(', '')
      .replace(')', '')
      .split(',')
      .map(Number)
      .reduce((acc, v) => acc * v, 1)
    )
    .reduce((acc, v) => acc + v, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  const validInstructionRegex = /(?:mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\))/gm
  const instructions = [...input.matchAll(validInstructionRegex)].map(v => v[0])
  let sum = 0
  let enable = true
  for (const instruction of instructions) {
    enable = instruction === 'do()' ? true : instruction === 'don\'t()' ? false : enable
    if (instruction.includes('do')) continue
    sum += enable ? instruction
      .replace('mul(', '')
      .replace(')', '')
      .split(',')
      .map(Number)
      .reduce((acc, v) => acc * v, 1) : 0
  }
  return sum
}