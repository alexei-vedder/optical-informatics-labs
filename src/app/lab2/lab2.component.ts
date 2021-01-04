import {Component, OnInit} from '@angular/core';
import {amplitudeOf, integrateByTrapezia, phaseOf, tabulateFunction} from "../math-fns";
import {opticalFourierTransform} from "../fourier-transform";
import {a, amplitude, gaussianBeam, h, M, N, phase} from "./lab2.data";
import Plotly from 'plotly.js-dist';
import {complex, exp, multiply, pi, sqrt} from "mathjs";


@Component({
	selector: 'lab2',
	template: `
		<div class="container">
			<div id="beam-amplitude-plot-2" class="plot-container"></div>
			<div id="beam-phase-plot-2" class="plot-container"></div>
			<div id="transformed-beam-amplitude-plot-2" class="plot-container"></div>
			<div id="transformed-beam-phase-plot-2" class="plot-container"></div>
		</div>
	`
})
export class Lab2Component implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
		this.drawGaussianBeam();
		this.drawTransformedGaussianBeam();
	}

	drawGaussianBeam() {
		const tBeamAmplitude = tabulateFunction(amplitude(gaussianBeam), -a, a, h);
		const tBeamPhase = tabulateFunction(phase(gaussianBeam), -a, a, h);

		Plotly.newPlot("beam-amplitude-plot-2", {
			data: [{
				x: tBeamAmplitude.x,
				y: tBeamAmplitude.y,
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [-a, a]
				},
				yaxis: {
					title: "abs(f(x))",
					range: [-2, 2]
				},
				title: 'Gaussian Beam Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("beam-phase-plot-2", {
			data: [{
				x: tBeamPhase.x,
				y: tBeamPhase.y,
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [-a, a]
				},
				yaxis: {
					title: "atan2(im(f(x)), re(f(x)))",
					range: [-2, 2]
				},
				title: 'Gaussian Beam Phase'
			},
			config: {
				scrollZoom: true
			}
		});
	}

	drawTransformedGaussianBeam() {

		const tTransformedBeam = opticalFourierTransform(tabulateFunction(gaussianBeam, -a, a, h), M);

		const tTransformedBeamAmplitude = {
			x: tTransformedBeam.x,
			y: amplitudeOf(tTransformedBeam.y)
		};

		const tTransformedBeamPhase = {
			x: tTransformedBeam.x,
			y: phaseOf(tTransformedBeam.y)
		};

		// TODO get back to this short form
		// const fourierIntegralFunction = (f, u) => x => multiply(f(x), exp(<number>multiply(-2 * pi * x * u, complex(0, 1))));

		const fourierIntegralFunction = function(f, u) {
			return function(x) {
				const a1 = f(x);
				const a2 = exp(<number>multiply(-2 * pi * x * u, complex(0, 1)));
				return multiply(a1, a2);
			}
		}

		const tNumTransformedBeam = {
			x: tTransformedBeam.x,
			y: tTransformedBeam.x.map(x => integrateByTrapezia(fourierIntegralFunction(gaussianBeam, x), -a, a, h))
		}

		const tNumTransformedBeamAmplitude = {
			x: tTransformedBeam.x,
			y: amplitudeOf(tNumTransformedBeam.y)
				/*TODO fix this cheat*/ .map(val => multiply(val, sqrt(N ** 2 / (4 * a * M))))
		}

		const tNumTransformedBeamPhase = {
			x: tTransformedBeam.x,
			y: phaseOf(tNumTransformedBeam.y)
		}

		Plotly.newPlot("transformed-beam-amplitude-plot-2", {
			data: [{
				x: tTransformedBeamAmplitude.x,
				y: tTransformedBeamAmplitude.y,
				mode: 'lines',
				type: 'scatter'
			}, {
				x: tNumTransformedBeamAmplitude.x,
				y: tNumTransformedBeamAmplitude.y,
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [tTransformedBeamAmplitude.x[0], tTransformedBeamAmplitude.x[tTransformedBeamAmplitude.x.length - 1]]
				},
				yaxis: {
					title: "abs(f(x))",
					range: [-2, 2]
				},
				title: 'Transformed Gaussian Beam Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("transformed-beam-phase-plot-2", {
			data: [{
				x: tTransformedBeamPhase.x,
				y: tTransformedBeamPhase.y,
				mode: 'lines',
				type: 'scatter'
			}, {
				x: tNumTransformedBeamPhase.x,
				y: tNumTransformedBeamPhase.y,
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [tTransformedBeamPhase.x[0], tTransformedBeamPhase.x[tTransformedBeamPhase.x.length - 1]]
				},
				yaxis: {
					title: "atan2(im(f(x)), re(f(x)))",
					range: [-2, 2]
				},
				title: 'Transformed Gaussian Beam Phase'
			},
			config: {
				scrollZoom: true
			}
		});
	}

}
