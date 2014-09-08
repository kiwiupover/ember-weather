module.exports = function(app) {
  var express = require('express');
  var weatherServerRouter = express.Router();
  weatherServerRouter.get('/', function(req, res) {
    res.send({weather-server:[]});
  });
  app.use('/api/weather-server', weatherServerRouter);
};
