import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {Lab3Component} from './lab3.component';

const routes = [
	{
		path: "",
		component: Lab3Component
	}
];

@NgModule({
	declarations: [Lab3Component],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatTabsModule,
	]
})
export class Lab3Module {
}
