import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Material
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// Icons
import { CnsLogoIconComponent } from '../icons/cns-logo/cns-logo-icon.component';
import { GithubIconComponent } from '../icons/github/github-icon.component';
import { MenuIconComponent } from '../icons/menu/menu-icon.component';

import { ToolbarContentComponent } from './toolbar-content.component';

describe('toolbar', () => {
describe('ToolbarContentComponent', () => {
  let component: ToolbarContentComponent;
  let fixture: ComponentFixture<ToolbarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule, MatToolbarModule
      ],
      declarations: [
        CnsLogoIconComponent, GithubIconComponent, MenuIconComponent,
        ToolbarContentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
