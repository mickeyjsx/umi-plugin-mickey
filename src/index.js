export default function (api) {
  const { RENDER } = api.placeholder

  api.register('modifyEntryFile', ({ memo }) => memo.replace(
    RENDER,
    `
    const start = require('../../start').default;
    start(require('./router').default)
    `,
  ))
}
