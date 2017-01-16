import { join } from './index'
import { parse } from '../parse'
import { M, z } from '../points'
import { isM, isZ } from '../is'

test('should join the paths', () => {
  const p1 = parse('M0 0L100 0')
  const p2 = parse('L100 100L100 200')
  const p3 = parse('M200 200h50v50')

  const test = join(
    () => [],
    [p1, p2, p3],
  )
  const expected = 'M0 0L100 0 L100 100L100 200 M200 200h50v50'

  expect(test).toEqualPath(expected)
})

test('should join the paths and close them', () => {
  const p1 = parse('M0 0L100 0')
  const p2 = parse('L100 100L100 200')
  const p3 = parse('M200 200h50v50')

  const test = join(
    (prevPath, nextPath) => {
      const firstPoint = prevPath[0]
      const prevPoint = prevPath[prevPath.length - 1]
      const nextPoint = nextPath[0]

      return [
        ...!isZ(prevPoint) && [z(firstPoint)],
        ...!isM(nextPoint) && [M(nextPoint.x, nextPoint.y)],
      ]
    },
    [p1, p2, p3],
  )
  const expected = 'M0 0L100 0z M100 100L100 100L100 200z M200 200h50v50'

  expect(test).toEqualPath(expected)
})
