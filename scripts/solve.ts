import { argv } from 'bun'
import chalk from 'chalk'
import { formatPerformance, withPerformance, isBetween } from './utils'
import { scaffold } from './scaffold.ts'

let day = 0
let year = 0

if (argv.length >= 4) {
  day = +argv[2] < 2000 ? +argv[2] : +argv[3]
  year = +argv[2] < 2000 ? +argv[3] : +argv[2]
}

if (argv.length === 3 || argv.length === 4) {
  if (argv[2].includes('/')) {
    const [a, b] = argv[2].split('/').map(Number)
    day = a < 2000 ? a : b
    year = a < 2000 ? b : a
  } else {
    day = +argv[2]
    year = new Date().getFullYear()
  }
}

if (argv.length <= 2) {
  day = new Date().getDate()
  year = new Date().getFullYear()
}

const isTest = argv.includes('--test')

if (!isBetween(day, [1, 25])) {
  console.log(`🎅 Pick a day between ${chalk.bold(1)} and ${chalk.bold(25)}.`)
  console.log(`🎅 To get started, try: ${chalk.cyan('bun solve 1')}`)
  process.exit(0)
}

await scaffold(day, year)

const name = `${day}`.padStart(2, '0')
const inputPath = isTest ? `@/${year}/${name}/example.txt` : `@/${year}/${name}/input.txt`
let { default: input } = await import(inputPath)

if (!input) {
  console.log(chalk.red(`📂 ${inputPath} is blank!`))
  console.log(chalk.dim(`   Add some data to the file and save again`))
  input = ''
}

if (isTest) {
  console.log(chalk.cyanBright.bold`🧪 Running using example.txt data`, chalk.dim`\n   (remove --test to use input.txt)`)
}

const { partOne, partTwo, parse } = await import(`@/${year}/${name}/day${name}.ts`)
const [one, onePerformance] = withPerformance(() => partOne?.(parse(input)))
const [two, twoPerformance] = withPerformance(() => partTwo?.(parse(input)))

console.log(
  '🌲',
  'Part One:',
  chalk.green(one ?? '—'),
  one ? `(${formatPerformance(onePerformance)})` : ''
)
console.log(
  '🎄',
  'Part Two:',
  chalk.green(two ?? '—'),
  two ? `(${formatPerformance(twoPerformance)})` : ''
)