// @flow

import type {
  CoordsT,
  RadiiT,
  EndpointParameterizationT,
  CenterParameterizationT,
} from '../../types'

import { endpointToCenter, correctRadii } from '../arc'

export function linear(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
) : Function {
  return function linear(
    t : number,
  ) : CoordsT {
    return {
      x: (x1 * (1 - t))
        + (x2 * t),
      y: (y1 * (1 - t))
        + (y2 * t),
    }
  }
}

export function quadratic(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
  x3 : number = x1,
  y3 : number = y1,
) : Function {
  return function quadratic(
    t : number,
  ) : CoordsT {
    return {
      x: (x1 * ((1 - t) ** 2))
        + (x2 * 2 * (1 - t) * t)
        + (x3 * (t ** 2)),
      y: (y1 * ((1 - t) ** 2))
        + (y2 * 2 * (1 - t) * t)
        + (y3 * (t ** 2)),
    }
  }
}

export function cubic(
  x1 : number,
  y1 : number,
  x2 : number = x1,
  y2 : number = y1,
  x3 : number = x1,
  y3 : number = y1,
  x4 : number = x1,
  y4 : number = y1,
) : Function {
  return function cubic(
    t : number,
  ) : CoordsT {
    return {
      x: (x1 * ((1 - t) ** 3))
        + (x2 * 3 * ((1 - t) ** 2) * t)
        + (x3 * 3 * (1 - t) * (t ** 2))
        + (x4 * (t ** 3)),
      y: (y1 * ((1 - t) ** 3))
        + (y2 * 3 * ((1 - t) ** 2) * t)
        + (y3 * 3 * (1 - t) * (t ** 2))
        + (y4 * (t ** 3)),
    }
  }
}

export function arc(
  x1 : number,
  y1 : number,
  rx : number = 0,
  ry : number = 0,
  phi : number = 0,
  large : 0 | 1 = 0,
  sweep : 0 | 1 = 0,
  x2 : number = x1,
  y2 : number = y1,
) : Function {
  if (rx === 0 || ry === 0) {
    return linear(x1, y1, x2, y2)
  }

  const endpoint : EndpointParameterizationT = {
    x1, y1,
    rx, ry, phi, large, sweep,
    x2, y2,
  }

  const r : RadiiT = correctRadii(endpoint)
  const center : CenterParameterizationT = endpointToCenter(endpoint)

  return function arc(
    t : number,
  ) : CoordsT {
    const theta : number = center.start + (t * (center.end - center.start))

    return {
      x: center.cx
        + (r.rx * Math.cos(theta) * Math.cos(phi))
        - (r.ry * Math.sin(theta) * Math.sin(phi)),
      y: center.cy
        + (r.rx * Math.cos(theta) * Math.sin(phi))
        + (r.ry * Math.sin(theta) * Math.cos(phi)),
    }
  }
}
