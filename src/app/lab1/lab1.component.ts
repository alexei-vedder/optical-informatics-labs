import {Component, OnInit} from '@angular/core';
import {tabulateRange} from "../math-fns";
import {a, b, hKsi, hX, inputAmplitude, inputPhase, K, outputAmplitude, outputPhase, p, q} from "./lab1.data";
import Plotly from 'plotly.js-dist'


@Component({
	selector: 'lab1',
	template: `
		<div class="plot-container">
			<div id="input-amplitude-plot"></div>
			<div id="input-phase-plot"></div>
			<div id="output-amplitude-plot"></div>
			<div id="output-phase-plot"></div>
			<div id="core-3d-plot"></div>
		</div>
	`,
	styles: [`
		.plot-container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	`]
})
export class Lab1Component implements OnInit {

	private x: number[];
	private ksi: number[];

	public ngOnInit(): void {
		this.x = tabulateRange(a, b, hX);
		this.ksi = tabulateRange(p, q, hKsi);
		this.loadPlots();
	}

	private loadPlots() {
		Plotly.newPlot("input-amplitude-plot", [{
			x: this.x,
			y: this.x.map(xk => inputAmplitude(xk)),
			mode: 'lines',
			type: 'scatter'
		}], {
			xaxis: {range: [a, b]},
			yaxis: {range: [-2, 2]},
			title: 'Input Amplitude'
		}, {
			scrollZoom: true
		});

		Plotly.newPlot("input-phase-plot", [{
			x: this.x,
			y: this.x.map(xk => inputPhase(xk)),
			mode: 'lines',
			type: 'scatter'
		}], {
			xaxis: {range: [a, b]},
			yaxis: {range: [-2, 2]},
			title: 'Input Phase'
		}, {
			scrollZoom: true
		});

		Plotly.newPlot("output-amplitude-plot", [{
			x: this.ksi,
			y: this.ksi.map(ksil => outputAmplitude(ksil, this.x)),
			mode: 'lines',
			type: 'scatter'
		}], {
			xaxis: {range: [p, q]},
			yaxis: {range: [-2, 2]},
			title: 'Output Amplitude'
		}, {
			scrollZoom: true
		});

		Plotly.newPlot("output-phase-plot", [{
			x: this.ksi,
			y: this.ksi.map(ksil => outputPhase(ksil, this.x)),
			mode: 'lines',
			type: 'scatter'
		}], {
			xaxis: {range: [p, q]},
			yaxis: {range: [-2, 2]},
			title: 'Output Phase'
		}, {
			scrollZoom: true
		});

		/* less complex but long-written way to get points for the 3d core plot:
			const core3dPlotData = [];
			for (const xk of this.x) {
				const lastArray = []
				for (const ksil of this.ksi) {
					lastArray.push(K(xk, ksil));
				}
				core3dPlotData.push(lastArray);
			}
		 */
		Plotly.newPlot("core-3d-plot", [{
			z: this.x.map(xk => this.ksi.map(ksil => K(xk, ksil))),
			type: "surface"
		}], {
			title: 'Core'
		}, {
			scrollZoom: true
		});
	}
}
