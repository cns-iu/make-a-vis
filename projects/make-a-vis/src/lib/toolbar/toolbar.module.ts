import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SidenavContentComponent, ToolbarContentComponent, MainComponent],
  exports: [MainComponent]
})
export class ToolbarModule { }
