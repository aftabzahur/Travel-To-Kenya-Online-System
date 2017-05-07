'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/books', function (req, res) {
    	Book.find({}, function(err, books){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			books:books
    		};

    		res.render('manage/books/index', model);
    	})
    });

     router.get('/', function (req, res) {
        res.render('manage/index');
    });

     router.get('/categories', function (req, res) { 
        Category.find({}, function(err, categories){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			categories:categories
    		};
    			res.render('manage/categories/index', model);
    	}) 
    }); 

    router.get('/books/add', function(req, res){
    	Category.find({},function(err, categories){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			categories: categories
    		};

    		res.render('manage/books/add', model);
    	});
    });


    router.post('/books', function(req, res){
    	var packagename = req.body.packagename && req.body.packagename.trim();
    	var description = req.body.description && req.body.description;
    	var category = req.body.category && req.body.category;
    	var passengers = req.body.passengers && req.body.passengers;
    	var hotel = req.body.hotel && req.body.hotel;
    	var price = req.body.price && req.body.price;
    	var packagename = req.body.packagename && req.body.packagename; 
    	var cover = req.body.cover && req.body.cover;

    	if (packagename == '' || price == '') {
    		req.flash('error', "Please fill out the required fields");
    		res.location('/manage/books/add');
    		return res.redirect('/manage/books/add');
    	}

    	if(isNaN(price)){
    		req.flash('error', "Price must be a number");
    		res.location('/manage/books/add');
    		return res.redirect('/manage/books/add');
    	}

    	var newBook = new Book({
    		packagename: packagename,
    		description: description,
    		category: category,
    		passengers: passengers,
    		hotel: hotel,
    		price: price,
    		cover: cover
    	});

    	newBook.save(function(err){
    		if(err) {
    			console.log('save error', err);
    		}

    		req.flash('success', "Book Added");
    		res.location('/manage/books');
    		res.redirect('/manage/books');
    	});
    });

    // Display edit form
    router.get('/books/edit/:id', function (req, res){
    	Category.find({}, function (err, categories){
    		Book.findOne({_id:req.params.id},function (err, book){
    			if(err) {
    				console.log(err);
    			}
    			var model ={
    				book: book,
    				categories: categories
    			};
    			res.render('manage/books/edit', model);
    		});
    	});
    });

    	// Edit book
        router.post('/books/edit/:id', function(req, res){
    	var packagename = req.body.packagename && req.body.packagename;
    	var category = req.body.category && req.body.category;
    	var description = req.body.description && req.body.description;
    	var passengers = req.body.passengers && req.body.passengers;
    	var hotel = req.body.hotel && req.body.hotel;
    	var price = req.body.price && req.body.price;
    	var packagename = req.body.packagename && req.body.packagename; 
    	var cover = req.body.cover && req.body.cover;

    	
    	Book.update({_id: req.params.id},{
    		packagename: packagename,
    		category: category,
    		description: description,
    		passengers: passengers,
    		hotel: hotel,
    		price: price,
    		cover: cover
    	
    	}, function(err){
    		if(err) {
    			console.log('update error', err);
    		}

    		req.flash('success', "Book Updated");
    		res.location('/manage/books');
    		res.redirect('/manage/books');
    	});

    });

    // Delete Book
    router.delete('/books/delete/:id', function (req, res){
    	Book.remove({_id: req.params.id}, function(err){
    		if(err){
    			console.log(err);
    		}
    		req.flash('success', "Book Deleted");
    		res.location('/events');
    		res.redirect('/events');
    	});
    });

    // Display category add form
    router.get('/categories/add', function(req, res){
    	res.render('manage/categories/add');
    });

    //Add a new category
     router.post('/categories', function(req, res){
    	var name = req.body.name && req.body.name.trim();
    	

    	if (name == '') {
    		req.flash('error', "Please fill out the required fields");
    		res.location('/manage/categories/add');
    		res.redirect('/manage/categories/add');
    	}

    	var newCategory = new Category({
    		name: name
    	});

    	newCategory.save(function(err){
    		if(err) {
    			console.log('save error', err);
    		}

    		req.flash('success', "Category Added");
    		res.location('/manage/categories');
    		res.redirect('/manage/categories');
    	});
    });


     // Display category edit form
    router.get('/categories/edit/:id', function (req, res){
    		Category.findOne({_id:req.params.id},function (err, category){
    			if(err) {
    				console.log(err);
    			}
    			var model ={
    				category: category
    			};
    			res.render('manage/categories/edit', model);
    		});
    	});


    	// Edit category
        router.post('/categories/edit/:id', function(req, res){
    	var name = req.body.name && req.body.name.trim();

    	
    	Category.update({_id: req.params.id},{
    		name: name
    	}, function(err){
    		if(err) {
    			console.log('update error', err);
    		}

    		req.flash('success', "Category Updated");
    		res.location('/manage/categories');
    		res.redirect('/manage/categories');
    	});

    });

    // Delete Category
    router.delete('/categories/delete/:id', function (req, res){
    	Category.remove({_id: req.params.id}, function(err){
    		if(err){
    			console.log(err);
    		}
    		req.flash('success', "Category Deleted");
    		res.location('/events');
    		res.redirect('/events');
    	});
    });    
};
