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
  let possible = true
  for (const sets of gc) {
    for (const set of sets) {
      if (+set[0] > count[set[1]]) {
        possible = false
      }
    }
  }
  if (possible) {
    sum += gn
  }
}

console.log(sum)