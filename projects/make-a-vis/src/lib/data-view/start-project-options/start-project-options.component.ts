import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get } from 'lodash';

import { LoadProjectService, ProjectExtensionType } from '../../shared/services/load-project/load-project.service';

@Component({
  selector: 'mav-start-project-options',
  templateUrl: './start-project-options.component.html',
  styleUrls: ['./start-project-options.component.scss']
})
export class StartProjectOptionsComponent {
  @ViewChildren('startProjectFileInputTag') fileInputTags: QueryList<ElementRef>;
  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi', 'csv'];

  constructor(public loadProjectService: LoadProjectService, public snackBar: MatSnackBar) { }

  readNewFile(event: any, target: any, selectedExtension: ProjectExtensionType) {
    const numFiles = get(event, 'srcElement.files.length');
    let areValidExtensions = false;
    const filenames: string[] = [];

    for (let i = 0; i < numFiles; i++) {
      const filename = get(event, 'srcElement.files[' + i + '].name');
      filenames.push(filename);

      if (!filename) {
        return;
      }

      const fileExtension = filename && filename.split('.').slice(-1).toString().toLowerCase();
      if (this.isValidFileExtension(selectedExtension, fileExtension)) {
        areValidExtensions = true;
      } else {
        areValidExtensions = false;
        // TODO temporary, use logs
        // alert(`${filename} has the wrong extension.`);
        this.snackBar.open(`${filename} has the wrong extension.`, null, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'mav-snackbar-wrapper'
        });

        console.error(`${filename} has the wrong extension.`);
      }
    }

    if (areValidExtensions) {
      this.loadProjectService.getProject(filenames, selectedExtension, event);
    }

    //  clear the values of fileinput tags.
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
