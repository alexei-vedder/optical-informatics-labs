import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'lab3',
	template: `
		<mat-tab-group [(selectedIndex)]="selectedTabIndex" mat-align-tabs="center">
			<mat-tab label="Input Function">
				<div class="container">
					<div id="input-amplitude-plot-3" class="plot-container"></div>
					<div id="input-phase-plot-3" class="plot-container"></div>

					<div id="input-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="input-2d-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
			<mat-tab label="Transformed Function">
				<div class="container">
					<div id="hankel-amplitude-plot-3" class="plot-container"></div>
					<div id="hankel-phase-plot-3" class="plot-container"></div>

					<div id="hankel-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="hankel-2d-phase-plot-3" class="plot-container"></div>

					<div id="fourier-2d-amplitude-plot-3" class="plot-container"></div>
					<div id="fourier-2d-phase-plot-3" class="plot-container"></div>
				</div>
			</mat-tab>
		</mat-tab-group>
	`,
	styles: []
})
export class Lab3Component implements OnInit {
	selectedTabIndex: number;

	constructor() {
	}

	ngOnInit(): void {
	}

}
