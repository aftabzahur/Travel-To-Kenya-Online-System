'use strict'

var mongoose = require('mongoose');

var mombasahotelModel = function(){
	var mombasahotelSchema = mongoose.Schema({
		hotelname: String,
		cover: String,
		description: String,
		price: Number,
		rating: String,
		about: String,
		featureheading1: String,
		featurecontent1: String,
		image1: String,
		image2: String,
		image3: String

	});

	return mongoose.model('Mombasahotel', mombasahotelSchema);
};

module.exports = new mombasahotelModel();