import {Component, OnInit} from '@angular/core';
import functionPlot from "function-plot";

@Component({
	selector: 'lab1',
	templateUrl: './lab1.component.html',
	styleUrls: ['./lab1.component.less']
})
export class Lab1Component implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
		functionPlot({
			target: '#plot',
			data: [{
				fn: 'x^2'
			}]
		})
	}

}
