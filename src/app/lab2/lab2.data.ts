import {rect} from "../math-fns";
import {abs, atan2, divide, exp, im, multiply, pi, re, sin, square} from 'mathjs';

export const customPlane = x => rect(x / 4);
export const transformedCustomPlane = u => divide(sin(4 * pi * u), pi * u);

export const N = 150;
export const M = 2 ** 9;
export const a = 5;
export const h = 2 * a / (N - 1);
const s = 1;

export const gaussianBeam = x => exp(multiply(-s, square(x)));

export const amplitude = f => x => <number>abs(f(x));
export const phase = f => x => atan2(<number>im(f(x)), <number>re(f(x)));
