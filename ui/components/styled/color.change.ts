/* eslint-disable */
/**
 * @link https://css-tricks.com/snippets/javascript/lighten-darken-color/
 *
 * @author Chris Coyier
 */
function LightenDarkenColor(col, amt): string {
  let usePound = false

  if (col[0] == '#') {
    col = col.slice(1)
    usePound = true
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const transparentize = (col: string, amt: number): string => {
  if (col[0] == '#') {
    col = col.slice(1)
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return `rgba(${r}, ${b}, ${g}, ${1 - amt / 100})`
}

export const lighten = (color: string, amount: number): string => LightenDarkenColor(color, amount)
export const darken = (color: string, amount: number): string => LightenDarkenColor(color, -amount)
