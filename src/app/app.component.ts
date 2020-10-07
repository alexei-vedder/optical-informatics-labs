import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app',
	template: `
		<nav mat-tab-nav-bar mat-align-tabs="center">
			<a class="tab" mat-tab-link
			   *ngFor="let tab of tabs"
			   [routerLink]="tab.link">
				{{tab.label}}
			</a>
		</nav>
		<router-outlet></router-outlet>
	`
})
export class AppComponent implements OnInit {
	public readonly tabs = [
		{
			label: 'Lab 1',
			link: './lab1',
			index: 1
		}
	];

	constructor(private router: Router) {
	}

	ngOnInit() {
	}

	onLoad($event: string) {

	}

	onError($event: string) {
		console.error("error during markdown loading")
	}
}
