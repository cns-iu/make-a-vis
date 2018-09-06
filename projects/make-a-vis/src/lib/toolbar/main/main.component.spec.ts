import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// Material
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Icons
import { CnsLogoIconComponent } from '../icons/cns-logo/cns-logo-icon.component';
import { GithubIconComponent } from '../icons/github/github-icon.component';
import { MenuIconComponent } from '../icons/menu/menu-icon.component';
import { ExportSnapshotIconComponent } from '../icons/export-snapshot/export-snapshot-icon.component';
import { LoadProjectIconComponent } from '../icons/load-project/load-project-icon.component';
import { LoggingIconComponent } from '../icons/logging/logging-icon.component';
import { NewProjectIconComponent } from '../icons/new-project/new-project-icon.component';
import { SaveIconComponent } from '../icons/save/save-icon.component';
import { ShareIconComponent } from '../icons/share/share-icon.component';

import { MainComponent } from './main.component';
import { SidenavContentComponent } from '../sidenav-content/sidenav-content.component';
import { ToolbarContentComponent } from '../toolbar-content/toolbar-content.component';

describe('toolbar', () => {
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,

        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,

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
        MatDividerModule
      ],
      declarations: [
        CnsLogoIconComponent,
        GithubIconComponent,
        MenuIconComponent,
        ExportSnapshotIconComponent,
        LoadProjectIconComponent,
        LoggingIconComponent,
        MenuIconComponent,
        NewProjectIconComponent,
        SaveIconComponent,
        ShareIconComponent,

        MainComponent,
        SidenavContentComponent,
        ToolbarContentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
