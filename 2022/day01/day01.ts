const content = await Bun.file('./day01/input.txt').text()

const elvesCal = content.split("\n\n").map(e => e.split("\n").map(Number).reduce((a, b) => a + b)).sort((a, b) => a - b)

console.log(Math.max(...elvesCal))

// @ts-ignore
console.log(elvesCal.at(-1) + elvesCal.at(-2) + elvesCal.at(-3))