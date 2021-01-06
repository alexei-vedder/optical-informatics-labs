import {rect} from "../math-fns";
import {add, Complex, complex, divide, exp, multiply, pi, sin, square, subtract} from 'mathjs';

export const customPlane = x => rect(x / 4);
export const transformedCustomPlane = u => divide(sin(4 * pi * u), pi * u);
export const customPlane2d = (x, y) => multiply(rect(x / 4), rect(y / 4));

export const transformedCustomPlane2d = (u, v) => {
	const first = (u, v) => exp(<number>multiply(4 * pi * (u - v), complex(0, 1)));
	const second = (u, v) => exp(<number>multiply(4 * pi * (-u - v), complex(0, 1)));
	const third = (u, v) => exp(<number>multiply(4 * pi * (u + v), complex(0, 1)));
	const fourth = (u, v) => exp(<number>multiply(4 * pi * (-u + v), complex(0, 1)));
	return <number | Complex>divide(add(subtract(subtract(first(u, v), second(u, v)), third(u, v)), fourth(u, v)), 4 * pi ** 2 * u * v);
}

const s = 1;
const p = 1;
export const gaussianBeam = x => exp(multiply(-s, square(x)));
export const gaussianBeam2d = (x, y) => exp(<number>add(multiply(-s, square(x)), multiply(-p, square(y))));

export const N = 200;
export const M = 2 ** 10;
export const a = 5;
export const h = 2 * a / (N - 1);
