// @flow

import type { MatrixT } from '../types'

import { curry } from 'lodash'
import { mat, multiply } from '../core/matrix'

export const matrix3d : Function = curry(function matrix3d(
  m11 : number,
  m12 : number,
  m13 : number,
  m14 : number,
  m21 : number,
  m22 : number,
  m23 : number,
  m24 : number,
  m31 : number,
  m32 : number,
  m33 : number,
  m34 : number,
  m41 : number,
  m42 : number,
  m43 : number,
  m44 : number,
  matrix : MatrixT,
) : MatrixT {
  const matrixMatrix : MatrixT = mat(
    m11, m12, m13, m14,
    m21, m22, m23, m24,
    m31, m32, m33, m34,
    m41, m42, m43, m44,
  )

  return multiply(matrix, matrixMatrix)
})

export const matrix : Function = curry(function matrix(
  a : number,
  b : number,
  c : number,
  d : number,
  e : number,
  f : number,
  matrix : MatrixT,
) : MatrixT {
  return matrix3d(
    a, b, 0, 0,
    c, d, 0, 0,
    0, 0, 1, 0,
    e, f, 0, 1,
    matrix,
  )
})