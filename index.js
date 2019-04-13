'use strict';

const swc = require('@swc/core')
const convert = require('convert-source-map')

const transformer = {
  process(src, filename) {
    const result = swc.transformSync(src, {
      filename,
      sourceMaps: true,
    })

    const sourceMapComment = convert.fromJSON(result.map).toComment()

    return {
      code: result.code + '\n' + sourceMapComment,
      map: JSON.parse(result.map)
    };
  },
}

module.exports = transformer
