import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { assert, test } from 'vitest'

import { matchAdmonitions } from '../src/shared'

test('Should match MKDocs style admonitions', async () => {
  const src = await readFile(
    join(
      process.cwd(),
      './tests/contribute-documentation.md'
    ),
    {
      encoding: 'utf-8'
    }
  )

  const match = matchAdmonitions(src)

  console.dir(match)

  assert.equal(match, `!!! info 注意\r\n    若您在中英文两个仓库都做了修改，那么以上大部分操作都需要分别针对中英文两个仓库都执行一遍。  `)
})
