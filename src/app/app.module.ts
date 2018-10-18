import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DemoModule } from './demo/demo.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', component: AppComponent}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
