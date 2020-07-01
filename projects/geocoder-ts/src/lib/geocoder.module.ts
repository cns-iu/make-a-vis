import { NgModule } from '@angular/core';
import { GeocoderComponent } from './geocoder.component';
import { HttpClientModule } from '@angular/common/http';
import { GeocoderService } from './geocoder.service';
import { Geocoder } from './geocoder';



@NgModule({
  declarations: [GeocoderComponent],
  imports: [HttpClientModule],
  exports: [GeocoderComponent],
  providers: []
})
export class GeocoderModule { }
