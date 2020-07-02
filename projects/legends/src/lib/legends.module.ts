import { NgModule } from '@angular/core';
import { LegendModule } from '@ngx-dino/legend';

import { AreaSizeComponent } from './legends/area-size/area-size.component';
import { ColorAreaComponent } from './legends/color-area/color-area.component';
import { ColorEdgesComponent } from './legends/color-edges/color-edges.component';
import { ColorComponent } from './legends/color/color.component';
import { EdgeSizeComponent } from './legends/edge-size/edge-size.component';
import { EndComponent } from './legends/end/end.component';
import { GradientComponent } from './legends/gradient/gradient.component';
import { IdentifierComponent } from './legends/identifier/identifier.component';
import { LabelComponent } from './legends/label/label.component';
import { NodeSizeComponent } from './legends/node-size/node-size.component';
import { ShapeComponent } from './legends/shape/shape.component';
import { SourceComponent } from './legends/source/source.component';
import { StartComponent } from './legends/start/start.component';
import { TargetComponent } from './legends/target/target.component';
import { ThicknessComponent } from './legends/thickness/thickness.component';
import { XAxisComponent } from './legends/x-axis/x-axis.component';
import { YAxisComponent } from './legends/y-axis/y-axis.component';


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
export class LegendsModule { }
