import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Material
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { createStubComponent } from '../../../testing/utility';
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
        ...[
          'cns-logo', 'github', 'menu'
        ].map((name) => createStubComponent(`mav-${name}-icon`)),
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

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
