const lines = (await Bun.file('./day01/input.txt').text()).split('\n');

let sum = 0

for (const line of lines) {
  const f = line.split("").filter(c =>c.match(/[0-9]/))
  sum += +(f[0] + f[f.length-1])
}

console.log(sum)