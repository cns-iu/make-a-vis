import { Injectable } from '@angular/core';
import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream-browserify';
import { saveAs } from 'file-saver';
import SVGtoPDF from 'svg-to-pdfkit';

@Injectable({
  providedIn: 'root'
})
export class ExportToPdfService {
  getSnapShot(element: HTMLElement, fileName: string, exportToPdfOptions: any, xCordinateOfPdf: number, yCordinateOfPdf: number) {
    const pdfKitDoc = new PDFDocument();
    const stream = pdfKitDoc.pipe(blobStream());

    SVGtoPDF(pdfKitDoc, element, xCordinateOfPdf, yCordinateOfPdf, exportToPdfOptions);
    pdfKitDoc.end();
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      saveAs(blob, fileName);
    });
  }
}
