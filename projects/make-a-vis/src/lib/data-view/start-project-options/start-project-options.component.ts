import { Component, OnInit } from '@angular/core';
import { get } from 'lodash';

import { LoadProjectService, ProjectExtensionType } from '../../shared/services/load-project/load-project.service';

@Component({
  selector: 'mav-start-project-options',
  templateUrl: './start-project-options.component.html',
  styleUrls: ['./start-project-options.component.scss']
})
export class StartProjectOptionsComponent implements OnInit {

  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi', 'csv'];

  constructor( public loadProjectService: LoadProjectService) { }

  ngOnInit() {
  }

  readNewFile(event: any, selectedExtension: ProjectExtensionType) {
    const filename = get(event, 'srcElement.files[0].name');
    if (!filename) {
      return;
    }
    const fileExtension = filename && filename.split('.').slice(-1).toString().toLowerCase();
    if (this.isValidFileExtension(selectedExtension, fileExtension)) {
      this.loadProjectService.getProject(filename, selectedExtension, event);
    } else {
      // TODO temporary, use logs
      alert(`${filename} has the wrong extension.`);
      console.log(`${filename} has the wrong extension.`);
    }
  }

  isValidFileExtension(selectedExtensionOnButton: ProjectExtensionType, fileExtensionFromFile: ProjectExtensionType): boolean {
    return this.loadProjectService.getSupportedExtension(selectedExtensionOnButton).split(',').indexOf('.' + fileExtensionFromFile) !== -1;
  }
}
