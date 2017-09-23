'use strict';
var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) { 
        res.render('index');
    });

     router.get('/details/:id', function (req, res) {
       Book.findOne({_id: req.params.id}, function(err, book){
       		if(err){
       			console.log(err);
       		}

       		var model = {
       			book: book
       		};
       		res.render('books/details', model);
       });
    });

      router.get('/googlemap', function (req, res) {
       Book.findOne({_id: req.params.id}, function(err, book){
          if(err){
            console.log(err);
          }

          var model = {
            book: book
          };
          res.render('books/googlemap', model);
       });
    });


      router.get('/1', function (req, res) {
       Book.findOne({_id: req.params.id}, function(err, book){
          if(err){
            console.log(err);
          }

          var model = {
            book: book
          };
          res.render('books/1', model);
       });
    });

     router.get('/2', function (req, res) {
       Book.findOne({_id: req.params.id}, function(err, book){
          if(err){
            console.log(err);
          }

          var model = {
            book: book
          };
          res.render('books/2', model);
       });
    });  

     router.get('/3', function (req, res) {
       Book.findOne({_id: req.params.id}, function(err, book){
          if(err){
            console.log(err);
          }

          var model = {
            book: book
          };
          res.render('books/3', model);
       });
    }); 
};
