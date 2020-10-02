import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Lab1Component } from './lab1.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: Lab1Component
	}
];

@NgModule({
	declarations: [
		Lab1Component
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	]
})
export class Lab1Module {
}
