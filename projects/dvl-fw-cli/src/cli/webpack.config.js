var path = require('path');
var shell = require('shelljs');
var nodeExternals = require('webpack-node-externals');
// var { ConcatSource } = require('webpack-sources');


// NOTE: This is the new way webpack does plugin in version 5.
// Reenable this code when upgrading.
// Should only be done when @angular-devkit/build-angular can be upgraded to version 12!

// class MakeExecutablePlugin {
//   constructor(files) {
//     this.files = files;
//   }

//   apply(compiler) {
//     compiler.hooks.thisCompilation.tap('MakeExecutablePlugin', compilation => {
//       compilation.hooks.processAssets.tap('MakeExecutablePlugin', assets => {
//         // Switch js files for executables
//         this.files.forEach(file => {
//           const jsFile = file + '.js';
//           const asset = assets[jsFile];
//           delete assets[jsFile];

//           assets[file] = new ConcatSource(
//             '#!/usr/bin/env node\n',
//             asset
//           );
//         });
//       });
//     });

//     compiler.hooks.assetEmitted.tap('MakeExecutablePlugin', (file, { targetPath }) => {
//       // Set permissions for executables
//       if (this.files.some(f => f === file)) {
//         shell.chmod(755, targetPath);
//       }
//     });
//   }
// }


module.exports = {
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  entry: {
    'dvl-fw-validate': path.resolve(__dirname, 'validate-project.ts'),
    'dvl-fw-import': path.resolve(__dirname, 'import-project.ts'),
  },
  // mode: 'production',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.[tj]sx?$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  resolve: {
    alias: {
      '@dvl-fw/core': path.resolve('dist/dvl-fw-core'),
      '@dvl-fw/isi': path.resolve('dist/dvl-fw-isi'),
      '@dvl-fw/nsf': path.resolve('dist/dvl-fw-nsf'),
      '@dvl-fw/legends': path.resolve('dist/legends'),
      '@dvl-fw/geomap': path.resolve('dist/geomap'),
      '@dvl-fw/network': path.resolve('dist/network'),
      '@dvl-fw/scatterplot': path.resolve('dist/scatterplot'),
      '@dvl-fw/science-map': path.resolve('dist/science-map'),
      '@dvl-fw/temporal-bargraph': path.resolve('dist/temporal-bargraph'),
      'geocoder-ts': path.resolve('dist/geocoder-ts'),
      'ngx-vega': path.resolve('dist/ngx-vega')
    },
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve('dist', 'dvl-fw-cli')
  },

  plugins: [
    // new MakeExecutablePlugin([
    //   'dvl-fw-validate',
    //   'dvl-fw-import'
    // ])

    // This is the webpack version 4 plugin.
    // Remove when upgrading to webpack version 5.
    function () {
      function mkExecutable(dist, fname) {
        shell
          .echo('#!/usr/bin/env node\n')
          .cat(path.resolve(dist, fname + '.js'))
          .to(path.resolve(dist, fname));
        shell.chmod(755, path.resolve(dist, fname));
        shell.rm(path.resolve(dist, fname + '.js'));
      }
      this.plugin('done', function() {
        var dist = path.resolve('dist', 'dvl-fw-cli');
        mkExecutable(dist, 'dvl-fw-validate');
        mkExecutable(dist, 'dvl-fw-import');
      });
    }
  ]
};
