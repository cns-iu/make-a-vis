// This file is required by karma.conf.js and loads recursively all the .spec and framework files

declare const require: any;

// Find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

// Forces linter to recognize this file as a module when there are no imports
export type ForceModule = any;
