'use strict'

var mongoose = require('mongoose')

var customerModel = function(){
	var customerSchema = mongoose.Schema({
		customername:String,
		origin: String,
		passportnumber: Number,
		stayduration: String,
		check_in_date: String,
		hotelname: String,
		passenger: String,
		email: String,
		phone: Number
	});

	return mongoose.model('Customer', customerSchema);
};

module.exports = new customerModel();