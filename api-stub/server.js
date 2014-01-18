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

/*
Notes about the server:
- its not very consistent at the moment, a better example is likely found elsewhere
- server/server.js is used for production. The contents of that file were mostly
  copied from tasks/express-server. It's used by Procfile(heroku/foreman). If u prefer
  nodejitsu, replace the 'start' property of package.json w/ `node server/server.js`
  for similar results. (you've likely spotted lots of duplication/indirection already,
  as was mentioned, this server setup is not 'abstracted' very well ATM - aka -
  dev vs prod, npm start vs nodemon vs foreman, etc -- there are many ways to
  'do your thang'. Please reach out to @trombom if you find something better
  proud of, I'll buy you a beer for each awesome idea you have :).
- this file(api-stub/server.js) is great for use during development, especially while
  editing the api/routes.js file. Run this file with `nodemon api-stub/server.js` and the
  server will restart when editing api or api-stub directories. Then run
  `grunt server:proxy` to tell appkit you want to forward all requests for
  api/* to localhost:5000(where this server is running in the background).
  NOTE: if your dabbling with websockets, this will not work(seriously) - instead
  use http-proxy in place of mikeal/request ;)
- tl;dr - add node serverlogic to api/ directory, servers for different environments
  are started from random ass places at the moment, sorry about that.
 */