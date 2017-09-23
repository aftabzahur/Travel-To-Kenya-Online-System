'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');
var Mombasa = require('../models/mombasaModel');
var Kisumu = require('../models/kisumuModel');
var Nairobi = require('../models/nairobiModel');
var Customer = require('../models/customerModel');
var Mombasahotel = require('../models/mombasahotelModel');
var nodemailer = require("nodemailer");
var PDFDocument = require('pdfkit');
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./test/report.dust', 'utf8');
var options = { format: 'Letter' };





var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'aftabzahur@gmail.com',
        pass: 'AL MUTAKABIR'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


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
    		res.redirect('/manage/books/add');
    	}

    	if(isNaN(price)){
    		req.flash('error', "Price must be a number");
    		res.location('/manage/books/add');
    		res.redirect('/manage/books/add');
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

    		req.flash('success', "Package Added");
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

    		req.flash('success', "Package Updated");
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
    		return res.redirect('/manage/categories/add');
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
  

  //Mombasa Package
  router.get('/mombasas', function (req, res) {
    	Mombasa.find({}, function(err, mombasas){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			mombasas :mombasas
    		};

    		res.render('manage/mombasas/index', model);
    	})
    }); 


    //Add Mombasa Package
    router.get('/mombasas/add', function(req, res){
    	Mombasa.find({},function(err, mombasas){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			mombasas: mombasas
    		};

    		res.render('manage/mombasas/add', model);
    	});
    });


    router.post('/mombasas', function(req, res){
    	var site = req.body.site && req.body.site.trim();
    	var description = req.body.description && req.body.description;
    	var about = req.body.about && req.body.about;
    	var priceo = req.body.priceo && req.body.priceo;
    	var pricef = req.body.pricef && req.body.pricef;
    	var priceh = req.body.priceh && req.body.priceh;
    	var latitude = req.body.latitude && req.body.latitude;
    	var longitude = req.body.longitude && req.body.longitude;
    	var image1 = req.body.image1 && req.body.image1;
    	var image2 = req.body.image2 && req.body.image2;
    	var image3 = req.body.image3 && req.body.image3;
    	var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
    	var featureheading2 = req.body.featureheading2 && req.body.featureheading2;
    	var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
    	var featurecontent2 = req.body.featurecontent2 && req.body.featurecontent2; 
    	var cover = req.body.cover && req.body.cover;

    	if (site == '' || priceo == '' || image1 == '' || image2 == '') {
    		req.flash('error', "Please fill out the required fields");
    		res.location('/manage/mombasas/add');
    		return res.redirect('/manage/mombasas/add');
    	}

    	if(isNaN(priceo)){
    		req.flash('error', "Price must be a number");
    		res.location('/manage/mombasas/add');
    		return res.redirect('/manage/mombasas/add');
    	}

    	var newMombasa = new Mombasa({
    		site: site,
    		description: description,
    		about: about,
    		priceo: priceo,
    		pricef: pricef,
    		priceh: priceh,
    		latitude: latitude,
    		longitude: longitude,
    		image1: image1,
    		image2: image2,
    		image3: image3,
    		featureheading1: featureheading1,
    		featureheading2: featureheading2,
    		featurecontent1: featurecontent1,
    		featurecontent2: featurecontent2,
    		cover: cover
    	});

    	newMombasa.save(function(err){
    		if(err) {
    			console.log('save error', err);
    		}

    		req.flash('success', "Mombasa Package Added");
    		res.location('/manage/mombasas/add');
    		return res.redirect('/manage/mombasas/add');
    	});
    });


    //Display Mombasa Package Edit Form
     router.get('/mombasas/edit/:id', function (req, res){
    		Mombasa.findOne({_id:req.params.id},function (err, mombasa){
    			if(err) {
    				console.log(err);
    			}
    			var model ={
    				mombasa: mombasa
    			};
    			res.render('manage/mombasas/edit', model);
    		});
    	});



    // Edit Mombasa Package
     router.post('/mombasas/edit/:id', function(req, res){
    	var site = req.body.site && req.body.site.trim();
    	var description = req.body.description && req.body.description;
    	var about = req.body.about && req.body.about;
    	var priceo = req.body.priceo && req.body.priceo;
    	var pricef = req.body.pricef && req.body.pricef;
    	var priceh = req.body.priceh && req.body.priceh;
    	var latitude = req.body.latitude && req.body.latitude;
    	var longitude = req.body.longitude && req.body.longitude;
    	var image1 = req.body.image1 && req.body.image1;
    	var image2 = req.body.image2 && req.body.image2;
    	var image3 = req.body.image3 && req.body.image3;
    	var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
    	var featureheading2 = req.body.featureheading2 && req.body.featureheading2;
    	var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
    	var featurecontent2 = req.body.featurecontent2 && req.body.featurecontent2; 
    	var cover = req.body.cover && req.body.cover;
    	
    	Mombasa.update({_id: req.params.id},{
    		site: site,
    		description: description,
    		about: about,
    		priceo: priceo,
    		pricef: pricef,
    		priceh: priceh,
    		latitude: latitude,
    		longitude: longitude,
    		image1: image1,
    		image2: image2,
    		image3: image3,
    		featureheading1: featureheading1,
    		featureheading2: featureheading2,
    		featurecontent1: featurecontent1,
    		featurecontent2: featurecontent2,
    		cover: cover
    	
    	}, function(err){
    		if(err) {
    			console.log('update error', err);
    		}

    		req.flash('success', "Mombasa Package Updated");
    		res.location('/manage/mombasas');
    		return res.redirect('/manage/mombasas');
    	});
    });

	  // Delete Mombasa Package
    router.delete('/mombasas/delete/:id', function (req, res){
    	Mombasa.remove({_id: req.params.id}, function(err){
    		if(err){
    			console.log(err);
    		}
    		req.flash('success', "Mombasa Package Deleted");
    		res.location('/events');
    		res.redirect('/events');
    	});
    });



	 //Kisumu Package
  router.get('/kisumus', function (req, res) {
    	Kisumu.find({}, function(err, kisumus){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			kisumus :kisumus
    		};

    		res.render('manage/kisumus/index', model);
    	})
    }); 


    //Add Kisumu Package
    router.get('/kisumus/add', function(req, res){
    	Kisumu.find({},function(err, kisumus){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			kisumus: kisumus
    		};

    		res.render('manage/kisumus/add', model);
    	});
    });


    router.post('/kisumus', function(req, res){
    	var site = req.body.site && req.body.site.trim();
    	var description = req.body.description && req.body.description;
    	var about = req.body.about && req.body.about;
    	var priceo = req.body.priceo && req.body.priceo;
    	var pricef = req.body.pricef && req.body.pricef;
    	var priceh = req.body.priceh && req.body.priceh;
    	var latitude = req.body.latitude && req.body.latitude;
    	var longitude = req.body.longitude && req.body.longitude;
    	var image1 = req.body.image1 && req.body.image1;
    	var image2 = req.body.image2 && req.body.image2;
    	var image3 = req.body.image3 && req.body.image3;
    	var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
    	var featureheading2 = req.body.featureheading2 && req.body.featureheading2;
    	var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
    	var featurecontent2 = req.body.featurecontent2 && req.body.featurecontent2; 
    	var cover = req.body.cover && req.body.cover;

    	if (site == '' || priceo == '' || image1 == '' || image2 == '') {
    		req.flash('error', "Please fill out the required fields");
    		res.location('/manage/kisumus/add');
    		return res.redirect('/manage/kisumus/add');
    	}

    	if(isNaN(priceo)){
    		req.flash('error', "Price must be a number");
    		res.location('/manage/kisumus/add');
    		return res.redirect('/manage/kisumus/add');
    	}

    	var newKisumu = new Kisumu({
    		site: site,
    		description: description,
    		about: about,
    		priceo: priceo,
    		pricef: pricef,
    		priceh: priceh,
    		latitude: latitude,
    		longitude: longitude,
    		image1: image1,
    		image2: image2,
    		image3: image3,
    		featureheading1: featureheading1,
    		featureheading2: featureheading2,
    		featurecontent1: featurecontent1,
    		featurecontent2: featurecontent2,
    		cover: cover
    	});

    	newKisumu.save(function(err){
    		if(err) {
    			console.log('save error', err);
    		}

    		req.flash('success', "Kisumu Package Added");
    		res.location('/manage/kisumus/add');
    		return res.redirect('/manage/kisumus/add');
    	});
    });


    //Display Kisumu Package Edit Form
     router.get('/kisumus/edit/:id', function (req, res){
    		Kisumu.findOne({_id:req.params.id},function (err, kisumu){
    			if(err) {
    				console.log(err);
    			}
    			var model ={
    				kisumu: kisumu
    			};
    			res.render('manage/kisumus/edit', model);
    		});
    	});



    // Edit Kisumu Package
     router.post('/kisumus/edit/:id', function(req, res){
    	var site = req.body.site && req.body.site.trim();
    	var description = req.body.description && req.body.description;
    	var about = req.body.about && req.body.about;
    	var priceo = req.body.priceo && req.body.priceo;
    	var pricef = req.body.pricef && req.body.pricef;
    	var priceh = req.body.priceh && req.body.priceh;
    	var latitude = req.body.latitude && req.body.latitude;
    	var longitude = req.body.longitude && req.body.longitude;
    	var image1 = req.body.image1 && req.body.image1;
    	var image2 = req.body.image2 && req.body.image2;
    	var image3 = req.body.image3 && req.body.image3;
    	var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
    	var featureheading2 = req.body.featureheading2 && req.body.featureheading2;
    	var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
    	var featurecontent2 = req.body.featurecontent2 && req.body.featurecontent2; 
    	var cover = req.body.cover && req.body.cover;
    	
    	Kisumu.update({_id: req.params.id},{
    		site: site,
    		description: description,
    		about: about,
    		priceo: priceo,
    		pricef: pricef,
    		priceh: priceh,
    		latitude: latitude,
    		longitude: longitude,
    		image1: image1,
    		image2: image2,
    		image3: image3,
    		featureheading1: featureheading1,
    		featureheading2: featureheading2,
    		featurecontent1: featurecontent1,
    		featurecontent2: featurecontent2,
    		cover: cover
    	
    	}, function(err){
    		if(err) {
    			console.log('update error', err);
    		}

    		req.flash('success', "Kisumu Package Updated");
    		res.location('/manage/kisumus');
    		return res.redirect('/manage/kisumus');
    	});
    });

	  // Delete Kisumu Package
    router.delete('/kisumus/delete/:id', function (req, res){
    	Kisumu.remove({_id: req.params.id}, function(err){
    		if(err){
    			console.log(err);
    		}
    		req.flash('success', "Kisumu Package Deleted");
    		res.location('/events');
    		res.redirect('/events');
    	});
    });   

   //Nairobi Package
  router.get('/nairobis', function (req, res) {
    	Nairobi.find({}, function(err, nairobis){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			nairobis :nairobis
    		};

    		res.render('manage/nairobis/index', model);
    	})
    }); 


    //Add Nairobi Package
    router.get('/nairobis/add', function(req, res){
    	Nairobi.find({},function(err, nairobis){
    		if(err){
    			console.log(err);
    		}

    		var model = {
    			nairobis: nairobis
    		};

    		res.render('manage/nairobis/add', model);
    	});
    });


    router.post('/nairobis', function(req, res){
    	var site = req.body.site && req.body.site.trim();
    	var description = req.body.description && req.body.description;
    	var about = req.body.about && req.body.about;
    	var priceo = req.body.priceo && req.body.priceo;
    	var pricef = req.body.pricef && req.body.pricef;
    	var priceh = req.body.priceh && req.body.priceh;
    	var latitude = req.body.latitude && req.body.latitude;
    	var longitude = req.body.longitude && req.body.longitude;
    	var image1 = req.body.image1 && req.body.image1;
    	var image2 = req.body.image2 && req.body.image2;
    	var image3 = req.body.image3 && req.body.image3;
    	var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
    	var featureheading2 = req.body.featureheading2 && req.body.featureheading2;
    	var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
    	var featurecontent2 = req.body.featurecontent2 && req.body.featurecontent2; 
    	var cover = req.body.cover && req.body.cover;

    	if (site == '' || priceo == '' || image1 == '' || image2 == '') {
    		req.flash('error', "Please fill out the required fields");
    		res.location('/manage/nairobis/add');
    		return res.redirect('/manage/nairobis/add');
    	}

    	if(isNaN(priceo)){
    		req.flash('error', "Price must be a number");
    		res.location('/manage/nairobis/add');
    		return res.redirect('/manage/nairobis/add');
    	}

    	var newNairobi = new Nairobi({
    		site: site,
    		description: description,
    		about: about,
    		priceo: priceo,
    		pricef: pricef,
    		priceh: priceh,
    		latitude: latitude,
    		longitude: longitude,
    		image1: image1,
    		image2: image2,
    		image3: image3,
    		featureheading1: featureheading1,
    		featureheading2: featureheading2,
    		featurecontent1: featurecontent1,
    		featurecontent2: featurecontent2,
    		cover: cover
    	});

    	newNairobi.save(function(err){
    		if(err) {
    			console.log('save error', err);
    		}

    		req.flash('success', "Nairobi Package Added");
    		res.location('/manage/nairobis/add');
    		return res.redirect('/manage/nairobis/add');
    	});
    });


    //Display Nairobi Package Edit Form
     router.get('/nairobis/edit/:id', function (req, res){
    		Nairobi.findOne({_id:req.params.id},function (err, nairobi){
    			if(err) {
    				console.log(err);
    			}
    			var model ={
    				nairobi: nairobi
    			};
    			res.render('manage/nairobis/edit', model);
    		});
    	});



    // Edit Nairobi Package
     router.post('/nairobis/edit/:id', function(req, res){
    	var site = req.body.site && req.body.site.trim();
    	var description = req.body.description && req.body.description;
    	var about = req.body.about && req.body.about;
    	var priceo = req.body.priceo && req.body.priceo;
    	var pricef = req.body.pricef && req.body.pricef;
    	var priceh = req.body.priceh && req.body.priceh;
    	var latitude = req.body.latitude && req.body.latitude;
    	var longitude = req.body.longitude && req.body.longitude;
    	var image1 = req.body.image1 && req.body.image1;
    	var image2 = req.body.image2 && req.body.image2;
    	var image3 = req.body.image3 && req.body.image3;
    	var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
    	var featureheading2 = req.body.featureheading2 && req.body.featureheading2;
    	var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
    	var featurecontent2 = req.body.featurecontent2 && req.body.featurecontent2; 
    	var cover = req.body.cover && req.body.cover;
    	
    	Nairobi.update({_id: req.params.id},{
    		site: site,
    		description: description,
    		about: about,
    		priceo: priceo,
    		pricef: pricef,
    		priceh: priceh,
    		latitude: latitude,
    		longitude: longitude,
    		image1: image1,
    		image2: image2,
    		image3: image3,
    		featureheading1: featureheading1,
    		featureheading2: featureheading2,
    		featurecontent1: featurecontent1,
    		featurecontent2: featurecontent2,
    		cover: cover
    	
    	}, function(err){
    		if(err) {
    			console.log('update error', err);
    		}

    		req.flash('success', "Nairobi Package Updated");
    		res.location('/manage/nairobis');
    		return res.redirect('/manage/nairobis');
    	});
    });

	  // Delete Nairobi Package
    router.delete('/nairobis/delete/:id', function (req, res){
    	Nairobi.remove({_id: req.params.id}, function(err){
    		if(err){
    			console.log(err);
    		}
    		req.flash('success', "Nairobi Package Deleted");
    		res.location('/events');
    		res.redirect('/events');
    	});
    }); 


    //Mombasa Hotel
