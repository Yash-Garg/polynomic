import { path } from '../path'
import { M, m, l, Q, t, C, s, z } from '../points'
import { parse, parseSegments } from './index'

test('should parse the code and return a path', () => {
  const test = parse('M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z')
  const expected = path(
    M(0, 0),
    l(50, 50),
    l(20, -20),
    Q(30, 30, 60, 60),
    t(20, 20),
    C(80, 80, 60, 60, 5, 5),
    s(-5, 6, 2, 2),
    z(),
    m(50, 50),
    z(),
  )

  expect(test).toEqual(expected)
})

test('should parse the invalid code and return an empty path', () => {
  const test = parse('___:(___')
  const expected = path()

  expect(test).toEqual(expected)
})

test('should parse the code and return an array of segments', () => {
  const test = parseSegments('M0 0h+2.01e-14l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z')
  const expected = [
    ['M', 0, 0],
    ['h', 2.01e-14],
    ['l', 50, 50, 20, -20],
    ['Q', 30, 30, 60, 60],
    ['t', 20, 20],
    ['C', 80, 80, 60, 60, 5, 5],
    ['s', -5, 6, 2, 2],
    ['z'],
    ['m', 50, 50],
    ['z'],
  ]

  expect(test).toEqual(expected)
})