const { SwcConfigReader } = require("./SwcConfigReader")

class SwcConfigReaderFake extends SwcConfigReader {
  constructor(config) {
    super()
    this.config = config
  }

  read() {
    return this.config
  }
}

module.exports = {
  SwcConfigReaderFake,
}
