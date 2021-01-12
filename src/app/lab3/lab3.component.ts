import {Component, OnInit} from '@angular/core';
import {
	abs,
	add,
	atan2,
	combinations,
	Complex,
	cos,
	divide,
	exp,
	factorial,
	i,
	multiply,
	pi,
	pow,
	round,
	sin,
	sqrt,
	square
} from "mathjs";
import Plotly from 'plotly.js-dist';
import {
	amplitudeOfTabulated2dValues,
	amplitudeOfTabulatedValues,
	integrateByTrapezia,
	phaseOfTabulated2dValues,
	phaseOfTabulatedValues,
	tabulateFunction,
	tabulateRange
} from "../math-fns";
import {opticalFourierTransform2d} from "../fourier-transform";

function getValuesOfPolarFn(f: (r: number) => number | Complex): (number | Complex)[][] {
	const range = tabulateRange(0, R, h);
	const values = [];
	const N = range.length;
	for (let j = 0; j < 2 * N; ++j) {
		values.push([]);
		for (let k = 0; k < 2 * N; ++k) {
			const r = sqrt(square(j - N) + square(k - N)) * h;
			const alpha = round(r / h);
			values[j][k] = alpha < N ? multiply(f(r), exp(multiply(i, m * atan2(k - N, j - N)))) : 0;
		}
	}
	return values;
}

export const m = -3;
export const n = 2;
export const R = 5;
export const N = 200;
export const M = 4096;
export const h = R / N;

export const generalizedLaguerrePolynomial = (r, n, p) => {
	let sum: number | Complex = 0;
	for (let j = 0; j <= n; ++j) {
		sum = <number | Complex>add(sum, multiply(pow(-1, j), multiply(combinations<number>(n + p, n - j), divide(pow(r, j), factorial(j)))));
	}
	return sum;
};

export const customLaguerreGaussianMode1D = r => <number | Complex>multiply(multiply(exp(-square(r)), pow(r, abs(m))), generalizedLaguerrePolynomial(square(r), n, abs(m)));

export const besselIntegral = n => {
	const a = 1 / pi;
	return x => <number | Complex>multiply(a, integrateByTrapezia(tau => cos(n * tau - x * sin(tau)), 0, pi, h));
}

export const customBesselIntegral = besselIntegral(m);

export const getHankeledCustomLaguerreGaussianMode = () => {
	const a = divide(2 * pi, pow(i, m));
	return rho => {
		const b = multiply(2 * pi, rho);
		return <number | Complex>multiply(a, integrateByTrapezia(r => <number | Complex>multiply(customLaguerreGaussianMode1D(r), customBesselIntegral(multiply(b, r))), 0, R, 2 * h));
	}
}


@Component({
	selector: 'lab3',
	template: `
		<mat-tab-group [(selectedIndex)]="selectedTabIndex" mat-align-tabs="center">
			<mat-tab label="Input Function">
				<div class="container">
					<div id="input-amplitude-plot-3" class="plot-container"></div>
					<div id="input-phase-plot-3" class="plot-container"></div>

					<div id="input-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="input-2d-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="Hankel Transformed Function">
				<div class="container">
					<div id="hankel-amplitude-plot-3" class="plot-container"></div>
					<div id="hankel-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="2D Hankel Transformed Function">
				<div class="container">
					<div id="hankel-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="hankel-2d-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="2D Fourier Transformed Function">
				<div class="container">
					<div id="fourier-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="fourier-2d-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="Bessel Integral">
				<div class="container">
					<div id="bessel-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
		</mat-tab-group>
	`,
	styles: []
})
export class Lab3Component implements OnInit {

	private hankeledCustomLaguerreGaussianMode;

	private _selectedTabIndex: number;

	get selectedTabIndex(): number {
		return this._selectedTabIndex;
	}

	set selectedTabIndex(value: number) {
		this._selectedTabIndex = value;
		switch (value) {
			case 0: {
				setTimeout(() => {
					this.drawInputFn();
				});
				break;
			}
			case 1: {
				setTimeout(() => {
					this.drawHankelTransform();
				});
				break;
			}
			case 2: {
				setTimeout(() => {
					this.draw2dHankelTransform();
				});
				break;
			}
			case 3: {
				setTimeout(() => {
					this.draw2dFourierTransform();
				});
				break;
			}
			case 4: {
				setTimeout(() => {
					this.drawBesselIntegral();
				});
				break;
			}
		}
	}

	ngOnInit(): void {
		this.selectedTabIndex = 0;
		this.hankeledCustomLaguerreGaussianMode = getHankeledCustomLaguerreGaussianMode();
	}

