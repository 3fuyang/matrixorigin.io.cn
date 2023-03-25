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
        const url = node.url
        if (/^https?:\/\//.test(url)) {
          return
        }
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
