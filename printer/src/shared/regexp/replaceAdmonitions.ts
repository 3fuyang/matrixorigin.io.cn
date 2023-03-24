const ADMONITIONS_PATTERN = /!!!((.(?!\n\n|\r\n\r\n))*.)/sg
const META_PATTERN = /^\s*([^\s]+)/

/**
 * Replace MKDocs style admonitions with
 * the [generic directives proposal](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) style.
 * @param src Markdown content.
 */
export function replaceAdmonitions(src: string) {
  return src.replace(ADMONITIONS_PATTERN, (_, p1: string) => {
    let src = p1

    const type = src.match(META_PATTERN)?.[1]
    type && (src = src.replace(META_PATTERN, ''))

    const title = src.match(META_PATTERN)?.[1]
    title && (src = src.replace(META_PATTERN, ''))

    return `:::${type}[${title}]${src}\n:::`
  })
}
