import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { SidenavState, SaveProjectStarted, SaveProjectCompleted } from '../../store';

import { Project, ProjectSerializerService } from 'dvl-fw';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SaveProjectService {

  constructor(private projectSerializerService: ProjectSerializerService, private store: Store<SidenavState>)  { }

  save(project: Project) {
    this.store.dispatch(new SaveProjectStarted(true));
    this.projectSerializerService.toYAML(project).subscribe((yamlString) => {
      const yamlBlob = new Blob([yamlString], {type: 'text/yaml;charset=utf-8'});
      saveAs(yamlBlob, 'Project-' + new Date().toLocaleString() + '.yml');
      this.store.dispatch(new SaveProjectCompleted({ savingProject: false, project: project}));
    });
  }
}
