import { Component, OnInit } from '@angular/core';
import { get } from 'lodash';

import { LoadProjectService, ProjectExtensionType } from '../../shared/services/load-project/load-project.service';

@Component({
  selector: 'mav-start-project-options',
  templateUrl: './start-project-options.component.html',
  styleUrls: ['./start-project-options.component.scss']
})
export class StartProjectOptionsComponent implements OnInit {

  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi'];

  constructor( private loadProjectService: LoadProjectService) { }

  ngOnInit() {
  }

  readNewFile(event: any, selectedExtension: ProjectExtensionType) {
    const filename = get(event, 'srcElement.files[0].name');
    const fileExtension = filename && filename.split('.').slice(-1).toString();
    if (this.isValidFileExtension(selectedExtension , fileExtension.toLowerCase())) {
      this.loadProjectService.getProject(filename, selectedExtension, event);
    } else {
      // TODO temporary, use logs
      alert(`${filename} has the wrong extension.`);
      console.log(`${filename} has the wrong extension.`);
    }
  }

  isValidFileExtension(selectedExtensionOnButton, actualFileExtension) {
    if (selectedExtensionOnButton === 'nsf') {
      return (actualFileExtension === 'csv' || actualFileExtension === 'nsf');
    }
    return selectedExtensionOnButton === actualFileExtension;
  }

}
