import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIconComponent } from './edit-icon.component';

describe('EditIconComponent', () => {
  let component: EditIconComponent;
  let fixture: ComponentFixture<EditIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
