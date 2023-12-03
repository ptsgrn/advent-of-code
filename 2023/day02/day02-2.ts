let sum = 0
const count: Record<string, number> = {
  // 12 red cubes, 13 green cubes, and 14 blue cubes
  red: 12,
  green: 13,
  blue: 14
}

let games = (await Bun.file('./day02/input.txt').text()).split('\n')

for (const game of games) {
  const gn = +game.split(':')[0].split(' ')[1]
  const gc = game.split(":")[1].split(";").map(s => s.trim().split(",").map(t => t.trim().split(" ")))
  let minimunNeeded = {
    red: 0,
    green: 0,
    blue: 0
  }
  for (const sets of gc) {
    for (const set of sets) {
      if (+set[0] > minimunNeeded[set[1]]) {
        minimunNeeded[set[1]] = +set[0]
      }
    }
  }
  sum += minimunNeeded.red * minimunNeeded.green * minimunNeeded.blue
}

console.log(sum)