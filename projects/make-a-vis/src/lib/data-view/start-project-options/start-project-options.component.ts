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

  /**
  * Reads new file(s)
  * @param event the onload event object
  * @param selectedExtension the intended extension of files
  */
  readNewFile(event: any, selectedExtension: ProjectExtensionType) {
    const numFiles = get(event, 'srcElement.files.length');
    let areValidExtensions = false;
    const filenames: string[] = [];

    for (let i = 0; i < numFiles; i++) {
      const filename = get(event, 'srcElement.files[' + i + '].name');

      if (!filename) {
        return;
      }

      filenames.push(filename);
      const fileExtension = filename && filename.split('.').slice(-1).toString().toLowerCase();
      if (this.isValidFileExtension(selectedExtension, fileExtension)) {
        areValidExtensions = true;
      } else {
        areValidExtensions = false;
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

    //  clear the values of file input tags.
    if (this.fileInputTags) {
      this.fileInputTags.forEach((elementRef: ElementRef) => {
        elementRef.nativeElement.value = null;
      });
    }
  }

  /**
  * Determines whether the file extension of the file uploaded is the same as the intended extension
  * @param selectedExtension selected file extension
  * @param fileExtension the uploaded file's extension
  * @returns true if valid file extension
  */
  isValidFileExtension(selectedExtensionOnButton: ProjectExtensionType, fileExtensionFromFile: ProjectExtensionType): boolean {
    return this.loadProjectService.getSupportedExtension(selectedExtensionOnButton).split(',').indexOf('.' + fileExtensionFromFile) !== -1;
  }
}
