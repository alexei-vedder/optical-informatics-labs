import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';


const routes: Routes = [
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
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		MatTabsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
