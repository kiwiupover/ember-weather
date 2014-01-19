var winston = require('winston')
  , fs = require('fs')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , env = process.env.NODE_ENV || 'development' // TODO: fixme for heroku
  , filename = 'server/log/' + env + '.log'
  , filepath = path.dirname(filename)

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      handleExceptions: true
    }),
    new (winston.transports.File)({
      filename: filename,
      handleExceptions: true
    })
  ],
  exitOnError: false
});

module.exports = function () {
  try {
    fs.statSync(filename)
  } catch(e) {
    console.log("error with fs.statSync", e)
    mkdirp.sync(filepath)
    fs.writeFileSync(filename, "")
  } finally {
    return {
      logger: logger
    }
  }
}

