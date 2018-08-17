import { Project } from './project';
import { safeDump, safeLoad } from 'js-yaml';
import { deflate, inflate } from 'pako';

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

  static compressFile(fileContents: string): string {
    return deflate(fileContents, { to: 'string' });
  }
  static decompressFile(compressedContents: string): string {
    return inflate(compressedContents, { to: 'string' });
  }
}
