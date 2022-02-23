/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const HandlebarsPlugin = require('handlebars-webpack-plugin');
const webpackConfiguration = require('../webpack.config');

module.exports = merge(webpackConfiguration, {
  mode: 'production',

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,

  /* Optimization configuration */
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /* Additional plugins configuration */
  plugins: [
    new HandlebarsPlugin({
      // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), 'app', 'src", "**", "*.hbs"),
      entry: path.join(process.cwd(), 'src', 'layouts', '*.hbs'),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), 'src', '[name].html'),
      // you can also add a [path] variable, which will emit the files with their relative path, like
      // output: path.join(process.cwd(), 'build', [path], '[name].html'),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), 'src', 'layouts', 'components', '**', '**', '*.hbs')
      ],
 
      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
      // onBeforeSetup: function (Handlebars) {},
      // onBeforeAddPartials: function (Handlebars, partialsMap) {},
      // onBeforeCompile: function (Handlebars, templateContent) {},
      // onBeforeRender: function (Handlebars, data, filename) {},
      // onBeforeSave: function (Handlebars, resultHtml, filename) {},
      // onDone: function (Handlebars, filename) {}
    }),
  ],
});
