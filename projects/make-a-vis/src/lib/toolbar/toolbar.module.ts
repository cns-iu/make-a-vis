import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

// Icons
import { CnsLogoIconComponent } from './icons/cns-logo/cns-logo-icon.component';
import { ExportSnapshotIconComponent } from './icons/export-snapshot/export-snapshot-icon.component';
import { GithubIconComponent } from './icons/github/github-icon.component';
import { LoadProjectIconComponent } from './icons/load-project/load-project-icon.component';
import { LoggingIconComponent } from './icons/logging/logging-icon.component';
import { MenuIconComponent } from './icons/menu/menu-icon.component';
import { NewProjectIconComponent } from './icons/new-project/new-project-icon.component';
import { SaveIconComponent } from './icons/save/save-icon.component';
import { ShareIconComponent } from './icons/share/share-icon.component';

// Components
import { MainComponent } from './main/main.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule
  ],
  declarations: [
    CnsLogoIconComponent,
    ExportSnapshotIconComponent,
    GithubIconComponent,
    LoadProjectIconComponent,
    LoggingIconComponent,
    MenuIconComponent,
    NewProjectIconComponent,
    SaveIconComponent,
    ShareIconComponent,


    MainComponent,
    SidenavContentComponent,
    ToolbarContentComponent
  ],
  exports: [MainComponent]
})
export class ToolbarModule { }
