import matrix from "lib/transforms/matrix"
import translate from "lib/transforms/translate"
import { absoluteCoords } from "lib/utils"

export default function matrixOrigin(path, m, x = 0, y = 0) {
  const coords = absoluteCoords(path, x, y)

  if (coords.x !== 0 || coords.y !== 0) {
    path = translate(path, -coords.x, -coords.y)
    path = matrix(path, m)
    path = translate(path, coords.x, coords.y)
  } else {
    path = matrix(path, m)
  }

  return path
}