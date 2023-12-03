let _lines = (await Bun.file('./day01/input.txt').text()).split('\n')
// let _lines = (await Bun.file('./day01/input-test.txt').text()).split('\n')

const numMap: Record<string, number> = {
  'one': 1,
  'two': 2,
  'six': 6,
  'four': 4,
  'five': 5,
  'nine': 9,
  'three': 3,
  'seven': 7,
  'eight': 8,
}

let lines = _lines.map(l => {
  for (let i = 0; i <= l.length; i++) {
    for (const k of [3, 4, 5]) {
      if (l.slice(i, i + k) in numMap) {
        console.log(l, l.slice(i, i + k))
        l = l.substring(0, i+1) + numMap[l.slice(i, i + k)] + l.substring(i + k - 1, l.length)
        console.log(l)
      }
    }
  }
  return l
})

let sum = 0

for (const line of lines) {
  const f = line.split("").filter(c => c.match(/[0-9]/))
  sum += +(f[0] + f[f.length - 1])
}

console.log(sum)