import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAVisComponent } from './make-a-vis.component';

describe('MakeAVisComponent', () => {
  let component: MakeAVisComponent;
  let fixture: ComponentFixture<MakeAVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeAVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
