var path = require('path');
var shell = require('shelljs');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
    fs: true
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
      '@dvl-fw/ngx-dino': path.resolve('dist/dvl-fw-ngx-dino'),
      '@dvl-fw/nsf': path.resolve('dist/dvl-fw-nsf'),
      '@dvl-fw/network': path.resolve('dist/network'),
      '@dvl-fw/science-map': path.resolve('dist/science-map'),
    },
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve('dist', 'dvl-fw-cli')
  },

  plugins: [
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
    },
  ]
};
