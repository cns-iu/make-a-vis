// Latest options can be found at
// https://github.com/alafr/SVG-to-PDFKit

import { InjectionToken } from '@angular/core';

export interface ExportToPdfOptions {
  width: number;
  height: number;
  preserveAspectRatio: string;
  useCSS: boolean;
  fontCallback: Function;
  imageCallback: Function;
  documentCallback: Function;
  colorCallback: Function;
  warningCallback: Function;
  assumePt: boolean;
  precision: number;
}

export type PdfOptions = Partial<ExportToPdfOptions>;
export const pdfOptionsToken = new InjectionToken<PdfOptions>('Pdf options', {
  providedIn: 'root',
  factory: () => ({})
});
