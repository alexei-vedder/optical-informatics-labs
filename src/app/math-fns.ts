export interface TabulatedFunction {
	x: number[];
	y: number[];
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

export function integrateByTrapezia(func: (x: number) => number, from: number, to: number, step: number): number {
	const x: number[] = tabulateRange(from, to, step);
	let solution: number = 0;

	for (let i = 0; i < x.length - 1; ++i) {
		solution += (func(x[i]) + func(x[i + 1])) * (x[i + 1] - x[i]) / 2
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
	const tfunc: TabulatedFunction = {x: [], y: []};
	while (xCurrent <= to + step / 2) {
		tfunc.x.push(xCurrent);
		tfunc.y.push(f(xCurrent));
		xCurrent += step;
	}
	return tfunc;
}
