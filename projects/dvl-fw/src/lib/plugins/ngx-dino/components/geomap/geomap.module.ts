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
