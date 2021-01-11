import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MarkdownModule} from "ngx-markdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";


const routes: Routes = [
	{
		path: "*",
		redirectTo: ""
	},
	{
		path: "lab1",
		loadChildren: () => import("./lab1/lab1.module").then(m => m.Lab1Module)
	},
	{
		path: "lab2",
		loadChildren: () => import("./lab2/lab2.module").then(m => m.Lab2Module)
	},
	{
		path: "lab3",
		loadChildren: () => import("./lab3/lab3.module").then(m => m.Lab3Module)
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
		MatTabsModule,
		MarkdownModule.forRoot({loader: HttpClient}),
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
