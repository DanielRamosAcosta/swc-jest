const swc = require("@swc/core")
const convert = require("convert-source-map")
const { SwcConfigReader } = require("./SwcConfigReader")

function createTransformer(swcConfigReader = new SwcConfigReader()) {
  const config = swcConfigReader.read()

  return {
    process(src, filename) {
      const result = swc.transformSync(src, {
        filename,
        sourceMaps: true,
        ...config, // This config is going to be merged with Swc config file
      })

      const sourceMapComment = convert.fromJSON(result.map).toComment()

      return {
        code: result.code + "\n" + sourceMapComment,
        map: JSON.parse(result.map),
      }
    },
  }
}

module.exports = {
  createTransformer,
}
