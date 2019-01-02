import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendModule } from '@ngx-dino/legend';
import { YAxisComponent } from './y-axis/y-axis.component';
import { XAxisComponent } from './x-axis/x-axis.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { StartComponent } from './start/start.component';
import { EndComponent } from './end/end.component';
import { LabelComponent } from './label/label.component';
import { ThicknessComponent } from './thickness/thickness.component';
import { ShapeComponent } from './shape/shape.component';
import { ColorAreaComponent } from './color-area/color-area.component';
import { AreaSizeComponent } from './area-size/area-size.component';
import { GradientComponent } from './gradient/gradient.component';
import { ColorEdgesComponent } from './color-edges/color-edges.component';
import { SourceComponent } from './source/source.component';
import { TargetComponent } from './target/target.component';


@NgModule({
  imports: [
    CommonModule,
    LegendModule
  ],
  declarations: [YAxisComponent, XAxisComponent, IdentifierComponent,
     StartComponent, EndComponent, LabelComponent, ThicknessComponent, ShapeComponent,
     ColorAreaComponent, AreaSizeComponent, GradientComponent, ColorEdgesComponent, SourceComponent, TargetComponent],
  entryComponents: [YAxisComponent, XAxisComponent, IdentifierComponent, StartComponent,
     EndComponent, LabelComponent, ThicknessComponent, ShapeComponent, ColorAreaComponent,
      AreaSizeComponent, GradientComponent, ColorEdgesComponent, SourceComponent, TargetComponent]
})
export class StaticLegendModule { }
