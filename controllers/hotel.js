'use strict';

var Mombasahotel = require('../models/mombasahotelModel');
var Kisumuhotel = require('../models/kisumuhotelModel');
var Nairobihotel = require('../models/nairobihotelModel');
var Customer = require('../models/customerModel');

module.exports = function (router) {
    router.get('/', function (req, res) { 
       Mombasahotel.find({}, function(err, mombasahotels){
       Kisumuhotel.find({}, function(err, kisumuhotels){
       Nairobihotel.find({}, function(err, nairobihotels){	
      if(err){
        console.log(err);
      }
      var model = {
        mombasahotels: mombasahotels,
        kisumuhotels: kisumuhotels,
        nairobihotels: nairobihotels
      }
        res.render('hotel/index', model);
      });
      });
      }); 
  });


     router.get('/mombasahotels/details/:id', function (req, res) {
       Mombasahotel.findOne({_id: req.params.id}, function(err, mombasahotels){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			mombasahotels: mombasahotels
       		}
       		res.render('hotel/mombasahotels/details', model);
       });
    });

     //Mombasa Hotel
     router.get('/mombasahotel', function (req, res) {
       Mombasahotel.find({}, function(err, mombasahotels){
          if(err){
            console.log(err);
          }

          var model = {
            mombasahotels: mombasahotels
          }
          res.render('hotel/mombasahotels/mombasahotel', model);
       });
    });


     // Mombasa Hotel Booking Form
     router.get('/mombasahotels/hotelbookingform', function (req, res) {
       Mombasahotel.find({}, function(err, mombasahotels){
          if(err){
            console.log(err);
          }

          var model = {
            mombasahotels: mombasahotels
          }
          res.render('hotel/mombasahotels/hotelbookingform', model);
       });
    });



     // Posting the Hotel Booking Form
    router.post('/customers', function(req, res){
      var customername = req.body.customername && req.body.customername.trim();
      var origin = req.body.origin && req.body.origin;
      var passportnumber = req.body.passportnumber && req.body.passportnumber;
      var stayduration = req.body.stayduration && req.body.stayduration;
      var check_in_date = req.body.check_in_date && req.body.check_in_date;
      var hotelname = req.body.hotelname && req.body.hotelname;
      var passenger = req.body.passenger && req.body.passenger; 
      var email = req.body.email && req.body.email;
      var phone = req.body.phone && req.body.phone;

      if (customername == '' || phone == '') {
        req.flash('error', "Please fill out the required fields");
        res.location('/hotel/mombasahotels/hotelbookingform');
        res.redirect('/hotel/mombasahotels/hotelbookingform');
      }

      if(isNaN(passportnumber)){
        req.flash('error', "Passport must be a number");
        res.location('/hotel/mombasahotels/hotelbookingform');
        return res.redirect('/hotel/mombasahotels/hotelbookingform');
      }

      var newCustomer = new Customer({
        customername: customername,
        origin: origin,
        passportnumber: passportnumber,
        stayduration: stayduration,
        check_in_date: check_in_date,
        hotelname: hotelname,
        passenger: passenger,
        email: email,
        phone: phone
      });

      newCustomer.save(function(err){
        if(err) {
          console.log('save error', err);
        }

        req.flash('success', "Successful Booking for the Hotel Booking form");
        res.location('/hotel/mombasahotels/success');
        return res.redirect('/hotel/mombasahotels/success');
      });
    });



     // Success Mombasa Customer Booking Form
     router.get('/mombasahotels/success', function (req, res) {
       Mombasahotel.find({}, function(err, mombasahotels){
          if(err){
            console.log(err);
          }

          var model = {
            mombasahotels: mombasahotels
          }
          res.render('hotel/mombasahotels/success', model);
       });
    });

      //Kisumu Hotel Details Page
      router.get('/kisumuhotel/details/:id', function (req, res) {
       Kisumuhotel.findOne({_id: req.params.id}, function(err, kisumuhotels){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			kisumuhotels: kisumuhotels
       		}
       		res.render('hotel/kisumuhotel/details', model);
       });
    });

     //Kisumu Hotel
     router.get('/kisumuhotel', function (req, res) {
       Kisumuhotel.find({}, function(err, kisumuhotels){
          if(err){
            console.log(err);
          }

          var model = {
            kisumuhotels: kisumuhotels
          }
          res.render('hotel/kisumuhotels/kisumuhotel', model);
       });
    });


      router.get('/nairobihotel/details/:id', function (req, res) {
       Nairobihotel.findOne({_id: req.params.id}, function(err, nairobihotels){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			nairobihotels: nairobihotels
       		}
       		res.render('hotel/nairobihotel/details', model);
       });
    });

     //Nairobi Hotel
     router.get('/nairobihotel', function (req, res) {
       Nairobihotel.find({}, function(err, nairobihotels){
          if(err){
            console.log(err);
          }

          var model = {
            nairobihotels: nairobihotels
          }
          res.render('hotel/nairobihotels/nairobihotel', model);
       });
    });
};