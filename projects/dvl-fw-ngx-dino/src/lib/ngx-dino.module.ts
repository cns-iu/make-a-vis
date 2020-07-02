import { NgModule } from '@angular/core';
import { LegendModule } from '@ngx-dino/legend';

import { AreaSizeComponent } from './visualizations/area-size/area-size.component';
import { ColorAreaComponent } from './visualizations/color-area/color-area.component';
import { ColorEdgesComponent } from './visualizations/color-edges/color-edges.component';
import { ColorComponent } from './visualizations/color/color.component';
import { EdgeSizeComponent } from './visualizations/edge-size/edge-size.component';
import { EndComponent } from './visualizations/end/end.component';
import { GradientComponent } from './visualizations/gradient/gradient.component';
import { IdentifierComponent } from './visualizations/identifier/identifier.component';
import { LabelComponent } from './visualizations/label/label.component';
import { NodeSizeComponent } from './visualizations/node-size/node-size.component';
import { ShapeComponent } from './visualizations/shape/shape.component';
import { SourceComponent } from './visualizations/source/source.component';
import { StartComponent } from './visualizations/start/start.component';
import { TargetComponent } from './visualizations/target/target.component';
import { ThicknessComponent } from './visualizations/thickness/thickness.component';
import { XAxisComponent } from './visualizations/x-axis/x-axis.component';
import { YAxisComponent } from './visualizations/y-axis/y-axis.component';


@NgModule({
  declarations: [
    YAxisComponent, XAxisComponent, IdentifierComponent, StartComponent,
    EndComponent, LabelComponent, ThicknessComponent, ShapeComponent,
    ColorAreaComponent, AreaSizeComponent, GradientComponent, ColorEdgesComponent,
    SourceComponent, TargetComponent, ColorComponent, EdgeSizeComponent, NodeSizeComponent
  ],
  imports: [LegendModule],
  exports: [
    YAxisComponent, XAxisComponent, IdentifierComponent, StartComponent,
    EndComponent, LabelComponent, ThicknessComponent, ShapeComponent,
    ColorAreaComponent, AreaSizeComponent, GradientComponent, ColorEdgesComponent,
    SourceComponent, TargetComponent, ColorComponent, EdgeSizeComponent, NodeSizeComponent
  ]
})
export class NgxDinoModule { }
