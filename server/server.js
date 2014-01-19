var express = require('express')
  , server = express()
  , path = require('path')
  , fs = require('fs')
  , port = process.env.PORT || 5000
  , serverBase = path.resolve(__dirname, '../dist')

server.set('serverBase', serverBase)

require('../api/routes')(server)
server.use(static({ directory: serverBase }));
server.use(static({ file: path.join(serverBase, 'index.html') }));
server.use(static({ file: path.join(serverBase, 'index.html'), ignoredFileExtensions: /\.\w{1,5}$/ }));

server.listen(port, function() {
  console.log("Connect server listenting on port " + port)
})

function static(options) {
  return function(req, res, next) { // Gotta catch 'em all (and serve index.html)
    var filePath = "";
    if (options.directory) {
      var regex = new RegExp('^' + (options.urlRoot || ''));
      // URL must begin with urlRoot's value
      if (!req.path.match(regex)) { next(); return; }
      filePath = options.directory + req.path.replace(regex, '');
    } else if (options.file) {
      filePath = options.file;
    } else { throw new Error('static() isn\'t properly configured!'); }

    fs.stat(filePath, function(err, stats) {
      if (err) { next(); return; } // Not a file, not a folder => can't handle it

      if (options.ignoredFileExtensions) {
        if (options.ignoredFileExtensions.test(req.path)) {
          res.send(404, {error: 'Resource not found'});
          return; // Do not serve index.html
        }
      }

      // Is it a directory? If so, search for an index.html in it.
      if (stats.isDirectory()) { filePath = path.join(filePath, 'index.html'); }

      // Serve the file
      res.sendfile(filePath, function(err) {
        if (err) { next(); return; }
        // TODO: logging with winston
      });
    });
  };
}