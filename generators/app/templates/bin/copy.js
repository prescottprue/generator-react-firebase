(function () {
  const fs = require('fs-extra')
  const path = require('path')
  fs.copySync(path.resolve(__dirname, '..', 'assets/'), 'build/')
})()
