import {rect} from "../math-fns";
import {abs, atan2, exp, im, multiply, re, square} from 'mathjs';

export const func = x => rect(x / 4);

export const N = 150;
export const M = 2 ** 9;
export const a = 5;
export const h = 2 * a / (N - 1);
const s = 1;

export const gaussianBeam = x => exp(multiply(-s, square(x)));

export const amplitude = f => x => <number>abs(f(x));
export const phase = f => x => atan2(<number>im(f(x)), <number>re(f(x)));
