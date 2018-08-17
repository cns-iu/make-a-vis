import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// Icons
import { CnsLogoIconComponent } from './icons/cns-logo/cns-logo-icon.component';
import { GithubIconComponent } from './icons/github/github-icon.component';
import { MenuIconComponent } from './icons/menu/menu-icon.component';

// Components
import { MainComponent } from './main/main.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,

    MatIconModule,
    MatToolbarModule
  ],
  declarations: [
    CnsLogoIconComponent, GithubIconComponent, MenuIconComponent,
    MainComponent, SidenavContentComponent, ToolbarContentComponent
  ],
  exports: [MainComponent]
})
export class ToolbarModule { }
