import {
  transform,
  transformPath,
  applyMatrix,
} from './index'

import { translate } from './translate'
import { scale } from './scale'
import { parse } from '../pathstring/parse'
import { isEqual } from '../path/is-equal'

test('should return a function and apply the transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translate(100, 100))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the matrix on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')
  const matrix = [
    1, 0, 0, 100,
    0, 1, 0, 100,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  const test = applyMatrix(path, matrix)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform with a modified origin', () => {
  const path = parse('M0 0h100v100h-100z')
  const matrix = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  const test = transformPath(path, matrix, { transformOrigin: { x: 50, y: 50 }})
  const expected = 'M-50-50h200v200h-200z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform with a modified relative origin', () => {
  const path = parse('M0 0h100v100h-100z')
  const matrix = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  const test = transformPath(path, matrix, { transformOrigin: { x: 50, y: 50 }})
  const expected = 'M-50-50h200v200h-200z'

  expect(isEqual(test, expected)).toBe(true)
})
