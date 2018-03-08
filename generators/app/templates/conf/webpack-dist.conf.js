const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }]
      },
      {
        test: require.resolve('../node_modules/adal-angular/lib/adal.js'),
        use: [{
          loader: 'expose-loader',
          options: 'AuthenticationContext'
        }]
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images/',
            useRelativePath: process.env.NODE_ENV === 'production'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            useRelativePath: process.env.NODE_ENV === 'production'
          }
        }]
      },
      {
        test: /\.json$/,
        use: [
          'json-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ng-annotate-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(css|csss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          }]
        })
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      }
    ]
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      // Exclude: /vendor.*\.js$/,
      output: {
        comments: false
      },
      compress: {
        unused: true,
        dead_code: true, // eslint-disable-line camelcase
        warnings: false
      }
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        // This assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
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
      }
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
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
    frameRedirect: [`./${conf.path.src('frameRedirect')}`],
    vendor: Object.keys(pkg.dependencies)
  }
};
