import { Injectable, Inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ExportToPngService } from '../export-to-png/export-to-png.service';
import { ExportToSvgService } from '../export-to-svg/export-to-svg.service';
import { ExportToPdfService } from '../export-to-pdf/export-to-pdf.service';
import { PdfOptions, pdfOptionsToken } from './exportToPdfOptions.type';
import { SidenavState, ExportSnapshotStarted, ExportSnapshotCompleted } from '../../../toolbar/shared/store';


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
    private store: Store<SidenavState>,
    @Inject(pdfOptionsToken) private pdfOptions: PdfOptions
  ) { }

  getVisualizationElement() {
    return this.visualizationElement._elementRef.nativeElement.querySelectorAll('.active svg')[0];
  }

  exportToPng() {
    this.store.dispatch(new ExportSnapshotStarted(true));
    this.exportToPngService.getSnapShot(
      this.getVisualizationElement(),
      'visualisation.png'
    );
    this.store.dispatch(new ExportSnapshotCompleted({
      exportingSnapshot: false,
      snapshotFile: 'visualisation.png',
      snapshotFileType: 'png'
    }));
  }

  exportToSvg() {
    this.store.dispatch(new ExportSnapshotStarted(true));
    this.exportToSvgService.getSnapShot(
      this.getVisualizationElement(),
      'visualisation.svg');
      this.store.dispatch(new ExportSnapshotCompleted({
        exportingSnapshot: false,
        snapshotFile: 'visualisation.svg',
        snapshotFileType: 'svg'
      }));
  }

  exportToPdf() {
    this.store.dispatch(new ExportSnapshotStarted(true));
    this.pdfOptions.useCSS = true;
    this.exportToPdfService.getSnapShot(
      this.getVisualizationElement(),
      'visualisation.pdf',
      this.pdfOptions,
      0,
      0
    );
    this.store.dispatch(new ExportSnapshotCompleted({
      exportingSnapshot: false,
      snapshotFile: 'visualisation.pdf',
      snapshotFileType: 'pdf'
    }));
  }
}
