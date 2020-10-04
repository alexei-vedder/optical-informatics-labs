import {abs, add, atan2, complex, Complex, exp, im, multiply, pi, re, sin} from "mathjs";

/**
 * some constant needed for calculating the core K
 */
export const alpha = 1;

/**
 * some constant needed for calculating the input signal function f(x)
 */
export const beta = 1;

/**
 * left border of the x-range
 */
export const a = -1;

/**
 * right border of the x-range
 */
export const b = 1;

/**
 * number of sub-ranges within the x-range
 */
export const n = 1000;

/**
 * left border of the ksi-range
 */
export const p = -1;

/**
 * right border of the ksi-range
 */
export const q = 1;

/**
 * number of sub-ranges within the ksi-range
 */
export const m = 39;

/**
 * input signal function
 */
export const f: (x: number) => Complex = (x: number) => {
	return exp(complex(0, beta * x));
};

/**
 * core function
 */
export const K: (x: number, ksi: number) => number = (x: number, ksi: number) => {
	if ((x === -1 && ksi === -1) || (x === 1 && ksi === 1)) {
		// because the limit equals 1 in this case
		return 1;
	}
	return sin(pi * alpha * (x - ksi)) / (pi * (x - ksi));
};

/**
 * a sub-range of the x-range
 */
export const hX: number = (b - a) / n;

/**
 * a sub-range of the ksi-range
 */
export const hKsi: number = (q - p) / m;

export const inputAmplitude = (x: number) => {
	return <number><unknown>abs(f(x));
}

export const inputPhase = (x: number) => {
	return atan2(<number>im(f(x)), <number>re(f(x)));
}

export const F = (ksi: number, x: number[]) => {
	let sum: Complex = complex(0, 0);
	for (let k = 0; k <= n - 1; ++k) {
		sum = <Complex>add(sum, multiply(K(ksi, x[k]) * hX, f(x[k])));
	}
	return sum;
}

export const outputAmplitude = (ksi: number, x: number[]) => {
	return <number><unknown>abs(F(ksi, x))
}

export const outputPhase = (ksi: number, x: number[]) => {
	return atan2(<number>im(F(ksi, x)), <number>re(F(ksi, x)));
}