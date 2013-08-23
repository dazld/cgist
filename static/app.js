var App = function(elem) {
	this.elem = elem;
	this.state = '';
	this.lines = '';
	this.startListening();
	this.timer = false;
}

App.prototype.startListening = function() {
	// this.elem.getSession().on('keyup',this.throttledHandler.bind(this));
	this.elem.getSession().on('change',this.throttledHandler.bind(this));

	this.socket = io.connect('http://localhost:8080');
	this.socket.on('ping', function (data) {
		console.log(data);
	});
};

App.prototype.throttledHandler = function(){
	clearTimeout(this.timer);
	var args = Array.prototype.slice.apply(arguments);
	var handlerBound = this.handleNewText.bind(this);
	this.timer = setTimeout(function(){

		handlerBound.apply(null, args);
	},1000);
};

App.prototype.handleNewText = function(data, session) {
	console.log(session)
	var state = session.doc.$lines.join();
	var lines = session.doc.$lines;

	if (state !== this.state) {
		this.state = state;
		this.lines = lines;
		console.log('changed:',lines.length);
	} else {
		console.log('no change');
	}

	this.socket.emit('changed',{
		id: Date.now(),
		lines: this.lines
	});

};


var app = new App(editor);
