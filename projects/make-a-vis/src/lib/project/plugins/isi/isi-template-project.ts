import { Project } from '../../shared/project';


export class ISITemplateProjectFactory {
  static create(isiFileContent: string): Project {
    return null;
  }
}

export class ISITemplateProject extends Project {
  constructor(isiFileContent: string) {
    super();
  }
}
