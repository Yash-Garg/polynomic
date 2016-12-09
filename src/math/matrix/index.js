// @flow

import type { MatrixT, VectorT } from '../../types'

import { vec } from '../vector'

export function mat(
  m11 : number = 0,
  m12 : number = m11,
  m13 : number = m11,
  m14 : number = m11,
  m21 : number = m11,
  m22 : number = m11,
  m23 : number = m11,
  m24 : number = m11,
  m31 : number = m11,
  m32 : number = m11,
  m33 : number = m11,
  m34 : number = m11,
  m41 : number = m11,
  m42 : number = m11,
  m43 : number = m11,
  m44 : number = m11,
) : MatrixT {
  return [
    m11, m21, m31, m41,
    m12, m22, m32, m42,
    m13, m23, m33, m43,
    m14, m24, m34, m44,
  ]
}

export function identity() : MatrixT {
  return mat(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  )
}

export function det(
  m : MatrixT,
) : number {
  return (m[0] * m[5] * m[10] * m[15])
    + (m[0] * m[6] * m[11] * m[13])
    + (m[0] * m[7] * m[9] * m[14])

    + (m[1] * m[4] * m[11] * m[14])
    + (m[1] * m[6] * m[8] * m[15])
    + (m[1] * m[7] * m[10] * m[12])

    + (m[2] * m[4] * m[9] * m[15])
    + (m[2] * m[5] * m[11] * m[12])
    + (m[2] * m[7] * m[8] * m[13])

    + (m[3] * m[4] * m[10] * m[13])
    + (m[3] * m[5] * m[8] * m[14])
    + (m[3] * m[6] * m[9] * m[12])

    - (m[0] * m[5] * m[11] * m[14])
    - (m[0] * m[6] * m[9] * m[15])
    - (m[0] * m[7] * m[10] * m[13])

    - (m[1] * m[4] * m[10] * m[15])
    - (m[1] * m[6] * m[11] * m[12])
    - (m[1] * m[7] * m[8] * m[14])

    - (m[2] * m[4] * m[11] * m[13])
    - (m[2] * m[5] * m[8] * m[15])
    - (m[2] * m[7] * m[9] * m[12])

    - (m[3] * m[4] * m[9] * m[14])
    - (m[3] * m[5] * m[10] * m[12])
    - (m[3] * m[6] * m[8] * m[13])
}

export function inverse(
  m : MatrixT,
) : MatrixT {
  const d : number = det(m)

  if (d === 0) {
    return identity()
  }

  return mat(
    ((m[5] * m[10] * m[15])
    + (m[6] * m[11] * m[13])
    + (m[7] * m[9] * m[14])
    - (m[5] * m[11] * m[14])
    - (m[6] * m[9] * m[15])
    - (m[7] * m[10] * m[13])) / d,
    ((m[4] * m[11] * m[14])
    + (m[6] * m[8] * m[15])
    + (m[7] * m[10] * m[12])
    - (m[4] * m[10] * m[15])
    - (m[6] * m[11] * m[12])
    - (m[7] * m[8] * m[14])) / d,
    ((m[4] * m[9] * m[15])
    + (m[5] * m[11] * m[12])
    + (m[7] * m[8] * m[13])
    - (m[4] * m[11] * m[13])
    - (m[5] * m[8] * m[15])
    - (m[7] * m[9] * m[12])) / d,
    ((m[4] * m[10] * m[13])
    + (m[5] * m[8] * m[14])
    + (m[6] * m[9] * m[12])
    - (m[4] * m[9] * m[14])
    - (m[5] * m[10] * m[12])
    - (m[6] * m[8] * m[13])) / d,

    ((m[1] * m[11] * m[14])
    + (m[2] * m[9] * m[15])
    + (m[3] * m[10] * m[13])
    - (m[1] * m[10] * m[15])
    - (m[2] * m[11] * m[13])
    - (m[3] * m[9] * m[14])) / d,
    ((m[0] * m[10] * m[15])
    + (m[2] * m[11] * m[12])
    + (m[3] * m[8] * m[14])
    - (m[0] * m[11] * m[14])
    - (m[2] * m[8] * m[15])
    - (m[3] * m[10] * m[12])) / d,
    ((m[0] * m[11] * m[13])
    + (m[1] * m[8] * m[15])
    + (m[3] * m[9] * m[12])
    - (m[0] * m[9] * m[15])
    - (m[1] * m[11] * m[12])
    - (m[3] * m[8] * m[13])) / d,
    ((m[0] * m[9] * m[14])
    + (m[1] * m[10] * m[12])
    + (m[2] * m[8] * m[13])
    - (m[0] * m[10] * m[13])
    - (m[1] * m[8] * m[14])
    - (m[2] * m[9] * m[12])) / d,

    ((m[1] * m[6] * m[15])
    + (m[2] * m[7] * m[13])
    + (m[3] * m[5] * m[14])
    - (m[1] * m[7] * m[14])
    - (m[2] * m[5] * m[15])
    - (m[3] * m[6] * m[13])) / d,
    ((m[0] * m[7] * m[14])
    + (m[2] * m[4] * m[15])
    + (m[3] * m[6] * m[12])
    - (m[0] * m[6] * m[15])
    - (m[2] * m[7] * m[12])
    - (m[3] * m[4] * m[14])) / d,
    ((m[0] * m[5] * m[15])
    + (m[1] * m[7] * m[12])
    + (m[3] * m[4] * m[13])
    - (m[0] * m[7] * m[13])
    - (m[1] * m[4] * m[15])
    - (m[3] * m[5] * m[12])) / d,
    ((m[0] * m[6] * m[13])
    + (m[1] * m[4] * m[14])
    + (m[2] * m[5] * m[12])
    - (m[0] * m[5] * m[14])
    - (m[1] * m[6] * m[12])
    - (m[2] * m[4] * m[13])) / d,

    ((m[1] * m[7] * m[10])
    + (m[2] * m[5] * m[11])
    + (m[3] * m[6] * m[9])
    - (m[1] * m[6] * m[11])
    - (m[2] * m[7] * m[9])
    - (m[3] * m[5] * m[10])) / d,
    ((m[0] * m[6] * m[11])
    + (m[2] * m[7] * m[8])
    + (m[3] * m[4] * m[10])
    - (m[0] * m[7] * m[10])
    - (m[2] * m[4] * m[11])
    - (m[3] * m[6] * m[8])) / d,
    ((m[0] * m[7] * m[9])
    + (m[1] * m[4] * m[11])
    + (m[3] * m[5] * m[8])
    - (m[0] * m[5] * m[11])
    - (m[1] * m[7] * m[8])
    - (m[3] * m[4] * m[9])) / d,
    ((m[0] * m[5] * m[10])
    + (m[1] * m[6] * m[8])
    + (m[2] * m[4] * m[9])
    - (m[0] * m[6] * m[9])
    - (m[1] * m[4] * m[10])
    - (m[2] * m[5] * m[8])) / d,
  )
}

