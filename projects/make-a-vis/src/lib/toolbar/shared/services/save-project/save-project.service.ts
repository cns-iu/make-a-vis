import { Injectable } from '@angular/core';
import { Project, ProjectSerializerService } from 'dvl-fw';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SaveProjectService {

  constructor(private projectSerializerService: ProjectSerializerService)  { }

  save(project: Project) {
    this.projectSerializerService.toYAML(project).subscribe((yamlString) => {
      const yamlBlob = new Blob([yamlString], {type: 'text/yaml;charset=utf-8'});
      saveAs(yamlBlob, 'Project-' + new Date().toLocaleString() + '.yml');
    });
  }
}
