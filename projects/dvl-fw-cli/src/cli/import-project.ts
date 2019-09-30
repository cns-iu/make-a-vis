import { CSVTemplateProject, ProjectSerializer } from '@dvl-fw/core';
import { ISITemplateProject } from '@dvl-fw/isi';
import { NSFTemplateProject } from '@dvl-fw/nsf';
import * as fs from 'fs';
import * as path from 'path';

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
  } else if (template === 'csv') {
    const fileContents = fs.readFileSync(inData, 'utf8').trim();
    const fileName = path.basename(inData);
    const project = await CSVTemplateProject.create(fileContents, fileName);
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
