import { Injectable, Inject } from '@angular/core';
import { ExportToPngService } from '../export-to-png/export-to-png.service';
import { ExportToSvgService } from '../export-to-svg/export-to-svg.service';
import { ExportToPdfService } from '../export-to-pdf/export-to-pdf.service';
import { PdfOptions, pdfOptionsToken } from './exportToPdfOptions.type';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  visualizationElement: any = null;
  selectedTab: number = null;

  constructor(
    private exportToSvgService: ExportToSvgService,
    private exportToPngService: ExportToPngService,
    private exportToPdfService: ExportToPdfService,
    @Inject(pdfOptionsToken) private pdfOptions: PdfOptions
  ) { }

  getVisualizationElement() {
    return this.visualizationElement._elementRef.nativeElement.querySelectorAll('.active svg')[0];
  }

  exportToPng() {
    this.exportToPngService.getSnapShot(
      this.getVisualizationElement(),
      'visualisation.png'
    );
  }

  exportToSvg() {
    this.exportToSvgService.getSnapShot(
      this.getVisualizationElement(),
      'visualisation.svg');
  }

  exportToPdf() {
    this.pdfOptions.useCSS = true;
    this.exportToPdfService.getSnapShot(
      this.getVisualizationElement(),
      'visualisation.pdf',
      this.pdfOptions,
      0,
      0
    );
  }
}
