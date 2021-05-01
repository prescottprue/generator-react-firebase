const config = require('config')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  // We don't need Cypress configuration in our client configuration
  delete config.cypress

  fs.writeFileSync(
    path.resolve(__dirname, 'src/client-config.json'),
    JSON.stringify(config, null, 2)
  )

  return {
    eslint: {
      enable: false
    },
    webpack: {
      alias: {
        // Allow import of config
        config: path.resolve(__dirname, 'src/client-config.json')
      }
    }
  }
}
