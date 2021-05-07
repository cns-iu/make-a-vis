import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSizeComponent } from './area-size.component';

describe('AreaSizeComponent', () => {
  let component: AreaSizeComponent;
  let fixture: ComponentFixture<AreaSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
