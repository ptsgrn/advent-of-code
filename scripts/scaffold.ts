import dedent from 'dedent'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'

import { fetchInput } from './api.ts'

export async function scaffold(day: number, year: number) {
  const name = `${day}`.padStart(2, '0')

  const directory = new URL(`../${year}/${name}/`, import.meta.url)

  if (existsSync(directory)) return

  console.log(`📂 Setting up day ${day} of ${year}`)

  await mkdir(directory)

  const solution = dedent`
  export function parse(input: string) {
    return input
  }
  
  export function partOne(input: ReturnType<typeof parse>) {}

  export function partTwo(input: ReturnType<typeof parse>) {}
  `

  console.log(`📂 Fetching your input`)

  const input = await fetchInput({ day, year }).catch(() => {
    console.log('📂 Fetching your input have failed, empty file will be created.')
  })

  await Bun.write(new URL(`day${name}.ts`, directory.href).pathname, solution)
  await Bun.write(new URL(`input.txt`, directory.href).pathname, input ?? '')
  await Bun.write(new URL(`example.txt`, directory.href).pathname, '')

  console.log('📂 You all set up, have fun!')
}