router.get('/mombasahotels', function(req, res){
        Mombasahotel.find({}, function(err, mombasahotels){
            if(err){
                console.log(err);
            }

            var model = {
                mombasahotels :mombasahotels
            };

            res.render('manage/mombasahotels/index', model);
        });
    }); 


    //Add Mombasa Hotel 
    router.get('/mombasahotels/add', function(req, res){
        Mombasahotel.find({},function(err, mombasahotels){
            if(err){
                console.log(err);
            }

            var model = {
                mombasahotels: mombasahotels
            };

            res.render('manage/mombasahotels/add', model);
        });
    });


    router.post('/mombasahotels', function(req, res){
        var hotelname = req.body.hotelname && req.body.hotelname.trim();
        var cover = req.body.cover && req.body.cover;
        var description = req.body.description && req.body.description;
        var price = req.body.price && req.body.price;
        var rating = req.body.rating && req.body.rating;
        var about = req.body.about && req.body.about;
        var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
        var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
        var image1 = req.body.image1 && req.body.image1;
        var image2 = req.body.image2 && req.body.image2;
        var image3 = req.body.image3 && req.body.image3;
        

        if (hotelname == '' || price == '' || image1 == '' || image2 == '') {
            req.flash('error', "Please fill out the required fields");
            res.location('/manage/mombasahotels/add');
            return res.redirect('/manage/mombasahotels/add');
        }

        if(isNaN(price)){
            req.flash('error', "Price must be a number");
            res.location('/manage/mombasahotels/add');
            return res.redirect('/manage/mombasahotels/add');
        }

        var newMombasahotel = new Mombasahotel({
            hotelname: hotelname,
            cover: cover,
            description: description,
            price: price,
            rating: rating,
            about: about,
            featureheading1: featureheading1,
            featurecontent1: featurecontent1,
            image1: image1,
            image2: image2,
            image3: image3
        });

        newMombasahotel.save(function(err){
            if(err) {
                console.log('save error', err);
            }

            req.flash('success', "Mombasa Hotel Added");
            res.location('/manage/mombasahotels/add');
            return res.redirect('/manage/mombasahotels/add');
        });
    });


    //Display Mombasa Hotel Edit Form
     router.get('/mombasahotels/edit/:id', function (req, res){
            Mombasahotel.findOne({_id:req.params.id},function (err, mombasahotel){
                if(err) {
                    console.log(err);
                }
                var model ={
                    mombasahotel: mombasahotel
                };
                res.render('manage/mombasahotels/edit', model);
            });
        });



    // Edit Mombasa Hotel
     router.post('/mombasahotels/edit/:id', function(req, res){
        var hotelname = req.body.hotelname && req.body.hotelname.trim();
        var cover = req.body.cover && req.body.cover;
        var description = req.body.description && req.body.description;
        var price = req.body.price && req.body.price;
        var rating = req.body.rating && req.body.rating;
        var about = req.body.about && req.body.about;
        var featureheading1 = req.body.featureheading1 && req.body.featureheading1;
        var featurecontent1 = req.body.featurecontent1 && req.body.featurecontent1;
        var image1 = req.body.image1 && req.body.image1;
        var image2 = req.body.image2 && req.body.image2;
        var image3 = req.body.image3 && req.body.image3;
        
        Mombasahotel.update({_id: req.params.id},{
            hotelname: hotelname,
            cover: cover,
            description: description,
            price: price,
            rating: rating,
            about: about,
            featureheading1: featureheading1,
            featurecontent1: featurecontent1,
            image1: image1,
            image2: image2,
            image3: image3
        
        }, function(err){
            if(err) {
                console.log('update error', err);
            }

            req.flash('success', "Mombasa Hotel Updated");
            res.location('/manage/mombasahotels');
            return res.redirect('/manage/mombasahotels');
        });
    });

      // Delete Mombasa Hotel
    router.delete('/mombasahotels/delete/:id', function (req, res){
        Mombasahotel.remove({_id: req.params.id}, function(err){
            if(err){
                console.log(err);
            }
            req.flash('success', "Mombasa Hotel Deleted");
            res.location('/events');
            res.redirect('/events');
        });
    });
  


  //Customer Form Display
  router.get('/customers', function (req, res) {
        Customer.find({}, function(err, customers){
            if(err){
                console.log(err);
            }

            var model = {
                customers :customers
            };

            res.render('manage/customers/index', model);
        });
    }); 



  //Email Form Display
  router.get('/customers/email/:id', function (req, res) {
        Customer.findOne({_id: req.params.id}, function(err, customers){
            if(err){
                console.log(err);
            }

            var model = {
                customers :customers
            };

            res.render('manage/customers/email', model);
        });
    }); 


  //EMAIL
  router.get('/customers/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
     });
});


 


  // Report
  router.post('/pdf', (req, res) => {
  var doc = new PDFDocument()
  let filename = req.body.filename
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
   //If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  const content = req.body.content
  doc.y = 300
  doc.text(content, 50, 50)
  doc.scale(0.6)
   .translate(470, 130)
   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   .fill('red', 'even-odd')
   .restore()
  doc.pipe(res)
  doc.end()
  // draw some text

})
 

 //Report Form
  router.get('/customers/report/:id', function (req, res) {    
 pdf.create(html, options).toFile('./report.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
        Customer.findOne({_id: req.params.id}, function(err, customers){
            if(err){
                console.log(err);
            }

            var model = {
                customers :customers
            };

            res.render('manage/customers/report', model);
        });
    });


     router.delete('/customers/delete/:id', function (req, res){
    	Customer.remove({_id: req.params.id}, function(err){
    		if(err){
    			console.log(err);
    		}
    		req.flash('success', "Request Deleted");
    		res.location('/events');
    		res.redirect('/events');
    	});
    }); 

};


