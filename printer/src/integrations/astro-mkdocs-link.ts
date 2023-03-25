import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { AstroIntegration } from 'astro'
import type { Root as MdastRoot } from 'mdast'
import type {
  Plugin as UnifiedPlugin,
  Transformer as UnifiedTransformer,
} from 'unified'
import { visit } from 'unist-util-visit'

import { extractMainTitle } from '../shared'

function remarkMKDocsLink(): UnifiedPlugin<[], MdastRoot> {
  const transformer: UnifiedTransformer<MdastRoot> = async (tree, file) => {
    const linkTasks: Promise<void>[] = []
    // Walk the tree
    visit(tree, (node) => {
      if (node.type === 'link') {
        // Link url
        const url = node.url
        // Bypass hyper links.
        if (/^https?:\/\//.test(url)) {
          return
        }
        // Bypass non-file links.
        if (!/.mdx?$/.test(url)) {
          return
        }
        // Absolute dirname
        const dir = file.dirname
        // Link target file path
        const path = join(dir, `${url}x`)
        linkTasks.push(
          readFile(path, 'utf8').then((src) => {
            const title = extractMainTitle(src)
            node.url = `#${title}`
          })
        )
      }
    })
    await Promise.all(linkTasks)
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
