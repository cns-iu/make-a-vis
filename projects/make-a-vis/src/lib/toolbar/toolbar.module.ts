import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Store
import { StoreModule } from '@ngrx/store';

import { ClipboardModule } from 'ngx-clipboard';

// Icons
import { CnsLogoIconComponent } from './icons/cns-logo/cns-logo-icon.component';
import { ClipboardLogoComponent } from './icons/clipboard/clipboard-logo/clipboard-logo.component';
import { ExportSnapshotIconComponent } from './icons/export-snapshot/export-snapshot-icon.component';
import { GithubIconComponent } from './icons/github/github-icon.component';
import { InfoIconComponent } from './icons/info-icon/info-icon.component';
import { LoadProjectIconComponent } from './icons/load-project/load-project-icon.component';
import { MenuIconComponent } from './icons/menu/menu-icon.component';
import { SaveIconComponent } from './icons/save/save-icon.component';
import { ShareIconComponent } from './icons/share/share-icon.component';

// Components
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MainComponent } from './main/main.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';

// Reducers
import { sidenavStateReducer } from './shared/store/reducer';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
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
    MatToolbarModule,
    ClipboardModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    StoreModule.forFeature('ui', sidenavStateReducer)
  ],
  declarations: [
    CnsLogoIconComponent,
    ExportSnapshotIconComponent,
    GithubIconComponent,
    LoadProjectIconComponent,
    MenuIconComponent,
    SaveIconComponent,
    ShareIconComponent,

    MainComponent,
    SidenavContentComponent,
    ToolbarContentComponent,
    ClipboardLogoComponent,
    InfoIconComponent,
    InfoDialogComponent
  ],
  exports: [MainComponent],
  entryComponents: [InfoDialogComponent]
})
export class ToolbarModule { }
