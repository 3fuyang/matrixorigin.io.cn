import type { PostNode } from './types'

/** Preorder traversal for `PostNode`s. */
export function preWalk(root: PostNode, callback: (node: PostNode) => void) {
  callback(root)
  for (const child of root.children) {
    preWalk(child, callback)
  }
}
