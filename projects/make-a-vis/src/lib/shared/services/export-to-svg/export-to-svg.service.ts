import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportToSvgService {

  constructor() { }

  getSnapShot(element: any, fileName: string) {
    element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const svgData = element.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData], {type: 'image/svg+xml;charset=utf-8'});
    saveAs(svgBlob, fileName);
  }
}
