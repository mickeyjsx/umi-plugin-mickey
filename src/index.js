import path from 'path'

export default function (api, options = {}) {
  const {
    entry = './src/index.jsx',
  } = options

  const filepath = api.winPath(path.resolve(process.cwd(), entry));

  api.modifyEntryRender(`
    const start = require('${filepath}').default;
    start(require('./router').default)
  `)
}
