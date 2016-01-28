'use strict';

module.exports = function (app) {

	var bodyParser = require('body-parser');
	var loopback = require('loopback');
	var MongoStore = require('express-session-mongo');
	var loopbackPassport = require('loopback-component-passport');
	var PassportConfigurator = loopbackPassport.PassportConfigurator;
	var passportConfigurator = new PassportConfigurator(app);

	// BODY PARSER
	// to support JSON-encoded bodies
	app.middleware('parse', bodyParser.json());
	// to support URL-encoded bodies
	app.middleware('parse', bodyParser.urlencoded({
		extended: true
	}));

	console.log('Configuring access token');
	// ACCESS TOKEN
	// The access token is only available after boot
	app.middleware('auth', loopback.token({
		model: app.models.accessToken,
		currentUserLiteral: 'me'
	}));

	console.log('Configuring cookie parser');
	// COOKIE PARSER
	app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
	console.log('Creating Mongo Session Store');
	app.middleware('session', loopback.session({
		secret: app.get('cookieSecret'),
		saveUninitialized: true,
		resave: true
	}));
	/*app.middleware('session', loopback.session({
		store: new MongoStore({
			db: 'heroku_f04xz8tc',
			ip: 'ds049925.mongolab.com',
			port: '49925',
			username: 'vrseum_admin',
			password: 'PieroAugmenta15'
		}),
		secret: app.get('cookieSecret'),
		saveUninitialized: true,
		resave: true
	}));*/

	var config = false;
	try
	{
		config = require('../providers.json');
	} catch (err)
	{
		console.error(
			'Please configure your passport strategy in `providers.json`.');
		console.error(
			'Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.'
			);
	}


	if (config)
	{
		console.log('Configuring passport');

		// PASSPORT CONFIGURATORS
		passportConfigurator.init();
		passportConfigurator.setupModels({
			userModel: app.models.AppUser,
			userIdentityModel: app.models.userIdentity,
			userCredentialModel: app.models.userCredential
		});


		for (var s in config) {
			var c = config[s];
			c.session = c.session !== false;
			passportConfigurator.configureProvider(s, c);
		}

		//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
	}


	app.get('/auth/current', function (req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			return res.status(200).json({});
		}
		//poor man's copy
		var ret = JSON.parse(JSON.stringify(req.user));
		delete ret.password;
		res.status(200).json(ret);
	});



};
