import {TabulatedFunction} from "./math-fns";

export function convertTabulatedFunctionToPoints(tf: TabulatedFunction): [number, number][] {
	const points: [number, number][] = [];
	for (let i = 0; i < Math.min(tf.x.length, tf.y.length); ++i) {
		// @ts-ignore
		points.push([tf.x[i], tf.y[i]]);
	}
	return points;
}

/**
 * @param args: an array of a tabulated range of the variable which is needed to be manipulated via a slider
 */
export function generateSliderSteps(args: number[]): any[] {
	return args.map(value => {
		return {
			label: value.toString(),
			args: [[value.toString()]],
			method: "animate"
		}
	})
}

/**
 * @param args: an array of a tabulated range of the variable which is needed to be manipulated via a slider
 * @param func: a function which returns values of the given args.
 * 	func example: const wrapperFunc = alpha => return this.x.map(xk => func(xk, alpha))
 */
export function generate2dFrames(args: number[], func: (arg: number) => number[]): any[] {
	return args.map(arg => {
		return {
			name: arg.toString(),
			data: [{
				y: func(arg)
			}]
		}
	});
}

export function radianToDegree(radian: number): number {
	return radian * (180 / Math.PI);
}
