var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname)
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
