const { name } = require('./package.json')
const { resolve } = require('path')

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  globals: {
    tsConfig: resolve(__dirname, 'tsconfig.json')
  }
}