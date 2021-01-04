import {abs, add, atan2, complex, Complex, exp, im, multiply, pi, re} from 'mathjs';

export interface TabulatedFunction {
	x: number[] | Complex[];
	y: number[] | Complex[];
}

export function tabulateRange(from: number, to: number, step: number): number[] {
	if (to < from) {
		throw new Error("param 'from' should be less than param 'to'");
	}

	const tabulation: number[] = [];
	for (let xCurrent = from; xCurrent < to; xCurrent += step) {
		tabulation.push(xCurrent);
	}

	tabulation.push(to);
	return tabulation;
}

export function integrateByTrapezia(func: (x: number) => number, from: number, to: number, step: number): number | Complex {
	const x: number[] = tabulateRange(from, to, step);
	let solution: number | Complex = 0;

	for (let i = 0; i < x.length - 1; ++i) {
		const sumPart = multiply(add(func(x[i]), func(x[i + 1])), (x[i + 1] - x[i]) / 2);
		solution = <number | Complex> add(solution, sumPart);
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

export function integrateByNewtonLeibniz(antiderivative: (x: number) => number, from: number, to: number): number {
	return antiderivative(to) - antiderivative(from);
}

export function tabulateFunction(f: (x: number) => number, from: number, to: number, step: number): TabulatedFunction {
	if (to < from) {
		throw new Error("param 'from' should be less than param 'to'");
	}
	let xCurrent = from;
	const tfunc = {x: [], y: []};
	while (xCurrent <= to + step / 2) {
		tfunc.x.push(xCurrent);
		tfunc.y.push(f(xCurrent));
		xCurrent += step;
	}
	return tfunc;
}

export const rect = (x: number) => {
	if (abs(x) > 1 / 2)
		return 0;
	if (abs(x) === 1 / 2)
		return 1 / 2;
	if (abs(x) < 1 / 2)
		return 1;
}

export const fourierIntegralFunction = (f, u) => x => multiply(f(x), exp(<number>multiply(-2 * pi * x * u, complex(0, 1))));

export function amplitudeOf(values: any[]): any[] {
	return values.map(val => abs(val));
}

export function phaseOf(values: any[]): any[] {
	return values.map(val => atan2(<number>im(val), <number>re(val)));
}
