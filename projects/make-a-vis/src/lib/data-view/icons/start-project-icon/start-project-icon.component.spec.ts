import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MockComponents } from 'ng-mocks';

import { StartProjectOptionsComponent } from '../../start-project-options/start-project-options.component';
import { StartProjectIconComponent } from './start-project-icon.component';

describe('StartProjectIconComponent', () => {
  let component: StartProjectIconComponent;
  let fixture: ComponentFixture<StartProjectIconComponent>;
  const mockComponents = MockComponents(
    MatIcon,
    StartProjectOptionsComponent
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ StartProjectIconComponent ].concat(mockComponents)
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProjectIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
