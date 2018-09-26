import { Injectable } from '@angular/core';
import PDFDocument from 'pdfkit';
import * as BlobStream from 'blob-stream';
import { saveAs } from 'file-saver';
import SVGtoPDF from 'svg-to-pdfkit';

@Injectable({
  providedIn: 'root'
})
export class ExportToPdfService {

  constructor() { }

  getSnapShot(element: HTMLElement, fileName: string, exportToPdfOptions: any, xCordinateOfPdf: number, yCordinateOfPdf: number) {
    const pdfKitDoc = new PDFDocument;
    const blobStream = BlobStream;
    const stream = pdfKitDoc.pipe(blobStream());

    SVGtoPDF(pdfKitDoc, element, xCordinateOfPdf, yCordinateOfPdf, exportToPdfOptions);
    pdfKitDoc.end();
    stream.on('finish', () => {
      const self = this;
      const blob = stream.toBlob('application/pdf');
      saveAs(blob, fileName);
    });
  }
}
