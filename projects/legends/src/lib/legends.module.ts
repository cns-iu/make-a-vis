import { NgModule } from '@angular/core';
import { LegendModule } from '@ngx-dino/legend';

import {
  YAxisComponent, XAxisComponent, IdentifierComponent, StartComponent,
  EndComponent, LabelComponent, ThicknessComponent, ShapeComponent,
  ColorAreaComponent, AreaSizeComponent, GradientComponent, ColorEdgesComponent,
  SourceComponent, TargetComponent, ColorComponent, EdgeSizeComponent, NodeSizeComponent
} from './legends';


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
