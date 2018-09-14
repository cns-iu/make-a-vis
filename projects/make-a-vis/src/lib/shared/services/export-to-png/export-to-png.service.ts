import { Injectable } from '@angular/core';
import { saveSvgAsPng, SourceElement } from 'save-svg-as-png';

@Injectable({
  providedIn: 'root'
})
export class ExportToPngService {


  constructor() { }

  getSnapShot(element: SourceElement, fileName: string) {
    saveSvgAsPng(element, fileName);


  }
}
