var OAuth = require('OAuth');
var OAuth2 = OAuth.OAuth2;
var config = require('./config/config');
var Whir = require('whir');

var app = new Whir({
	defaultRoute: '/base/index',
	staticDir: __dirname+'/static'
});

app.start();





