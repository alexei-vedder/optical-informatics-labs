import {abs, add, atan2, complex, Complex, exp, im, multiply, pi, re, subtract} from 'mathjs';

export interface TabulatedFunction {
	x: number[] | Complex[];
	y: number[] | Complex[];
}

export interface Tabulated2dFunction {
	x: number[] | Complex[];
	y: number[] | Complex[];
	z: (number | Complex)[][];
}

export function tabulateRange(from: number, to: number, step: number): number[] {
	if (to < from) {
		throw new Error("param 'from' should be less than param 'to'");
	}
	const tabulation: number[] = [];
	let xCurrent = from;
	while (xCurrent <= to + step / 2) {
		tabulation.push(xCurrent);
		xCurrent += step;
	}
	return tabulation;
}

export function integrateByTrapezia(func: (x: number) => number, from: number, to: number, step: number): number | Complex {
	const x: number[] = tabulateRange(from, to, step);
	let solution: number | Complex = 0;

	for (let i = 0; i < x.length - 1; ++i) {
		const sumPart = multiply(add(func(x[i]), func(x[i + 1])), (x[i + 1] - x[i]) / 2);
		solution = <number | Complex>add(solution, sumPart);
	}

	return solution;
}

export function integrateBySimpson(func: (x: number) => number, from: number, to: number, step: number): number {
	const x: number[] = tabulateRange(from, to, step);
	const n: number = x.length - 1;
	let series1: number = 0;

	for (let j = 2; j <= n - 1; j += 2) {
		series1 += func(x[j]);
	}

	let series2: number = 0;

	for (let j = 1; j < n; j += 2) {
		series2 += func(x[j]);
	}

	return (step / 3) * (func(x[0]) + 2 * series1 + 4 * series2 + func(x[n]));
}

export function integrateByNewtonLeibniz(antiderivative: (x) => number | Complex, from: number, to: number): number | Complex {
	return <number | Complex>subtract(antiderivative(to), antiderivative(from));
}

export function tabulateFunction(f: (x) => number | Complex, from: number, to: number, step: number): TabulatedFunction {
	const tf = {
		x: tabulateRange(from, to, step),
		y: []
	};
	tf.x.forEach(x => tf.y.push(f(x)));
	return tf;
}

export function tabulate2dFunction(f: (x, y) => number | Complex, from: [number, number], to: [number, number], step: number): Tabulated2dFunction {
	if (to[0] < from[0] || to[1] < from[1]) {
		throw new Error("param 'from' should be less than param 'to'");
	}
	let yCurrent = from[1];
	const tf2d = {x: [], y: [], z: []};
	while (yCurrent <= to[1] + step / 2) {
		const tf = tabulateFunction(x => f(x, yCurrent), from[0], to[0], step);
		tf2d.x = tf.x;
		tf2d.y.push(yCurrent);
		tf2d.z.push(tf.y);
		yCurrent += step;
	}
	return tf2d;
}

export const rect = (x: number) => {
	if (abs(x) > 1 / 2)
		return 0;
	if (abs(x) === 1 / 2)
		return 1 / 2;
	if (abs(x) < 1 / 2)
		return 1;
}

export const amplitude = f => x => <number>abs(f(x));

export const phase = f => x => atan2(<number>im(f(x)), <number>re(f(x)));

export const amplitude2d = f => (x, y) => <number>abs(f(x, y));

export const phase2d = f => (x, y) => atan2(<number>im(f(x, y)), <number>re(f(x, y)));

export const fourierIntegralFunction = (f, u) => x => multiply(f(x), exp(<number>multiply(-2 * pi * x * u, complex(0, 1))));

export function amplitudeOfTabulatedValues(values: any[]): any[] {
	return values.map(val => abs(val));
}

export function phaseOfTabulatedValues(values: any[]): any[] {
	return values.map(val => atan2(<number>im(val), <number>re(val)));
}

export function amplitudeOfTabulated2dValues(values: any[][]): any[][] {
	return values.map(vector => vector.map(val => abs(val)));
}

export function phaseOfTabulated2dValues(values: any[][]): any[][] {
	return values.map(vector => vector.map(val => atan2(<number>im(val), <number>re(val))));
}
