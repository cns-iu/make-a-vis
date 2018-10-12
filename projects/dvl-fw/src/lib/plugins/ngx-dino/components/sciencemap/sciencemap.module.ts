import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScienceMapModule as NgxSciencemapModule } from '@ngx-dino/science-map';
import { SciencemapComponent } from './sciencemap.component';

@NgModule({
  imports: [CommonModule, NgxSciencemapModule],
  declarations: [SciencemapComponent],
  entryComponents: [SciencemapComponent]
})
export class SciencemapModule { }
