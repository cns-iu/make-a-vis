import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { LightThemeComponent } from './light-theme/light-theme.component';
import { MakeAVisComponent } from './make-a-vis.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

// Submodules
// Themes
describe('MakeAVisComponent', () => {
  let component: MakeAVisComponent;
  let fixture: ComponentFixture<MakeAVisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DataViewModule,
        LegendViewModule,
        ToolbarModule,
        VisualizationViewModule,

        StoreModule.forRoot({})
      ],
      declarations: [LightThemeComponent, MakeAVisComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
