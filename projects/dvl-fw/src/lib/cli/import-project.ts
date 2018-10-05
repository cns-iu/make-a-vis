const fs = require('fs');

import { ProjectSerializer } from '../shared/project-serializer';
import { ISITemplateProject } from '../plugins/isi/isi-template-project';
import { NSFTemplateProject } from '../plugins/nsf/nsf-template-project';

async function importProject(template, inData, outYAML) {
  if (template === 'isi') {
      const fileContents = fs.readFileSync(inData, 'utf8').trim();
      const project = await ISITemplateProject.create(fileContents);
      const yamlString = await ProjectSerializer.toYAML(project);
      fs.writeFileSync(outYAML, yamlString, 'utf8');
  } else if (template === 'nsf') {
    const fileContents = fs.readFileSync(inData, 'utf8').trim();
    const project = await NSFTemplateProject.create(fileContents);
    const yamlString = await ProjectSerializer.toYAML(project);
    fs.writeFileSync(outYAML, yamlString, 'utf8');
  } else {
    // tslint:disable-next-line:no-string-throw
    throw `Template: ${template} does not exist`;
  }
}

const args = process.argv.slice(2);
importProject(args[0], args[1], args[2]).then(() => {
  process.exit();
});
