const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')

const devConfig = (env = {}) => merge(baseConfig(env), {
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: 'http://localhost:8081/'
  },
  devServer: {
    host: 'localhost',
    proxy: {
      '/v1': {
        target: 'http://localhost:5000/',
        ws: false,
        secure: false,
        changeOrigin: true
      }
    },
    open: false,
    port: 8081,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /\w+/, to: '/index.html' }
      ]
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = new Promise(res => res(devConfig({ dev: true })))
