import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVegaComponent } from './ngx-vega.component';

describe('NgxVegaComponent', () => {
  let component: NgxVegaComponent;
  let fixture: ComponentFixture<NgxVegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxVegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
