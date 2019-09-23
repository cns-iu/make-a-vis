// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeomapModule as NgxGeomapModule } from '@ngx-dino/geomap';

import { GeomapComponent } from './geomap.component';

@NgModule({
  imports: [CommonModule, NgxGeomapModule],
  declarations: [GeomapComponent],
  entryComponents: [GeomapComponent]
})
export class GeomapModule { }
