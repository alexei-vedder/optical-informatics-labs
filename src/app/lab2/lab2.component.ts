import {Component, OnInit} from '@angular/core';
import {amplitudeOf, phaseOf, tabulateFunction} from "../math-fns";
import {modifiedFastFourierTransform} from "../fourier-transform";
import {a, amplitude, gaussianBeam, h, M, phase} from "./lab2.data";
import Plotly from 'plotly.js-dist';


@Component({
	selector: 'lab2',
	template: `
		<div class="container">
			<div id="beam-plot-2" class="plot-container"></div>
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
		this.drawPlots();
	}

	drawPlots() {
		const tBeam = tabulateFunction(gaussianBeam, -a, a, h);
		const tBeamAmplitude = tabulateFunction(amplitude(gaussianBeam), -a, a, h);
		const tBeamPhase = tabulateFunction(phase(gaussianBeam), -a, a, h);

		Plotly.newPlot("beam-plot-2", {
			data: [{
				x: tBeam.x,
				y: tBeam.y,
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
				title: 'Gaussian Beam'
			},
			config: {
				scrollZoom: true
			}
		});

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

		const tTransformedBeam = modifiedFastFourierTransform(tBeam, M);

		const tTransformedBeamAmplitude = {
			x: tTransformedBeam.x,
			y: amplitudeOf(tTransformedBeam.y)
		};

		const tTransformedBeamPhase = {
			x: tTransformedBeam.x,
			y: phaseOf(tTransformedBeam.y)
		};


		Plotly.newPlot("transformed-beam-amplitude-plot-2", {
			data: [{
				x: tTransformedBeamAmplitude.x,
				y: tTransformedBeamAmplitude.y,
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
