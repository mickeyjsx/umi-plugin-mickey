import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default function (api, options = {}) {
  const {
    entry = './src/index.jsx',
    name = 'main',
    filehash = false,
  } = options

  const { RENDER } = api.placeholder
  const filepath = path.resolve(process.cwd(), entry)

  api.register('modifyEntryFile', ({ memo }) => memo.replace(
    RENDER,
    `
    const start = require('${filepath}').default;
    start(require('./router').default)
    `,
  ))

  if (!filehash || name) {
    api.register('modifyWebpackConfig', ({ memo }) => {
      if (name) {
        memo.entry = { [name]: memo.entry.umi }
      }

      if (!filehash) {
        memo.output.filename = '[name].js'
        memo.output.chunkFilename = '[name].async.js'
        memo.plugins = memo.plugins.map((plugin) => {
          if (plugin instanceof ExtractTextPlugin) {
            return new ExtractTextPlugin({
              filename: '[name].css',
              allChunks: true,
            })
          }

          return plugin
        })
      }

      return memo
    })
  }
}
