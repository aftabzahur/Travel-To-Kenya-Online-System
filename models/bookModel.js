'use strict'

var mongoose = require('mongoose')

var bookModel = function(){
	var bookSchema = mongoose.Schema({
		packagename:String,
		category: String,
		description: String,
		passengers: Number,
		hotel: String,
		price: Number,
		cover: String
	});

	return mongoose.model('Book', bookSchema);
};

module.exports = new bookModel();