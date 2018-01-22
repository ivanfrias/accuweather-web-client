const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackTapeRun = require('webpack-tape-run')

// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
}

module.exports = [{
  entry: {
    index: './src/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8000,
  },
  module: {
    rules: [
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
     }
   ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'accuweatherClient',
    libraryTarget: 'umd'
  }
}, {
  output: {
    filename: 'index.test.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'web',
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new WebpackTapeRun({
      tapeRun: {
        browser: 'safari'
      },
      reporter: 'tap-spec'
    })
  ],
  entry: './test/index.test.ts',
  module: {
    rules: [
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
     }
   ]
  },
}];
