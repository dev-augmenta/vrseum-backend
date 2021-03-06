var loopback = require('loopback');
var boot = require('loopback-boot');
var _ = require('underscore');

var app = module.exports = loopback();


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.use('/express-status', function(req, res, next) {
  res.json({ running: true });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
//app.use(loopback.urlNotFound());

// The ultimate error handler.
//app.use(loopback.errorHandler());


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
	if (err)
		throw err;

	// start the server if `$ node server.js`
	if (require.main === module) {
		app.start();
	}
});


