import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<router-outlet></router-outlet>
	`,
	styles: []
})
export class AppComponent implements OnInit {

	ngOnInit() {
	}
}
