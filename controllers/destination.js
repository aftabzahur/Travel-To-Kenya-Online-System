'use strict';

var Book = require('../models/bookModel');
var Mombasa = require('../models/mombasaModel');
var Kisumu = require('../models/kisumuModel');
var Nairobi = require('../models/nairobiModel');
var Category = require('../models/categoryModel');
var Customertour = require('../models/customertourModel');
var Mombasahotel = require('../models/mombasahotelModel');

module.exports = function (router) {
    router.get('/', function (req, res) { 
       Mombasa.find({}, function(err, mombasas){
       Book.find({}, function(err, books){
       Kisumu.find({}, function(err, kisumus){
       Nairobi.find({}, function(err, nairobis){
      if(err){
        console.log(err);
      }
      var model = {
        mombasas: mombasas,
        books: books,
        kisumus: kisumus,
        nairobis: nairobis
      }
        res.render('destination/index', model);
      });
     });
    });
  });
});

     router.get('/mombasa/details/:id', function (req, res) {
       Mombasa.findOne({_id: req.params.id}, function(err, mombasas){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			mombasas: mombasas
       		}
       		res.render('destination/mombasa/details', model);
       });
    });

     //Mombasa Sites
     router.get('/mombasa', function (req, res) {
       Mombasa.find({}, function(err, mombasas){
          if(err){
            console.log(err);
          }

          var model = {
            mombasas: mombasas
          }
          res.render('destination/mombasa/mombasa', model);
       });
    });


      router.get('/kisumu/details/:id', function (req, res) {
       Kisumu.findOne({_id: req.params.id}, function(err, kisumus){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			kisumus: kisumus
       		}
       		res.render('destination/kisumu/details', model);
       });
    });

     //Kisumu Sites
     router.get('/kisumu', function (req, res) {
       Kisumu.find({}, function(err, kisumus){
          if(err){
            console.log(err);
          }

          var model = {
            kisumus: kisumus
          }
          res.render('destination/kisumu/kisumu', model);
       });
    });


      router.get('/nairobi/details/:id', function (req, res) {
       Nairobi.findOne({_id: req.params.id}, function(err, nairobis){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			nairobis: nairobis
       		}
       		res.render('destination/nairobi/details', model);
       });
    });

     //Nairobi Sites
     router.get('/nairobi', function (req, res) {
       Nairobi.find({}, function(err, nairobis){
          if(err){
            console.log(err);
          }

          var model = {
            nairobis: nairobis
          }
          res.render('destination/nairobi/nairobi', model);
       });
    });

      // Mombasa Tour Booking Form
     router.get('/mombasa/tourbookingform', function (req, res) {
       Mombasa.find({}, function(err, mombasas){
       Category.find({}, function(err, categories){
          if(err){
            console.log(err);
          }

          var model = {
            mombasas: mombasas,
            categories: categories
          }
          res.render('destination/mombasa/tourbookingform', model);
       });
     });
    });




     // Posting the Tour Booking Form
    router.post('/customertours', function(req, res){
      var customername = req.body.customername && req.body.customername.trim();
      var origin = req.body.origin && req.body.origin;
      var passportnumber = req.body.passportnumber && req.body.passportnumber;
      var car = req.body.car && req.body.car;
      var check_in_date = req.body.check_in_date && req.body.check_in_date;
      var site = req.body.site && req.body.site;
      var category = req.body.category && req.body.category; 
      var email = req.body.email && req.body.email;
      var phone = req.body.phone && req.body.phone;

      if (customername == '' || phone == '') {
        req.flash('error', "Please fill out the required fields");
        res.location('/destination/mombasa/tourbookingform');
        res.redirect('/destination/mombasa/tourbookingform');
      }

      if(isNaN(passportnumber)){
        req.flash('error', "Passport must be a number");
        res.location('/destination/mombasa/tourbookingform');
        return res.redirect('/destination/mombasa/tourbookingform');
      }

      var newCustomertour = new Customertour({
        customername: customername,
        origin: origin,
        passportnumber: passportnumber,
        car: car,
        check_in_date: check_in_date,
        site: site,
        category: category,
        email: email,
        phone: phone
      });

      newCustomertour.save(function(err){
        if(err) {
          console.log('save error', err);
        }

        req.flash('success', "Successful Booking for the Tour Booking form");
        res.location('/destination/mombasa/success');
        return res.redirect('/destination/mombasa/success');
      });
    });



     // Success Mombasa Customer Booking Form
     router.get('/mombasa/success', function (req, res) {
       Mombasa.find({}, function(err, mombasas){
       Mombasahotel.find({}, function(err, mombasahotels){
          if(err){
            console.log(err);
          }

          var model = {
            mombasas: mombasas,
            mombasahotels: mombasahotels
          }
          res.render('destination/mombasa/success', model);
       });
     });
    });
};