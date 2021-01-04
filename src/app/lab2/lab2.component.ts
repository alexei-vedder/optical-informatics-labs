import {Component, OnInit} from '@angular/core';
import {amplitudeOf, fourierIntegralFunction, integrateByTrapezia, phaseOf, tabulateFunction} from "../math-fns";
import {opticalFourierTransform} from "../fourier-transform";
import {a, amplitude, customPlane, gaussianBeam, h, M, phase, transformedCustomPlane} from "./lab2.data";
import Plotly from 'plotly.js-dist';


@Component({
	selector: 'lab2',
	template: `
		<mat-tab-group [(selectedIndex)]="selectedTabIndex" mat-align-tabs="center">
			<mat-tab label="Gaussian Beam">
				<div class="container">
					<div id="beam-amplitude-plot-2" class="plot-container"></div>
					<div id="beam-phase-plot-2" class="plot-container"></div>

					<div id="transformed-beam-amplitude-plot-2" class="plot-container"></div>
					<div id="transformed-beam-phase-plot-2" class="plot-container"></div>
				</div>

			</mat-tab>
			<mat-tab label="Custom Input Plane">
				<div class="container">
					<div id="plane-amplitude-plot-2" class="plot-container"></div>
					<div id="plane-phase-plot-2" class="plot-container"></div>

					<div id="transformed-plane-amplitude-plot-2" class="plot-container"></div>
					<div id="transformed-plane-phase-plot-2" class="plot-container"></div>
				</div>
			</mat-tab>
		</mat-tab-group>

	`
})
export class Lab2Component implements OnInit {
	private _selectedTabIndex;

	get selectedTabIndex(): number {
		return this._selectedTabIndex;
	}

	set selectedTabIndex(value: number) {
		this._selectedTabIndex = value;
		switch (value) {
			case 0: {
				setTimeout(() => {
					this.drawGaussianBeam();
					this.drawTransformedGaussianBeam();
				});
				break;
			}
			case 1: {
				setTimeout(() => {
					this.drawCustomPlane();
					this.drawTransformedCustomPlane();
				});
				break;
			}
		}
	}

	ngOnInit(): void {
		this.selectedTabIndex = 0;
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

		const tNumTransformedBeam = {
			x: tTransformedBeam.x,
			y: tTransformedBeam.x.map(x => integrateByTrapezia(fourierIntegralFunction(gaussianBeam, x), -a, a, h))
		}

		const tNumTransformedBeamAmplitude = {
			x: tTransformedBeam.x,
			y: amplitudeOf(tNumTransformedBeam.y)
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
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedBeamAmplitude.x,
				y: tNumTransformedBeamAmplitude.y,
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
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
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedBeamPhase.x,
				y: tNumTransformedBeamPhase.y,
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
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

	drawCustomPlane() {
		const tPlaneAmplitude = tabulateFunction(amplitude(customPlane), -a, a, h);
		const tPlanePhase = tabulateFunction(phase(customPlane), -a, a, h);

		Plotly.newPlot("plane-amplitude-plot-2", {
			data: [{
				x: tPlaneAmplitude.x,
				y: tPlaneAmplitude.y,
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
				title: 'Input Plane Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("plane-phase-plot-2", {
			data: [{
				x: tPlanePhase.x,
				y: tPlanePhase.y,
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
				title: 'Input Plane Phase'
			},
			config: {
				scrollZoom: true
			}
		});
	}

	drawTransformedCustomPlane() {
		const tTransformedPlane = opticalFourierTransform(tabulateFunction(customPlane, -a, a, h), M);

		const tTransformedPlaneAmplitude = {
			x: tTransformedPlane.x,
			y: amplitudeOf(tTransformedPlane.y)
		};

		const tTransformedPlanePhase = {
			x: tTransformedPlane.x,
			y: phaseOf(tTransformedPlane.y)
		};

		const tNumTransformedPlane = {
			x: tTransformedPlane.x,
			y: tTransformedPlane.x.map(x => integrateByTrapezia(fourierIntegralFunction(customPlane, x), -a, a, h))
		}

		const tNumTransformedPlaneAmplitude = {
			x: tTransformedPlane.x,
			y: amplitudeOf(tNumTransformedPlane.y)
		}

		const tNumTransformedPlanePhase = {
			x: tTransformedPlane.x,
			y: phaseOf(tNumTransformedPlane.y)
		}

		const tAnalyticallyTransformedPlane = tabulateFunction(
			transformedCustomPlane,
			tTransformedPlane.x[0],
			tTransformedPlane.x[tTransformedPlane.x.length - 1],
			2 * tTransformedPlane.x[tTransformedPlane.x.length - 1] / M
		);

		const tAnalyticallyTransformedPlaneAmplitude = {
			x: tAnalyticallyTransformedPlane.x,
			y: amplitudeOf(tAnalyticallyTransformedPlane.y)
		}

		const tAnalyticallyTransformedPlanePhase = {
			x: tAnalyticallyTransformedPlane.x,
			y: phaseOf(tAnalyticallyTransformedPlane.y)
		}

		Plotly.newPlot("transformed-plane-amplitude-plot-2", {
			data: [{
				x: tTransformedPlaneAmplitude.x,
				y: tTransformedPlaneAmplitude.y,
				mode: 'lines',
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedPlaneAmplitude.x,
				y: tNumTransformedPlaneAmplitude.y,
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
			}, {
				x: tAnalyticallyTransformedPlaneAmplitude.x,
				y: tAnalyticallyTransformedPlaneAmplitude.y,
				mode: 'lines',
				type: 'scatter',
				name: "Analytically"
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [tTransformedPlane.x[0], tTransformedPlane.x[tTransformedPlane.x.length - 1]]
				},
				yaxis: {
					title: "abs(f(x))",
					range: [-2, 2]
				},
				title: 'Transformed Plane Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("transformed-plane-phase-plot-2", {
			data: [{
				x: tTransformedPlanePhase.x,
				y: tTransformedPlanePhase.y,
				mode: 'lines',
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedPlanePhase.x,
				y: tNumTransformedPlanePhase.y,
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
			}, {
				x: tAnalyticallyTransformedPlanePhase.x,
				y: tAnalyticallyTransformedPlanePhase.y,
				mode: 'lines',
				type: 'scatter',
				name: "Analytically"
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [tTransformedPlane.x[0], tTransformedPlane.x[tTransformedPlane.x.length - 1]]
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
