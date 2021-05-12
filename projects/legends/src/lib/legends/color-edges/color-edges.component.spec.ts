import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorEdgesComponent } from './color-edges.component';

describe('ColorEdgesComponent', () => {
  let component: ColorEdgesComponent;
  let fixture: ComponentFixture<ColorEdgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorEdgesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorEdgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
