const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve('src/components'),
      containers: path.resolve('src/containers'),
      actions: path.resolve('src/actions'),
      utils: path.resolve('src/utils')
    },
    extensions: ['.js']
  },
  mode: 'development'
}