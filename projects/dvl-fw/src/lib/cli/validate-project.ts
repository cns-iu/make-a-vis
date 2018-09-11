const fs = require('fs');

import { ProjectSerializer } from '../shared/project-serializer';

async function validate(inYAML, outBase) {
  let yamlString = fs.readFileSync(inYAML, 'utf8');

  // Read original YAML and write back out to JSON and YAML
  let project = await ProjectSerializer.fromYAML(yamlString);
  let data = await ProjectSerializer.toJSON(project);
  fs.writeFileSync(`${outBase}.1.json`, JSON.stringify(data, null, 2), 'utf8');

  yamlString = await ProjectSerializer.toYAML(project);
  fs.writeFileSync(`${outBase}.1.yml`, yamlString, 'utf8');

  // Read re-written YAML and write back out to JSON and YAML
  project = await ProjectSerializer.fromYAML(yamlString);
  data = await ProjectSerializer.toJSON(project);
  fs.writeFileSync(`${outBase}.2.json`, JSON.stringify(data, null, 2), 'utf8');

  yamlString = await ProjectSerializer.toYAML(project);
  fs.writeFileSync(`${outBase}.2.yml`, yamlString, 'utf8');
}

const args = process.argv.slice(2);
validate(args[0], args[1]).then(() => {
  console.log('YML file is valid.');
  process.exit();
});
