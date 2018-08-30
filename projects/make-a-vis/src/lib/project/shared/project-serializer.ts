import { Project } from './project';
import { safeDump, safeLoad } from 'js-yaml';


export class ProjectSerializer {
  static toJSON(project: Project): any {
    return {};
  }
  static fromJSON(data: any): Project {
    return null;
  }

  static toYAML(project: Project): string {
    const data = ProjectSerializer.toJSON(project);
    return safeDump(data);
  }
  static fromYAML(yaml: string): Project {
    const data = safeLoad(yaml);
    return ProjectSerializer.fromJSON(data);
  }
}
