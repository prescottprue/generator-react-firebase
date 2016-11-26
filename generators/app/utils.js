var chalk = require('chalk')

module.exports = {
  firebaseUrlValidate: function (input) {
    if (!input) return false
    if (input.match('http') || input.match('firebaseio.com')) {
      return chalk.red('Just include the Firebase name, not the entire URL')
    }
    if (!input.match(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)) {
      return chalk.red('Your Firebase name may only contain [a-z], [0-9], and hyphen (-). ' +
        'It may not start or end with a hyphen.')
    }
    return true
  }
}
