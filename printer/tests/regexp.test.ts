import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { assert, test } from 'vitest'

import { replaceAdmonitions } from '../src/shared'

test('Should replace MKDocs style admonitions with directive', async () => {
  const [input, output] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        './tests/input.md'
      ),
      {
        encoding: 'utf-8'
      }
    ),
    readFile(
      join(
        process.cwd(),
        './tests/output.md'
      ),
      {
        encoding: 'utf-8'
      }
    )
  ]) 

  const result = replaceAdmonitions(input)

  assert.equal(result, output)
})
