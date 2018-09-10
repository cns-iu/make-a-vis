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
  entry: path.resolve(__dirname, 'validate-project.ts'),
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
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  externals: [nodeExternals()],
  output: {
    filename: 'mav-validate-project.js',
    path: path.resolve('dist', 'make-a-vis')
  },

  plugins: [
    function () {
      this.plugin('done', function() {
        var dist = path.resolve('dist', 'make-a-vis');
        shell
          .echo('#!/usr/bin/env node\n')
          .cat(path.resolve(dist, 'mav-validate-project.js'))
          .to(path.resolve(dist, 'mav-validate-project'));
        shell.chmod(755, path.resolve(dist, 'mav-validate-project'));
        shell.rm(path.resolve(dist, 'mav-validate-project.js'));
      });
    },
  ]
};
