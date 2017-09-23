'use strict'

var mongoose = require('mongoose')

var nairobiModel = function(){
	var nairobiSchema = mongoose.Schema({
		site: String,
		cover: String,
		description: String,
		pricef: Number,
		priceo: Number,
		priceh: Number,
		latitude: Number,
		longitude: Number,
		about: String,
		featureheading1: String,
		featurecontent1: String,
		featureheading2: String,
		featurecontent2: String,
		image1: String,
		image2: String,
		image3: String

	});

	return mongoose.model('Nairobi', nairobiSchema);
};

module.exports = new nairobiModel();