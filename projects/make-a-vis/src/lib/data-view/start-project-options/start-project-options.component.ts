import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import { get } from 'lodash';

import { LoadProjectService, ProjectExtensionType } from '../../shared/services/load-project/load-project.service';

@Component({
  selector: 'mav-start-project-options',
  templateUrl: './start-project-options.component.html',
  styleUrls: ['./start-project-options.component.scss']
})
export class StartProjectOptionsComponent implements OnInit {
  @ViewChildren('startProjectFileInputTag') fileInputTags: QueryList<ElementRef>;
  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi', 'csv'];

  constructor( public loadProjectService: LoadProjectService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  readNewFile(event: any, target: any, selectedExtension: ProjectExtensionType) {
    const filename = get(event, 'srcElement.files[0].name');
    if (!filename) {
      return;
    }
    const fileExtension = filename && filename.split('.').slice(-1).toString().toLowerCase();
    if (this.isValidFileExtension(selectedExtension, fileExtension)) {
      this.loadProjectService.getProject(filename, selectedExtension, event);
    } else {
      // TODO temporary, use logs
      // alert(`${filename} has the wrong extension.`);
      this.snackBar.open(`${filename} has the wrong extension.`, null, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'mav-snackbar-wrapper'
      });
      console.log(`${filename} has the wrong extension.`);
    }
    // clear the values of fileinput tags.
    if (this.fileInputTags) {
      this.fileInputTags.forEach((elementRef: ElementRef) => {
          elementRef.nativeElement.value = null;
      });
    }
  }

  isValidFileExtension(selectedExtensionOnButton: ProjectExtensionType, fileExtensionFromFile: ProjectExtensionType): boolean {
    return this.loadProjectService.getSupportedExtension(selectedExtensionOnButton).split(',').indexOf('.' + fileExtensionFromFile) !== -1;
  }
}
