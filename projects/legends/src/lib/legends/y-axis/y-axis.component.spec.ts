import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YAxisComponent } from './y-axis.component';

describe('YAxisComponent', () => {
  let component: YAxisComponent;
  let fixture: ComponentFixture<YAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
