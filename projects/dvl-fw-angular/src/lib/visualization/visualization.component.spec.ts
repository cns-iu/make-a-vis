import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvlFwVisualizationComponent } from './visualization.component';


describe('DvlFwVisualizationComponent', () => {
  let component: DvlFwVisualizationComponent;
  let fixture: ComponentFixture<DvlFwVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DvlFwVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DvlFwVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
