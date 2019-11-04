import { Injectable, ElementRef, QueryList } from '@angular/core';
import { ProjectExtensionType, LoadProjectService } from '../load-project/load-project.service';
import { get } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ReadNewFileService {

  constructor(
    public loadProjectService: LoadProjectService,
    public snackBar: MatSnackBar
  ) {}

  /**
  * Determines whether the file extension of the file uploaded is the same as the intended extension
  * @param selectedExtension selected file extension
  * @param fileExtension the uploaded file's extension
  * @returns true if valid file extension
  */
  isValidFileExtension(selectedExtensionOnButton: ProjectExtensionType, fileExtensionFromFile: ProjectExtensionType) {
    return this.loadProjectService.getSupportedExtension(selectedExtensionOnButton).split(',').indexOf('.' + fileExtensionFromFile) !== -1;
  }

  load(event: any, selectedExtension: ProjectExtensionType, fileInputTags: QueryList<ElementRef>) {
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
    if (fileInputTags) {
      fileInputTags.forEach((elementRef: ElementRef) => {
        elementRef.nativeElement.value = null;
      });
    }
  }
}
