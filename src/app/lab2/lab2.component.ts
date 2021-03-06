import {Component, OnInit} from '@angular/core';
import {
	amplitude,
	amplitude2d,
	amplitudeOfTabulated2dValues,
	amplitudeOfTabulatedValues,
	fourierIntegralFunction,
	integrateByTrapezia,
	phase,
	phase2d,
	phaseOfTabulated2dValues,
	phaseOfTabulatedValues,
	tabulate2dFunction,
	tabulateFunction
} from "../math-fns";
import {opticalFourierTransform, opticalFourierTransform2d} from "../fourier-transform";
import {
	a,
	customPlane,
	customPlane2d,
	gaussianBeam,
	gaussianBeam2d,
	h,
	M,
	transformedCustomPlane,
	transformedCustomPlane2d,
} from "./lab2.data";
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
			<mat-tab label="2D Gaussian Beam">
				<div class="container">
					<div id="2d-beam-amplitude-plot-2" class="plot-container"></div>
					<div id="2d-beam-phase-plot-2" class="plot-container"></div>

					<div id="2d-transformed-beam-amplitude-plot-2" class="plot-container"></div>
					<div id="2d-transformed-beam-phase-plot-2" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="2D Custom Input Plane">
				<div class="container">
					<div id="2d-plane-amplitude-plot-2" class="plot-container"></div>
					<div id="2d-plane-phase-plot-2" class="plot-container"></div>

					<div id="2d-transformed-plane-amplitude-plot-2" class="plot-container"></div>
					<div id="2d-analytically-transformed-plane-amplitude-plot-2" class="plot-container"></div>

					<div id="2d-transformed-plane-phase-plot-2" class="plot-container"></div>
					<div id="2d-analytically-transformed-plane-phase-plot-2" class="plot-container"></div>
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
			case 2: {
				setTimeout(() => {
					this.draw2dGaussianBeam();
					this.draw2dTransformedGaussianBeam();
				});
				break;
			}
			case 3: {
				setTimeout(() => {
					this.draw2dCustomPlane();
					this.draw2dTransformedCustomPlane();
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

		const tNumTransformedBeam = {
			x: tTransformedBeam.x,
			y: tTransformedBeam.x.map(x => integrateByTrapezia(fourierIntegralFunction(gaussianBeam, x), -a, a, h))
		}

		Plotly.newPlot("transformed-beam-amplitude-plot-2", {
			data: [{
				x: tTransformedBeam.x,
				y: amplitudeOfTabulatedValues(tTransformedBeam.y),
				mode: 'lines',
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedBeam.x,
				y: amplitudeOfTabulatedValues(tNumTransformedBeam.y),
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [tTransformedBeam.x[0], tTransformedBeam.x[tTransformedBeam.x.length - 1]]
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
				x: tTransformedBeam.x,
				y: phaseOfTabulatedValues(tTransformedBeam.y),
				mode: 'lines',
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedBeam.x,
				y: phaseOfTabulatedValues(tNumTransformedBeam.y),
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
			}],
			layout: {
				xaxis: {
					title: "x",
					range: [tTransformedBeam.x[0], tTransformedBeam.x[tTransformedBeam.x.length - 1]]
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

		const tNumTransformedPlane = {
			x: tTransformedPlane.x,
			y: tTransformedPlane.x.map(x => integrateByTrapezia(fourierIntegralFunction(customPlane, x), -a, a, h))
		}

		const tAnalyticallyTransformedPlane = tabulateFunction(
			transformedCustomPlane,
			tTransformedPlane.x[0],
			tTransformedPlane.x[tTransformedPlane.x.length - 1],
			2 * tTransformedPlane.x[tTransformedPlane.x.length - 1] / M
		);

		Plotly.newPlot("transformed-plane-amplitude-plot-2", {
			data: [{
				x: tTransformedPlane.x,
				y: amplitudeOfTabulatedValues(tTransformedPlane.y),
				mode: 'lines',
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedPlane.x,
				y: amplitudeOfTabulatedValues(tNumTransformedPlane.y),
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
			}, {
				x: tAnalyticallyTransformedPlane.x,
				y: amplitudeOfTabulatedValues(tAnalyticallyTransformedPlane.y),
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
				x: tTransformedPlane.x,
				y: phaseOfTabulatedValues(tTransformedPlane.y),
				mode: 'lines',
				type: 'scatter',
				name: "Fouriered"
			}, {
				x: tNumTransformedPlane.x,
				y: phaseOfTabulatedValues(tNumTransformedPlane.y),
				mode: 'lines',
				type: 'scatter',
				name: "Numerically Integrated"
			}, {
				x: tAnalyticallyTransformedPlane.x,
				y: phaseOfTabulatedValues(tAnalyticallyTransformedPlane.y),
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

	draw2dGaussianBeam() {
		const tBeam2dAmplitude = tabulate2dFunction(amplitude2d(gaussianBeam2d), [-a, -a], [a, a], h);
		const tBeam2dPhase = tabulate2dFunction(phase2d(gaussianBeam2d), [-a, -a], [a, a], h);

		Plotly.newPlot("2d-beam-amplitude-plot-2", {
			data: [{
				x: tBeam2dAmplitude.x,
				y: tBeam2dAmplitude.y,
				z: tBeam2dAmplitude.z,
				type: "surface"
			}],
			layout: {
				title: '2D Gaussian Beam Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("2d-beam-phase-plot-2", {
			data: [{
				x: tBeam2dPhase.x,
				y: tBeam2dPhase.y,
				z: tBeam2dPhase.z,
				type: "surface"
			}],
			layout: {
				title: "2D Gaussian Beam Phase"
			},
			config: {
				scrollZoom: true
			}
		});
	}

	draw2dTransformedGaussianBeam() {
		const tTransformed2dBeam = opticalFourierTransform2d(tabulate2dFunction(gaussianBeam2d, [-a, -a], [a, a], h), M);

		Plotly.newPlot("2d-transformed-beam-amplitude-plot-2", {
			data: [{
				x: tTransformed2dBeam.x,
				y: tTransformed2dBeam.y,
				z: amplitudeOfTabulated2dValues(tTransformed2dBeam.z),
				type: "surface",
				colorscale: "Jet",
			}],
			layout: {
				title: 'Transformed 2D Gaussian Beam Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("2d-transformed-beam-phase-plot-2", {
			data: [{
				x: tTransformed2dBeam.x,
				y: tTransformed2dBeam.y,
				z: phaseOfTabulated2dValues(tTransformed2dBeam.z),
				type: "surface",
				colorscale: "Jet",
			}],
			layout: {
				title: "Transformed 2D Gaussian Beam Phase"
			},
			config: {
				scrollZoom: true
			}
		});
	}

	draw2dCustomPlane() {
		const tPlane2dAmplitude = tabulate2dFunction(amplitude2d(customPlane2d), [-a, -a], [a, a], h);
		const tPlane2dPhase = tabulate2dFunction(phase2d(customPlane2d), [-a, -a], [a, a], h);

		Plotly.newPlot("2d-plane-amplitude-plot-2", {
			data: [{
				x: tPlane2dAmplitude.x,
				y: tPlane2dAmplitude.y,
				z: tPlane2dAmplitude.z,
				type: "surface"
			}],
			layout: {
				title: '2D Input Plane Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("2d-plane-phase-plot-2", {
			data: [{
				x: tPlane2dPhase.x,
				y: tPlane2dPhase.y,
				z: tPlane2dPhase.z,
				type: "surface"
			}],
			layout: {
				title: "2D Input Plane Phase"
			},
			config: {
				scrollZoom: true
			}
		});
	}

	draw2dTransformedCustomPlane() {
		const tTransformed2dPlane = opticalFourierTransform2d(tabulate2dFunction(customPlane2d, [-a, -a], [a, a], h), M);

		const tAnalyticallyTransformed2dPlane = tabulate2dFunction(
			transformedCustomPlane2d,
			// @ts-ignore
			[tTransformed2dPlane.x[0], tTransformed2dPlane.y[0]],
			[tTransformed2dPlane.x[tTransformed2dPlane.x.length - 1], tTransformed2dPlane.y[tTransformed2dPlane.y.length - 1]],
			// @ts-ignore
			2 * tTransformed2dPlane.x[tTransformed2dPlane.x.length - 1] / M
		);

		Plotly.newPlot("2d-transformed-plane-amplitude-plot-2", {
			data: [{
				x: tTransformed2dPlane.x,
				y: tTransformed2dPlane.y,
				z: amplitudeOfTabulated2dValues(tTransformed2dPlane.z),
				type: "surface",
				colorscale: "Jet",
			}],
			layout: {
				title: 'Transformed 2D Custom Plane Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("2d-analytically-transformed-plane-amplitude-plot-2", {
			data: [{
				x: tAnalyticallyTransformed2dPlane.x,
				y: tAnalyticallyTransformed2dPlane.y,
				z: amplitudeOfTabulated2dValues(tAnalyticallyTransformed2dPlane.z),
				type: "surface",
				colorscale: 'YlGnBu',
			}],
			layout: {
				title: 'Analytically Transformed 2D Custom Plane Amplitude'
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("2d-transformed-plane-phase-plot-2", {
			data: [{
				x: tTransformed2dPlane.x,
				y: tTransformed2dPlane.y,
				z: phaseOfTabulated2dValues(tTransformed2dPlane.z),
				type: "surface",
				colorscale: "Jet",
			}],
			layout: {
				title: "Transformed 2D Custom Plane Phase"
			},
			config: {
				scrollZoom: true
			}
		});

		Plotly.newPlot("2d-analytically-transformed-plane-phase-plot-2", {
			data: [{
				x: tAnalyticallyTransformed2dPlane.x,
				y: tAnalyticallyTransformed2dPlane.y,
				z: phaseOfTabulated2dValues(tAnalyticallyTransformed2dPlane.z),
				type: "surface",
				colorscale: 'YlGnBu',
			}],
			layout: {
				title: "Analytically Transformed 2D Custom Plane Phase"
			},
			config: {
				scrollZoom: true
			}
		});
	}
}
