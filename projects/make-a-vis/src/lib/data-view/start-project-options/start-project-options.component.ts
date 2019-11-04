import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoadProjectService, ProjectExtensionType } from '../../shared/services/load-project/load-project.service';
import { ReadNewFileService } from '../../shared/services/read-new-file/read-new-file.service';

@Component({
  selector: 'mav-start-project-options',
  templateUrl: './start-project-options.component.html',
  styleUrls: ['./start-project-options.component.scss']
})
export class StartProjectOptionsComponent {
  @ViewChildren('startProjectFileInputTag') fileInputTags: QueryList<ElementRef>;
  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi', 'csv'];

  constructor(
    public loadProjectService: LoadProjectService,
    public snackBar: MatSnackBar,
    private readonly readNewFileService: ReadNewFileService
  ) {}

  /**
  * Reads new file(s)
  * @param event the onload event object
  * @param selectedExtension the intended extension of files
  */
  readNewFile(event: any, selectedExtension: ProjectExtensionType) {
    this.readNewFileService.load(event, selectedExtension, this.fileInputTags);
  }
}
