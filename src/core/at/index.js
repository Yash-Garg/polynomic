// @flow

import type { PointT } from '../../types'

import {
  linear,
  quadratic,
  cubic,
  elliptic,
} from '../parametric'

import { arc } from '../../arc'
import { isL, isH, isV, isQ, isT, isC, isS, isA } from '../../is'
import { degToRad } from '../angle'

export function pointAt(
  previous : PointT,
  current : PointT,
) : Function {
  switch (true) {
  case isL(current):
  case isH(current):
  case isV(current):
    return linearPointAt(previous, current)

  case isQ(current):
  case isT(current):
    return quadraticPointAt(previous, current)

  case isC(current):
  case isS(current):
    return cubicPointAt(previous, current)

  case isA(current):
    return arcPointAt(previous, current)

  default:
    return () => null
  }
}

function linearPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  return linear(
    previous.x,
    previous.y,
    current.x,
    current.y,
  )
}

function quadraticPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  return quadratic(
    previous.x,
    previous.y,
    current.parameters.x1,
    current.parameters.y1,
    current.x,
    current.y,
  )
}

function cubicPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  return cubic(
    previous.x,
    previous.y,
    current.parameters.x1,
    current.parameters.y1,
    current.parameters.x2,
    current.parameters.y2,
    current.x,
    current.y,
  )
}

function arcPointAt(
  previous : PointT,
  current : PointT,
) : Function {
  return elliptic(arc(
    previous.x,
    previous.y,
    current.parameters.rx,
    current.parameters.ry,
    degToRad(current.parameters.rotation),
    current.parameters.large,
    current.parameters.sweep,
    current.x,
    current.y,
  ))
}