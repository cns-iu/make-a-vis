import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Submodules
import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

// Themes
import { LightThemeComponent } from './light-theme/light-theme.component';

import { MakeAVisComponent } from './make-a-vis.component';

describe('MakeAVisComponent', () => {
  let component: MakeAVisComponent;
  let fixture: ComponentFixture<MakeAVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataViewModule, LegendViewModule, ToolbarModule, VisualizationViewModule],
      declarations: [LightThemeComponent, MakeAVisComponent]
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
