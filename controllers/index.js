'use strict';

var Book = require('../models/bookModel');
var Mombasa = require('../models/mombasaModel');
var User = require('../models/userModel');


module.exports = function (router) {
     router.get('/', function (req, res) { 
     Mombasa.find({}, function(err, mombasas){
     	 Book.find({}, function(err, books){
    	if(err){
    		console.log(err);
    	}
    	var model = {
    		mombasas: mombasas,
    		books: books
    	}
    	res.render('index', model);
    });  
    });  
        
    });


     router.get('/contact-us', function (req, res) { 
     User.find({}, function(err, users){
        if(err){
            console.log(err);
        }
        var model = {
            users: users
        }
        res.render('contact-us', model);
    });  
    }); 


     router.get('/help', function (req, res) { 
     User.find({}, function(err, users){
        if(err){
            console.log(err);
        }
        var model = {
            users: users
        }
        res.render('help', model);
    });  
    }); 


    router.get('/admin', function (req, res) { 
     User.find({}, function(err, users){
        if(err){
            console.log(err);
        }
        var model = {
            users: users
        }
        res.render('admin', model);
    });  
    }); 

     router.post('/manage', function(req, res){
        var username = req.body.username && req.body.username;
        var password = req.body.password && req.body.password;
        
        if (username == 'Aftab' && password == 'Aftab') {
            req.flash('success', "Successfully Logged in");
            res.location('/manage');
            return res.redirect('/manage');
        }else{
            req.flash('error', "Wrong username or password");
            res.location('/admin');
            return res.redirect('/admin');
        }

        if(username == ''|| password == ''){
            req.flash('error', "Please enter the username and password");
            res.location('/admin');
            return res.redirect('/admin');
        }

        var newUser = new User({
            username: username,
            password: password,
            
        });

        //newUser.save(function(err){
            if(err) {
                console.log('save error', err);
            }

            //req.flash('success', "Package Added");
           // res.location('/manage');
           // return res.redirect('/manage');
        });
   // });
 
};

