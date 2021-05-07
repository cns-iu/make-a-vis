import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVariableDropzoneComponent } from './data-variable-dropzone.component';

describe('DataVariableDropzoneComponent', () => {
  let component: DataVariableDropzoneComponent;
  let fixture: ComponentFixture<DataVariableDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataVariableDropzoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVariableDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
