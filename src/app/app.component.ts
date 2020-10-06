import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app',
	template: `
		<nav mat-tab-nav-bar mat-align-tabs="center">
			<a class="tab" mat-tab-link
			   *ngFor="let link of navLinks"
			   [routerLink]="link.link"
			   routerLinkActive #rla="routerLinkActive"
			   [active]="rla.isActive">
				{{link.label}}
			</a>
		</nav>
		<router-outlet></router-outlet>
	`
})
export class AppComponent implements OnInit {
	public readonly navLinks = [
		{
			label: 'Lab 1',
			link: './lab1',
			index: 1
		}
	];

	activeLinkIndex = -1;

	constructor(private router: Router) {
	}

	ngOnInit() {
		this.router.events.subscribe((res) => {
			this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
		});
	}
}
