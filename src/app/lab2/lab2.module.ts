import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Lab2Component} from './lab2.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";

const routes: Routes = [
	{
		path: "",
		component: Lab2Component
	}
];

@NgModule({
	declarations: [Lab2Component],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatTabsModule,
	]
})
export class Lab2Module {
}
