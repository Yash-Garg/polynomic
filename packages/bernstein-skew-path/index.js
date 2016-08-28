import matrixOrigin from "bernstein-matrix-origin-path"

export default function skew(path, thetaX, thetaY, ...origin) {
  return matrixOrigin(path, [
    1, Math.tan(thetaX), 0,
    Math.tan(thetaY), 1, 0,
    0, 0, 1,
  ], ...origin)
}
