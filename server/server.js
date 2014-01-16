var express = require('express')
  , server = express()
  , path = require('path')
  , port = process.env.PORT || 5000
  , serverBase = path.resolve(__dirname, '../dist')
  , fs = require('fs')

server.set('serverBase', serverBase)

require('../api/routes')(server)


server.use(static({ directory: serverBase }));
// server.use(static({ directory: serverBase + '/assets' }));
server.use(static({ file: serverBase + '/index.html' })); // Gotta catch 'em all

// server
  // .use(express.logger())
  // .use(express.bodyParser())
  // .use(express.methodOverride())
  // .get('/dist/index.html', function (req, res) { res.redirect('/') })
  // .use(express.static(serverBase))

  // keep server from being browsable @ /public
  // server.get('/dist', function (req, res) {
  //   res.redirect('/');
  // });
  // server.get('/dist/index.html', function (req, res) {
  //   res.redirect('/');
  // });

  // // serve everything
  server.use('/', express.static(serverBase));

  // // serve /public @ /
  // server.use('/', express.static(path.join(serverBase, 'dist')));


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

      // Is it a directory? If so, search for an index.html in it.
      if (stats.isDirectory()) { filePath = path.join(filePath, 'index.html'); }

      // Serve the file
      res.sendfile(filePath, function(err) {
        if (err) { next(); return; }
        // grunt.verbose.ok('Served: ' + filePath);
      });
    });
  };
}