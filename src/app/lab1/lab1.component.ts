import {Component, OnInit} from '@angular/core';
import functionPlot from "function-plot";
import {tabulateRange} from "../math-fns";
import {a, b, hKsi, hX, inputAmplitude, inputPhase, outputAmplitude, outputPhase, p, q} from "./lab1.data";

@Component({
	selector: 'lab1',
	templateUrl: './lab1.component.html',
	styleUrls: ['./lab1.component.less']
})
export class Lab1Component implements OnInit {

	public ngOnInit(): void {

		const x: number[] = tabulateRange(a, b, hX);
		const ksi: number[] = tabulateRange(p, q, hKsi);

		functionPlot({
			target: "#input-amplitude-plot",
			grid: true,
			xAxis: {domain: [a, b]},
			yAxis: {domain: [-0.5, 2]},
			data: [{
				points: x.map(xk => [xk, inputAmplitude(xk)]),
				fnType: 'points',
				graphType: 'polyline'
			}]
		});

		functionPlot({
			target: "#input-phase-plot",
			grid: true,
			xAxis: {domain: [a, b]},
			yAxis: {domain: [-2, 2]},
			data: [{
				points: x.map(xk => [xk, inputPhase(xk)]),
				fnType: 'points',
				graphType: 'polyline'
			}]
		});

		functionPlot({
			target: "#output-amplitude-plot",
			grid: true,
			xAxis: {domain: [p, q]},
			yAxis: {domain: [-2, 2]},
			data: [{
				points: ksi.map(ksil => [ksil, outputAmplitude(ksil, x)]),
				fnType: 'points',
				graphType: 'polyline'
			}]
		});

		functionPlot({
			target: "#output-phase-plot",
			grid: true,
			xAxis: {domain: [p, q]},
			yAxis: {domain: [-2, 2]},
			data: [{
				points: ksi.map(ksil => [ksil, outputPhase(ksil, x)]),
				fnType: 'points',
				graphType: 'polyline'
			}]
		});

	}
}
