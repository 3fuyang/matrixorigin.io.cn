export const ADMONITIONS_PATTERN = /(!!!(.(?!\n\n|\r\n\r\n))*.)/s

export function matchAdmonitions(src: string) {
  const match = src.match(ADMONITIONS_PATTERN)

  return match?.[1]
}
