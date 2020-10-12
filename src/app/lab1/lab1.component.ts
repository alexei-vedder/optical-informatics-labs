import {AfterViewInit, Component, OnInit} from '@angular/core';
import {tabulateRange} from "../math-fns";
import {a, alpha, b, hKsi, hX, inputAmplitude, inputPhase, K, outputAmplitude, outputPhase, p, q} from "./lab1.data";
import Plotly from 'plotly.js-dist'
import {generate2dFrames, generateSliderSteps} from "../converter-fns";


@Component({
	selector: 'lab1',
	template: `
		<mat-tab-group mat-align-tabs="center">
			<mat-tab label="Plots">
				<div class="container">
					<div id="input-amplitude-plot" class="plot-container"></div>
					<div id="input-phase-plot" class="plot-container"></div>
					<div id="output-amplitude-plot" class="plot-container"></div>
					<div id="output-phase-plot" class="plot-container"></div>
					<div id="core-3d-plot" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="About">
				<div class="container">
					<markdown src="app/lab1/README.md"></markdown>
				</div>
			</mat-tab>
		</mat-tab-group>
	`
})
export class Lab1Component implements OnInit, AfterViewInit {

	private x: number[];
	private ksi: number[];
	private alphas: number[];

	public ngOnInit(): void {
		this.x = tabulateRange(a, b, hX);
		this.ksi = tabulateRange(p, q, hKsi);
		this.alphas = tabulateRange(alpha - 3, alpha + 7, 1);
	}

	public ngAfterViewInit() {
		this.loadPlots();
	}

	private loadPlots() {

		const alphaSliderSteps = generateSliderSteps(this.alphas);

		Plotly.newPlot("input-amplitude-plot", {
			data: [{
				x: this.x,
				y: this.x.map(xk => inputAmplitude(xk)),
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [a, b]
				},
				yaxis: {
					title: "abs(f(x))",
					range: [-2, 2]
				},
				title: 'Input Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});


		Plotly.newPlot("input-phase-plot", {
			data: [{
				x: this.x,
				y: this.x.map(xk => inputPhase(xk)),
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [a, b]
				},
				yaxis: {
					title: "atan2(im(f(x)), re(f(x)))",
					range: [-2, 2]
				},
				title: 'Input Phase'
			},
			config: {
				scrollZoom: true
			}
		});

		const outputAmplitudeFrames =
			generate2dFrames(this.alphas, alpha => this.ksi.map(ksil => outputAmplitude(ksil, this.x, alpha)));

		Plotly.newPlot("output-amplitude-plot", {
			data: [{
				x: this.ksi,
				y: this.ksi.map(ksil => outputAmplitude(ksil, this.x)),
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "ksi",
					range: [p, q]
				},
				yaxis: {
					title: "abs(F(ksi))",
					range: [-2, 2]
				},
				title: 'Output Amplitude',
				sliders: [{
					currentvalue: {
						prefix: 'alpha = '
					},
					active: 3,
					steps: alphaSliderSteps
				}]
			},
			frames: outputAmplitudeFrames,
			config: {
				scrollZoom: true
			}
		});

		const outputPhaseFrames =
			generate2dFrames(this.alphas, alpha => this.ksi.map(ksil => outputPhase(ksil, this.x, alpha)))

		Plotly.newPlot("output-phase-plot", {
			data: [{
				x: this.ksi,
				y: this.ksi.map(ksil => outputPhase(ksil, this.x)),
				mode: 'lines',
				type: 'scatter'
			}],
			layout: {
				xaxis: {
					title: "ksi",
					range: [p, q]
				},
				yaxis: {
					title: "atan2(im(F(ksi)), re(F(ksi)))",
					range: [-2, 2]
				},
				title: 'Output Phase',
				sliders: [{
					currentvalue: {
						prefix: 'alpha = '
					},
					active: 3,
					steps: alphaSliderSteps
				}, {
					currentvalue: "p"
				}]
			},
			frames: outputPhaseFrames,
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("core-3d-plot", {
			data: [{
				z: this.x.map(xk => this.ksi.map(ksil => K(xk, ksil))),
				type: "surface"
			}],
			layout: {
				title: 'Core'
			},
			config: {
				scrollZoom: true
			}
		});
	}
}
