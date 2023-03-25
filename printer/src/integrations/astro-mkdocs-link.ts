import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { AstroIntegration } from 'astro'
import type { Root as MdastRoot } from 'mdast'
import type {
  Plugin as UnifiedPlugin,
  Transformer as UnifiedTransformer,
} from 'unified'
import { visit } from 'unist-util-visit'

function remarkMKDocsLink(): UnifiedPlugin<[], MdastRoot> {
  const transformer: UnifiedTransformer<MdastRoot> = (tree, file) => {
    // Walk the tree
    visit(tree, (node, index, parent) => {
      if (node.type === 'link') {
        // Link url
        const url = node.url
        if (/^https?:\/\//.test(url)) {
          return
        }
        // Absolute dirname
        const dir = file.dirname
        // Link target file path
        const path = join(dir, url)
        readFile(path, 'utf8').then((src) => {
          const title = src.match(/# (?<title>.*)(\n|\r\n)/)?.[1]
          console.log(title)
        })
      }
    })
  }

  return () => transformer
}

export function astroMKDocsLink(): AstroIntegration {
  return {
    name: '@astrojs/mkdocs-link',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkMKDocsLink()],
          },
        })
      },
    },
  }
}
