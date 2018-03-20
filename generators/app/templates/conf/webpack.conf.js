const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [{
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      }]
    }, {
      test: require.resolve('../node_modules/adal-angular/lib/adal.js'),
      use: [{
        loader: 'expose-loader',
        options: 'AuthenticationContext'
      }]
    }, {
      test: /\.(gif|png|jpg|svg)$/,
      exclude: [/fonts\//], // Exclude svg fonts
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
          useRelativePath: process.env.NODE_ENV === 'production'
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          useRelativePath: process.env.NODE_ENV === 'production'
        }
      }]
    }, {
      test: /\.json$/,
      use: [
        'json-loader'
      ]
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        'ng-annotate-loader'
      ]
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'tslint-loader',
      enforce: 'pre'
    }, {
      test: /\.(css|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer]
          }
        }
      ]
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        'ts-loader'
      ]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href']
        }
      }]
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ['frameRedirect'],
      filename: 'index.html',
      template: conf.path.src('index.html')
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ['index'],
      filename: 'frameRedirect.html',
      template: conf.path.src('frameRedirect.html')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        resolve: {},
        ts: {
          configFile: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      },
      debug: true
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts'
    ]
  },
  entry: {
    index: [`./${conf.path.src('index')}`],
    frameRedirect: [`./${conf.path.src('frameRedirect')}`]
  }
};
