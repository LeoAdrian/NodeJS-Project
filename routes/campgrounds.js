var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder   = require("geocoder");
var locus      = require("locus");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
    	if(err){
    		console.log(err);
    	} else {
    		res.render("campgrounds/index",{campgrounds:allCampgrounds, page:'campgrounds'});
    	}
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
  });
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    	if(err){
    		console.log(err);
    	} else {
            // console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
		Campground.findById(req.params.id, function(err,foundCampground){
			res.render("campgrounds/edit",{campground:foundCampground});
		});
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
      if(err){
          req.flash("error","You must introduce a location");
          res.redirect("back")
      }
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

// DESTROY ROUTE

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    // find campground by id and destroy its id
    Campground.findByIdAndRemove(req.params.id,req.body.campground,function(err,foundCampground){
    	if(err){
    		res.redirect("/campgrounds");
    	}     
    	else {
    	    req.flash("success","Campground has been removed");
    		res.redirect("/campgrounds")
    	}
    });
});

// middleware



module.exports = router;