import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThicknessComponent } from './thickness.component';

describe('ThicknessComponent', () => {
  let component: ThicknessComponent;
  let fixture: ComponentFixture<ThicknessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThicknessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThicknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
