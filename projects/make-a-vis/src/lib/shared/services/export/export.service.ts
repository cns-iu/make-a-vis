import { Injectable } from '@angular/core';
import { NewprojectService } from '../newproject/newproject.service';
import { ExportToPngService } from '../export-to-png/export-to-png.service';
import { ExportToSvgService } from '../export-to-svg/export-to-svg.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  visualizationElement: any = null;
  selectedTab: number = null;


  constructor(private exportToSvgService: ExportToSvgService,
              private exportToPngService: ExportToPngService) { }


  exportToPng() {
    this.exportToPngService.getSnapShot(this.visualizationElement._elementRef.nativeElement.querySelectorAll('.active svg')[0],
                                        'mypng.png');

  }

  exportToSvg() {
    this.exportToSvgService.getSnapShot(this.visualizationElement._elementRef.nativeElement.querySelectorAll('.active svg')[0],
                                        'mysvg.svg');
  }

  }