	drawInputFn() {
		const tInputFn = tabulateFunction(customLaguerreGaussianMode1D, 0, R, h);

		Plotly.newPlot("input-amplitude-plot-3", {
			data: [{
				x: tInputFn.x,
				y: amplitudeOfTabulatedValues(tInputFn.y),
				mode: 'lines',
				type: 'scatter',
				line: {
					color: "#55a919"
				}
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [0, R]
				},
				yaxis: {
					title: "abs(f(x))",
				},
				title: "Laguerre Gaussian Mode Amplitude"
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("input-phase-plot-3", {
			data: [{
				x: tInputFn.x,
				y: phaseOfTabulatedValues(tInputFn.y),
				mode: 'lines',
				type: 'scatter',
				line: {
					color: "#4657ee"
				}
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [0, R]
				},
				yaxis: {
					title: "atan2(im(f(x)), re(f(x)))",
				},
				title: "Laguerre Gaussian Mode Phase"
			},
			config: {
				scrollZoom: true
			}
		});

		const laguerreGaussianModeValues = getValuesOfPolarFn(customLaguerreGaussianMode1D);

		Plotly.newPlot("input-2d-amplitude-plot-3", {
			data: [{
				z: amplitudeOfTabulated2dValues(laguerreGaussianModeValues),
				type: "contour",
				colorscale: "Jet",
			}],
			layout: {
				title: "2D Laguerre Gaussian Mode Amplitude",
				xaxis: {
					visible: false,
				},
				yaxis: {
					visible: false,
					scaleanchor: "x"
				},
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("input-2d-phase-plot-3", {
			data: [{
				z: phaseOfTabulated2dValues(laguerreGaussianModeValues),
				type: "contour",
				colorscale: "Jet",
			}],
			layout: {
				title: "2D Laguerre Gaussian Mode Phase",
				xaxis: {
					visible: false,
				},
				yaxis: {
					visible: false,
					scaleanchor: "x"
				},
			},
			config: {
				scrollZoom: true
			}
		});
	}

	drawHankelTransform() {
		const tHankelTransform = tabulateFunction(this.hankeledCustomLaguerreGaussianMode, 0, R, h);

		Plotly.newPlot("hankel-amplitude-plot-3", {
			data: [{
				x: tHankelTransform.x,
				y: amplitudeOfTabulatedValues(tHankelTransform.y),
				mode: 'lines',
				type: 'scatter',
				line: {
					color: "#55a919"
				}
			}],
			layout: {
				xaxis: {
					title: "x",
				},
				yaxis: {
					title: "abs(f(x))",
				},
				title: "Hankel Transform Amplitude"
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("hankel-phase-plot-3", {
			data: [{
				x: tHankelTransform.x,
				y: phaseOfTabulatedValues(tHankelTransform.y),
				mode: 'lines',
				type: 'scatter',
				line: {
					color: "#4657ee"
				}
			}],
			layout: {
				xaxis: {
					title: "x",
				},
				yaxis: {
					title: "atan2(im(f(x)), re(f(x)))",
				},
				title: "Hankel Transform Phase"
			},
			config: {
				scrollZoom: true
			}
		});
	}

	draw2dHankelTransform() {
		const start = performance.now();
		const hankelTransformValues = getValuesOfPolarFn(this.hankeledCustomLaguerreGaussianMode);
		const end = performance.now();
		console.log(`Hankel transform, N = ${N} took ${end - start}`);

		Plotly.newPlot("hankel-2d-amplitude-plot-3", {
			data: [{
				z: amplitudeOfTabulated2dValues(hankelTransformValues),
				type: "contour",
				colorscale: "Jet",
			}],
			layout: {
				title: "2D Hankel Transform Amplitude",
				xaxis: {
					visible: false,
				},
				yaxis: {
					visible: false,
					scaleanchor: "x"
				},
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("hankel-2d-phase-plot-3", {
			data: [{
				z: phaseOfTabulated2dValues(hankelTransformValues),
				type: "contour",
				colorscale: "Jet",
			}],
			layout: {
				title: "2D Hankel Transform Phase",
				xaxis: {
					visible: false,
				},
				yaxis: {
					visible: false,
					scaleanchor: "x"
				},
			},
			config: {
				scrollZoom: true
			}
		});
	}

	draw2dFourierTransform() {
		const start = performance.now();
		const values = getValuesOfPolarFn(customLaguerreGaussianMode1D);
		const fourieredValues = opticalFourierTransform2d({
			x: tabulateRange(0, R, R / (2*N + 1)),
			y: tabulateRange(0, R, R / (2*N + 1)),
			z: values
		}, M).z;
		const end = performance.now();
		console.log(`Fourier transform, N = ${N}, M = ${M} took ${end - start}`);

		Plotly.newPlot("fourier-2d-amplitude-plot-3", {
			data: [{
				z: amplitudeOfTabulated2dValues(fourieredValues),
				type: "contour",
				colorscale: "Jet",
			}],
			layout: {
				title: "2D Fourier Transform Amplitude",
				xaxis: {
					visible: false,
				},
				yaxis: {
					visible: false,
					scaleanchor: "x"
				},
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("fourier-2d-phase-plot-3", {
			data: [{
				z: phaseOfTabulated2dValues(fourieredValues),
				type: "contour",
				colorscale: "Jet",
			}],
			layout: {
				title: "2D Fourier Transform Phase",
				xaxis: {
					visible: false,
				},
				yaxis: {
					visible: false,
					scaleanchor: "x"
				},
			},
			config: {
				scrollZoom: true
			}
		});
	}

	drawBesselIntegral() {
		const tBesselIntegral = tabulateFunction(customBesselIntegral, 0, R, h);
		Plotly.newPlot("bessel-plot-3", {
			data: [{
				x: tBesselIntegral.x,
				y: tBesselIntegral.y,
				mode: 'lines',
				type: 'scatter',
				line: {
					color: "#55a919"
				}
			}],
			layout: {
				xaxis: {
					title: "x",
				},
				yaxis: {
					title: "f(x)",
				},
				title: `Bessel Integral for n = ${m}`
			},
			config: {
				scrollZoom: true
			}
		});
	}
}
