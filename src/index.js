import path from 'path'

export default function (api, options = {}) {
  const {
    entry = './src/index.jsx',
  } = options

  const filepath = path.resolve(process.cwd(), entry)

  api.addEntryCodeAhead(`
  const start = require('${filepath}').default;
  start(require('./router').default)
  `)
}
