// this file is for using nodemon and therefore easy debugging
var express = require('express')
  , server = express()
  , port = process.env.PORT || 5000

server.use(express.logger('dev'));
server.use(express.bodyParser());
server.use(express.methodOverride());
require('../api/routes')(server);

server.listen(port, function () {
  console.log("Express server listening on port " + port);
});
