'use strict'

var mongoose = require('mongoose');

var kisumuhotelModel = function(){
	var kisumuhotelSchema = mongoose.Schema({
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

	return mongoose.model('Kisumuhotel', kisumuhotelSchema);
};

module.exports = new kisumuhotelModel();