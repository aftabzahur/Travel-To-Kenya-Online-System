'use strict';

var mongoose = require('mongoose');

var db = function(){
	return{
		config: function(conf){
			mongoose.Promise = global.Promise;
			mongoose.connect('mongodb://127.0.0.1/travel_to_kenya');
			var db= mongoose.connection;
			db.on('error', console.error.bind(console, 'Connection error'));
			db.once('open', function(){
				console.log('db.connection open');
			});
		}
	};
}

module.exports= db();