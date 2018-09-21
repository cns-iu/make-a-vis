import { Injectable } from '@angular/core';
import { saveSvgAsPng, SourceElement } from 'save-svg-as-png';

@Injectable({
  providedIn: 'root'
})
export class ExportToPngService {


  constructor() { }

  // TODO: This will work in IE only if we send the third parameter canvg.
  // https://stackoverflow.com/questions/48281895/not-able-to-download-svg-as-png-in-ie#
  // https://github.com/canvg/canvg
  getSnapShot(element: SourceElement, fileName: string) {
    saveSvgAsPng(element, fileName);


  }
}
