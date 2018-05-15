import path from 'path'

export default function (api, options = {}) {
  const {
    entry = './src/index.jsx',
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
}
