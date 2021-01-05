import {rect} from "../math-fns";
import {add, divide, exp, multiply, pi, sin, sqrt, square} from 'mathjs';

export const customPlane = x => rect(x / 4);
export const transformedCustomPlane = u => divide(sin(4 * pi * u), pi * u);

const s = 1;
const p = 1;
export const gaussianBeam = x => exp(multiply(-s, square(x)));
export const gaussianBeam2d = (x, y) => exp(<number>add(multiply(-s, square(x)), multiply(-p, square(y))));
export const transformedGaussianBeam2d = (x, y) => divide(exp(<number>divide(add(-square(x), -square(y)), 4)), sqrt(2));

export const N = 50 // 200;
export const M = 2 ** 8 // 2 ** 10;
export const a = 5;
export const h = 2 * a / (N - 1);
