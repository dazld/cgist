var App = function(elem) {
	this.elem = elem;
	this.state = '';
	this.lines = '';
	this.startListening();
	this.timer = false;
	this.appId = Date.now();
}

App.prototype.startListening = function() {
	// this.elem.getSession().on('keyup',this.throttledHandler.bind(this));
	this.elem.getSession().on('change',this.throttledHandler.bind(this));

	this.socket = io.connect('http://localhost:8080');
	this.socket.on('delta:rx', function (data) {
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

App.prototype.setState = function(state) {
	this.state = state;
};

App.prototype.setLines = function(lines) {
	this.lines = lines;
};

App.prototype.isStateEqualTo = function(toCompareState) {
	return (toCompareState === this.state);
};

App.prototype.handleNewText = function(data, session) {
	
	var state = session.doc.$lines.join();
	var lines = session.doc.$lines;

	if (state !== this.state) {
		this.state = state;
		this.lines = lines;
		console.log('changed:',lines.length);
	} else {
		console.log('no change');
	}

	this.socket.emit('delta:tx',{
		id: this.appId,
		lines: this.lines
	});

};


var app = new App(editor);
