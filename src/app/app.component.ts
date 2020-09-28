import {Component, OnInit} from '@angular/core';
import functionPlot from "function-plot";

@Component({
	selector: 'app',
	template: `
		<div id="plot"></div>
	`,
	styles: []
})
export class AppComponent implements OnInit {

	ngOnInit() {
		functionPlot({
			target: '#plot',
			data: [{
				fn: 'x^2'
			}]
		})
	}
}
