import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';
import { MainComponent } from './main/main.component';
import { GithubIconComponent } from './github-icon/github-icon.component';
import { MenuIconComponent } from './menu-icon/menu-icon.component';
import { CnsLogoIconComponent } from './cns-logo-icon/cns-logo-icon.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,

    CommonModule,

    MatIconModule,
    MatToolbarModule
  ],
  declarations: [SidenavContentComponent, ToolbarContentComponent, MainComponent, GithubIconComponent, MenuIconComponent, CnsLogoIconComponent],
  exports: [MainComponent]
})
export class ToolbarModule { }
