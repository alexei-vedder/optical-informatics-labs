import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Lab1Component} from './lab1.component';
import {RouterModule, Routes} from "@angular/router";
import {MarkdownModule} from "ngx-markdown";
import {MatTabsModule} from "@angular/material/tabs";

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
		MarkdownModule,
		MatTabsModule,
	]
})
export class Lab1Module {
}
