'use strict'

var mongoose = require('mongoose')

var customertourModel = function(){
	var customertourSchema = mongoose.Schema({
		customername:String,
		origin: String,
		passportnumber: Number,
		car: String,
		check_in_date: String,
		site: String,
		category: String,
		email: String,
		phone: Number
	});

	return mongoose.model('Customertour', customertourSchema);
};

module.exports = new customertourModel();