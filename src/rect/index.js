// @flow

import type { RectT } from '../types'

export const rect : Function = (
  x : number = 0,
  y : number = 0,
  width : number = 0,
  height : number = width,
  rx : number = 0,
  ry : number = rx,
) : RectT => Object.freeze({
  x,
  y,
  width,
  height,
  ...rx !== 0 ? { rx } : {},
  ...ry !== 0 ? { ry } : {},
})
