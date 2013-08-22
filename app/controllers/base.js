var WhirController = require('whir/core/controllers/WhirController');
var Q = require('q');

var Base = WhirController.extend({
	initialize: function(){},
	index: function(){
		var baseTemplate = this.templates.get('base');
		return baseTemplate({});
	}
});

module.exports = Base;


