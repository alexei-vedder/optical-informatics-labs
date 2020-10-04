import {Component, OnInit} from '@angular/core';
import functionPlot from "function-plot";
import {abs} from "mathjs";
import {tabulateRange} from "../math-fns";
import {a, b, f, hKsi, hX, p, q} from "./data";

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
				points: x.map(xk => [xk, abs(f(xk))]),
				fnType: 'points',
				graphType: 'polyline'
			}]
		});

		/*functionPlot({
			target: '#plot',
			data: [{
				fn: 'x^2'
			}]
		});

		functionPlot({
			target: '#plot',
			data: [{
				fn: 'x^2'
			}]
		});

		functionPlot({
			target: '#plot',
			data: [{
				fn: 'x^2'
			}]
		});*/
	}
}
