var OAuth = require('OAuth');
var OAuth2 = OAuth.OAuth2;
var config = require('./config/config');
var Whir = require('whir');
var createServer = require('http').createServer;



var app = new Whir({
	defaultRoute: '/base/index',
	staticDir: __dirname + '/static'
});

var server = createServer(app.app);
var io = require('socket.io').listen(server);
server.listen(8080);

io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello: 'world'
	});
	socket.on('changed', function(data) {
		console.log(data);
		socket.emit('ping',{ok:true});
	});
});

app.start();