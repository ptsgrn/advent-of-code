# advent-of-code by ptsgrn
> Since 2024, this repo is a adaptation of https://github.com/adrianklimek/advent-of-code-bun

This is my repo for the [Advent of Code](https://adventofcode.com/) challenges. I'm using [Bun](https://bun.sh) to run the code.

To install dependencies:

```bash
bun install
```

To create a challenge file for current day:

```bash
bun solve
```

And for using an example challenge info:
```bash
bun solve --test
```

This will create files in current year/day automatically with the following structure:

```
📂 2024 (current year)
└📂 01 (current day)
 ├── 📜 day01.ts
 ├── 📜 day01.test.ts
 ├── 📜 example.txt
 └── 📜 input.txt
```

In case you want to create a challenge file for a specific day:

```bash
bun solve 01 # for day 1 of current year
# bolow are day 1 of 2024 equivalent
bun solve 1 2024
bun solve 2024 1
bun solve 1/2024
bun solve 2024/1
```

After that, copy the example challenge input to `example.txt` and if not already provided, the actual challenge input to `input.txt` then save. The console will output the result of the challenge.
