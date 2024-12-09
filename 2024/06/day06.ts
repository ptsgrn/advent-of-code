export function parse(input: string) {
  return input.split('\n').map((line) => line.split(''));
}

const directions = ['^', '>', 'v', '<',] as const as string[]
const directionsMap = {
  '^': { x: 0, y: -1 },
  '>': { x: 1, y: 0 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
} as Record<typeof directions[number], { x: number, y: number }>

const calcNextDir = (n: number) => {
  return (n + 1) % 4
}
const getNextDir = (currentDir: typeof directions[number]) => {
  return directions[calcNextDir(directions.indexOf(currentDir))]
}

export function partOne(input: ReturnType<typeof parse>) {
  let currentFacing: typeof directions[number] | string = ''
  let currentPos = { x: 0, y: 0 }
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!directions.includes(input[i][j])) continue
      currentFacing = input[i][j]
      currentPos = { x: j, y: i }
      break
    }
  }
  const visited = new Set<string>()
  visited.add(`${currentPos.x},${currentPos.y}`)
  while (true) {
    const nextDir = directionsMap[currentFacing]
    const x = currentPos.x + nextDir.x
    const y = currentPos.y + nextDir.y
    if (y < 0 || y >= input.length || x < 0 || x >= input[0].length) {
      break
    }
    if (input[y][x] === "#") {
      currentFacing = getNextDir(currentFacing)
      currentPos = { x: currentPos.x, y: currentPos.y }
      continue
    }
    visited.add(`${x},${y}`)
    currentPos = { x, y }
  }
  return visited.size
}

export function partTwo(input: ReturnType<typeof parse>) {
  let currentFacing: typeof directions[number] | string = ''
  let currentPos = { x: 0, y: 0 }
  let count = 0
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!directions.includes(input[i][j])) continue
      currentFacing = input[i][j]
      currentPos = { x: j, y: i }
      break
    }
  }
  const visited = new Set<string>()
  visited.add(`${currentFacing} ${currentPos.x},${currentPos.y}`)
  while (true) {
    const nextDir = directionsMap[currentFacing]
    const x = currentPos.x + nextDir.x
    const y = currentPos.y + nextDir.y
    if (y < 0 || y >= input.length || x < 0 || x >= input[0].length) {
      break
    }
    if (visited.has(`${getNextDir(currentFacing)} ${x},${y}`)) {
      console.log('found', `${currentFacing} ${getNextDir(currentFacing)} ${x},${y}`)
      count++
    }
    visited.add(`${currentFacing} ${x},${y}`)
    if (input[y][x] === "#") {
      currentFacing = getNextDir(currentFacing)
      currentPos = { x: currentPos.x, y: currentPos.y }
      continue
    }
    currentPos = { x, y }
  }
  console.log(visited)
  return count
}