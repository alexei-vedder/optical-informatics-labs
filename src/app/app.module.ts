import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import { LabChoiceComponent } from './lab-choice/lab-choice.component';

const routes: Routes = [
	{
		path: "",
		component: LabChoiceComponent
	},
	{
		path: "*",
		redirectTo: ""
	},
	{
		path: "lab1",
		loadChildren: () => import("./lab1/lab1.module").then(m => m.Lab1Module)
	}
];

@NgModule({
	declarations: [
		AppComponent,
		LabChoiceComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
