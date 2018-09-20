import { NgModule } from '@angular/core';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';
import { VisHostDirective } from './visualization/vis-host.directive';

@NgModule({
  imports: [],
  declarations: [DvlFwVisualizationComponent, VisHostDirective],
  exports: [DvlFwVisualizationComponent]
})
export class DvlFwModule { }
