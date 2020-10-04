import {exp, i, pi, sin} from "mathjs";

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
export const m = 1000;

/**
 * input signal function
 * short form: f = x => exp(i * this.beta * x);
 * @param x
 */
export const f: (x: number) => number = (x: number) => {
	return exp(i * beta * x);
};

/**
 * core function
 * short form: K = (x, ksi) => sin(pi * this.alpha * (x - ksi)) / (pi * (x - ksi));
 * @param x
 * @param ksi
 */
export const K: (x: number, ksi: number) => number = (x: number, ksi: number) => {
	return sin(pi * alpha * (x - ksi)) / (pi * (x - ksi));
};

/**
 * a sub-range of the x-range
 * hX = (b - a) / n
 */
export const hX: number = .002;

/**
 * a sub-range of the ksi-range
 * hKsi = (p - q) / m
 */
export const hKsi: number = .002;
