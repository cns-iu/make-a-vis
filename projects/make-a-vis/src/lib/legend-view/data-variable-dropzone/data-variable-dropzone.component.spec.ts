import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVariableDropzoneComponent } from './data-variable-dropzone.component';

describe('FieldDropzoneComponent', () => {
  let component: DataVariableDropzoneComponent;
  let fixture: ComponentFixture<DataVariableDropzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVariableDropzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVariableDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
