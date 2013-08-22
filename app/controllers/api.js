var WhirController = require('whir/core/controllers/WhirController');
var Q = require('q');

var Api = WhirController.extend({
	initialize: function(){
		// console.log('init API');
	},
	index: function(){
		return 'hi api';
	}
});

module.exports = Api;


