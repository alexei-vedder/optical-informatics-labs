import {Component} from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<nav mat-tab-nav-bar mat-align-tabs="center">
			<a class="tab"
			   mat-tab-link
			   *ngFor="let tab of tabs"
			   [routerLink]="tab.link">
				{{tab.label}}
			</a>
		</nav>
		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	public readonly tabs = [
		{
			label: 'Lab 1',
			link: './lab1',
			index: 1
		},
		{
			label: "Lab 2",
			link: "./lab2",
			index: 2
		}
	];
}
