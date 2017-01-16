// @flow

import type { ArcT } from '../types'

export const arc : Function = (
  x1 : number = 0,
  y1 : number = 0,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  large : number = 0,
  sweep : number = 0,
  x2 : number = x1,
  y2 : number = y1,
) : ArcT => Object.freeze({
  x1,
  y1,
  rx,
  ry,
  phi: phi % (2 * Math.PI),
  large: large === 0 ? 0 : 1,
  sweep: sweep === 0 ? 0 : 1,
  x2,
  y2,
})
