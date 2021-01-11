import {Component, OnInit} from '@angular/core';
import {abs, add, combinations, Complex, divide, exp, factorial, i, multiply, pow, square} from "mathjs";
import Plotly from 'plotly.js-dist';
import {amplitudeOfTabulatedValues, phaseOfTabulatedValues, tabulateFunction} from "../math-fns";

export const laguerreGaussianMode = (r, phi, n, p) => multiply(multiply(multiply(exp(-square(r)), pow(r, abs(p))), generalizedLaguerrePolynomial(square(r), n, abs(p))), exp(multiply(i, p * phi)));

export const generalizedLaguerrePolynomial = (r, n, p) => {
	let sum: number | Complex = 0;
	for (let j = 0; j <= n; ++j) {
		sum = <number | Complex>add(sum, multiply(pow(-1, j), multiply(combinations<number>(n + p, n - j), divide(pow(r, j), factorial(j)))));
	}
	return sum;
};

export const customLaguerreGaussianMode = (r, phi) => laguerreGaussianMode(r, phi, n, m);
export const customLaguerreGaussianMode1D = (r) => <number | Complex>multiply(multiply(exp(-square(r)), pow(r, abs(m))), generalizedLaguerrePolynomial(square(r), n, abs(m)));

export const m = -3;
export const n = 2;
export const R = 5;


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
			<mat-tab label="Transformed Function">
				<div class="container">
					<div id="hankel-amplitude-plot-3" class="plot-container"></div>
					<div id="hankel-phase-plot-3" class="plot-container"></div>

					<div id="hankel-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="hankel-2d-phase-plot-3" class="plot-container"></div>

					<div id="fourier-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="fourier-2d-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
		</mat-tab-group>
	`,
	styles: []
})
export class Lab3Component implements OnInit {

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
				});
				break;
			}
		}
	}

	ngOnInit(): void {
		this.selectedTabIndex = 0;
	}

	drawInputFn() {
		const tInputFn = tabulateFunction(customLaguerreGaussianMode1D, -R, R, 0.1);

		Plotly.newPlot("input-amplitude-plot-3", {
			data: [{
				x: tInputFn.x,
				y: amplitudeOfTabulatedValues(tInputFn.y),
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [-R, R]
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
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [-R, R]
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
	}
}
