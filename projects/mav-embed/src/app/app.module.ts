import { NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
  ],
  providers: []
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap() { }
}
