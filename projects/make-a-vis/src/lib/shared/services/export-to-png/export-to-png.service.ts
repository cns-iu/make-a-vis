import { Injectable } from '@angular/core';
import { Snapshot } from '../../interfaces/snapshot';
import { saveSvgAsPng, SourceElement } from 'save-svg-as-png';

@Injectable({
  providedIn: 'root'
})
export class ExportToPngService implements Snapshot {


  constructor() { }

  getSnapShot(element: SourceElement, fileName: string) {
    saveSvgAsPng(element, fileName);


  }
}
