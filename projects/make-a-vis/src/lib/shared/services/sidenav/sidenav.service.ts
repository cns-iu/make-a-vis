import { Injectable, ViewChild } from '@angular/core';
import { NewprojectService } from '../newproject/newproject.service';
import { ExportToPngService } from '../export-to-png/export-to-png.service';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {




  constructor(private newProjectService: NewprojectService,
              private exportToPngService: ExportToPngService) { }

  getNewProjectData(): string {
    console.log('Get new project data in sidenavservice');
    this.newProjectService.getData();
    return '';
  }

  // exportVisualization(): string {
  //   this.exportService.exportToSvg();
  //   console.log('Export visualisation called in sidenaveservice');
  //   return '';
  // }

  exportToPng(element, fileName) {
    this.exportToPngService.getSnapShot(element, fileName);

  }

}
