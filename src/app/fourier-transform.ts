import {add, complex, Complex, divide, multiply, subtract} from "mathjs";
import {Tabulated2dFunction, tabulateRange} from "./math-fns";


/**
 * Return the number of bits used in the binary representation of the number.
 */
function bitLength(number: number): number {
	let bitsCounter = 0;
	while ((1 << bitsCounter) <= number) {
		bitsCounter += 1;
	}
	return bitsCounter;
}

/**
 * Returns the number which is the flipped binary representation of input.
 */
function reverseBits(input: number, bitsCount: number): number {
	let reversedBits = 0;
	for (let bitIndex = 0; bitIndex < bitsCount; bitIndex += 1) {
		reversedBits *= 2;
		if (Math.floor(input / (1 << bitIndex)) % 2 === 1) {
			reversedBits += 1;
		}
	}
	return reversedBits;
}

/**
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/fourier-transform
 * Returns the radix-2 fast fourier transform of the given array.
 * Optionally computes the radix-2 inverse fast fourier transform.
 */
export function fastFourierTransform(inputData: Complex[], inverse: boolean = false): Complex[] {
	const bitsCount = bitLength(inputData.length - 1);
	const N = 1 << bitsCount;

	while (inputData.length < N) {
		inputData.push(complex());
	}

	const output: Complex[] = [];
	for (let dataSampleIndex = 0; dataSampleIndex < N; dataSampleIndex += 1) {
		output[dataSampleIndex] = inputData[reverseBits(dataSampleIndex, bitsCount)];
	}

	for (let blockLength = 2; blockLength <= N; blockLength *= 2) {
		const imaginarySign = inverse ? -1 : 1;
		const phaseStep = complex(
			Math.cos((2 * Math.PI) / blockLength),
			imaginarySign * Math.sin((2 * Math.PI) / blockLength)
		);

		for (let blockStart = 0; blockStart < N; blockStart += blockLength) {
			let phase = complex(1, 0);

			for (let signalId = blockStart; signalId < (blockStart + blockLength / 2); signalId += 1) {
				const component = <Complex>multiply(output[signalId + blockLength / 2], phase);

				const upd1 = <Complex>add(output[signalId], component);
				const upd2 = <Complex>subtract(output[signalId], component);

				output[signalId] = upd1;
				output[signalId + blockLength / 2] = upd2;

				phase = <Complex>multiply(phase, phaseStep);
			}
		}
	}

	if (inverse) {
		for (let signalId = 0; signalId < N; signalId += 1) {
			output[signalId] = <Complex>divide(output[signalId], N);
		}
	}

	return output;
}

function addZeros(values, M) {
	const zeros = new Array(Math.floor((M - values.length) / 2)).fill(0);
	return [...zeros, ...values, ...zeros]
}

function swapHalfs(values) {
	return [...values.slice(values.length / 2), ...values.slice(0, values.length / 2)]
}

export function opticalFourierTransform(tf, M) {
	const N = tf.y.length;
	const a = tf.x[tf.x.length - 1];
	const h = 2 * a / (N - 1);
	const b = N ** 2 / (4 * a * M);

	let f = tf.y.map(val => complex(val));
	f = addZeros(f, M);
	f = swapHalfs(f);

	let F: Complex[] = fastFourierTransform(f);
	F = swapHalfs(F);
	F = F.slice(Math.floor((M - N) / 2), Math.ceil(M - (M - N) / 2))
		.map(val => <Complex>multiply(val, h));

	return {
		x: tabulateRange(-b, b, (2 * b) / (F.length - 1)),
		y: F
	}
}

export function opticalFourierTransform2d(tf2d, M): Tabulated2dFunction {

	let resultTf2d = {
		x: [],
		y: tf2d.y,
		z: []
	}

	for (let i = 0; i < tf2d.y.length; ++i) {
		const transformed = opticalFourierTransform({x: tf2d.x, y: tf2d.z[i]}, M);
		resultTf2d.x = transformed.x;
		resultTf2d.z[i] = transformed.y;
	}

	for (let j = 0; j < resultTf2d.x.length; ++j) {
		const input = {x: tf2d.y, y: resultTf2d.z.map(vector => vector[j])};
		const transformed = opticalFourierTransform(input, M);

		resultTf2d.y = transformed.x;

		transformed.y.forEach((value, index) => {
			resultTf2d.z[index][j] = value;
		});
	}

	return resultTf2d;
}
