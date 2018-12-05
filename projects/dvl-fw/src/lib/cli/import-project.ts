const fs = require('fs');
const path = require('path');

import { ProjectSerializer } from '../shared/project-serializer';
import { ISITemplateProject } from '../plugins/isi/isi-template-project';
import { NSFTemplateProject } from '../plugins/nsf/nsf-template-project';

async function importProject(template, inData, outYAML) {
  if (template === 'isi') {
      const fileContents = fs.readFileSync(inData, 'utf8').trim();
      const fileName = path.basename(inData);
      const project = await ISITemplateProject.create(fileContents, fileName);
      const yamlString = await ProjectSerializer.toYAML(project);
      fs.writeFileSync(outYAML, yamlString, 'utf8');
  } else if (template === 'nsf') {
    const fileContents = fs.readFileSync(inData, 'utf8').trim();
    const fileName = path.basename(inData);
    const project = await NSFTemplateProject.create(fileContents, fileName);
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
