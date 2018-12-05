var fs = require('fs');
var process = require('child_process');

var packageJson = null;
try{
    packageJson= fs.readFileSync('package.json', 'utf8');
}
catch(err) {
    console.log('Error while reading package.json', err);
}


var version = JSON.parse(packageJson)['version']
process.exec('git log -1 --pretty="%ct" --date=local', {cwd: __dirname}, function(err, stdout, stderr) {
    lastCommitDate = new Date(Number(stdout.trim())*1000);
    var buildInfo = {
        version,
        lastCommitDate: new Date(Number(stdout.trim())*1000).toLocaleString(),
        buildDate: new Date()
    };
    var output = `export const buildInfo = ${JSON.stringify(buildInfo, null, 2)};`;
    output = output.replace(/"/g,'\'') + '\n';
    fs.writeFileSync('projects/make-a-vis/src/lib/toolbar/info-dialog/build-info.ts', output);
  });
