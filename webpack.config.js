const path = require('path')

module.exports = {
  mode: "production",
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, 'main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false
  }
}