export function multiply(
  a : MatrixT,
  b : MatrixT,
) : MatrixT {
  return mat(
    (a[0] * b[0]) + (a[1] * b[4]) + (a[2] * b[8]) + (a[3] * b[12]),
    (a[4] * b[0]) + (a[5] * b[4]) + (a[6] * b[8]) + (a[7] * b[12]),
    (a[8] * b[0]) + (a[9] * b[4]) + (a[10] * b[8]) + (a[11] * b[12]),
    (a[12] * b[0]) + (a[13] * b[4]) + (a[14] * b[8]) + (a[15] * b[12]),

    (a[0] * b[1]) + (a[1] * b[5]) + (a[2] * b[9]) + (a[3] * b[13]),
    (a[4] * b[1]) + (a[5] * b[5]) + (a[6] * b[9]) + (a[7] * b[13]),
    (a[8] * b[1]) + (a[9] * b[5]) + (a[10] * b[9]) + (a[11] * b[13]),
    (a[12] * b[1]) + (a[13] * b[5]) + (a[14] * b[9]) + (a[15] * b[13]),

    (a[0] * b[2]) + (a[1] * b[6]) + (a[2] * b[10]) + (a[3] * b[14]),
    (a[4] * b[2]) + (a[5] * b[6]) + (a[6] * b[10]) + (a[7] * b[14]),
    (a[8] * b[2]) + (a[9] * b[6]) + (a[10] * b[10]) + (a[11] * b[14]),
    (a[12] * b[2]) + (a[13] * b[6]) + (a[14] * b[10]) + (a[15] * b[14]),

    (a[0] * b[3]) + (a[1] * b[7]) + (a[2] * b[11]) + (a[3] * b[15]),
    (a[4] * b[3]) + (a[5] * b[7]) + (a[6] * b[11]) + (a[7] * b[15]),
    (a[8] * b[3]) + (a[9] * b[7]) + (a[10] * b[11]) + (a[11] * b[15]),
    (a[12] * b[3]) + (a[13] * b[7]) + (a[14] * b[11]) + (a[15] * b[15]),
  )
}

export function multiplyVec(
  a : MatrixT,
  b : VectorT,
) : VectorT {
  return vec(
    (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]),
    (a[4] * b[0]) + (a[5] * b[1]) + (a[6] * b[2]) + (a[7] * b[3]),
    (a[8] * b[0]) + (a[9] * b[1]) + (a[10] * b[2]) + (a[11] * b[3]),
    (a[12] * b[0]) + (a[13] * b[1]) + (a[14] * b[2]) + (a[15] * b[3]),
  )
}
